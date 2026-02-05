// Web Search Module - Tavily API Integration
// Provides real-time web search for supplier reviews, venue info, and recommendations

import { supabase } from "./supabase.ts";

const TAVILY_API_KEY = Deno.env.get("TAVILY_API_KEY");
const TAVILY_API_URL = "https://api.tavily.com/search";

// Cache TTL in hours
const CACHE_TTL_HOURS = 24;

// ============================================
// TYPES
// ============================================

export type SearchType = "reviews" | "prices" | "recommendations" | "general";

export interface SearchOptions {
  searchType?: SearchType;
  maxResults?: number;
  includeAnswer?: boolean;
  searchDepth?: "basic" | "advanced";
  language?: string;
}

export interface SearchResult {
  title: string;
  url: string;
  content: string;
  score: number;
  publishedDate?: string;
}

export interface SearchResponse {
  query: string;
  answer?: string;
  results: SearchResult[];
  resultCount: number;
  fromCache: boolean;
  searchType: SearchType;
}

interface TavilyResponse {
  answer?: string;
  results: Array<{
    title: string;
    url: string;
    content: string;
    score: number;
    published_date?: string;
  }>;
}

// ============================================
// MAIN SEARCH FUNCTION
// ============================================

export async function searchWeb(
  query: string,
  options: SearchOptions = {}
): Promise<SearchResponse> {
  const {
    searchType = "general",
    maxResults = 5,
    includeAnswer = true,
    searchDepth = "basic",
    language = "he", // Default to Hebrew
  } = options;

  // Enhance query based on search type
  const enhancedQuery = enhanceQuery(query, searchType, language);

  // Check cache first
  const cached = await getFromCache(enhancedQuery);
  if (cached) {
    console.log("Search cache hit:", enhancedQuery);
    return {
      query: enhancedQuery,
      answer: cached.answer,
      results: cached.results,
      resultCount: cached.results.length,
      fromCache: true,
      searchType,
    };
  }

  // Call Tavily API
  if (!TAVILY_API_KEY) {
    console.warn("TAVILY_API_KEY not set, returning empty results");
    return {
      query: enhancedQuery,
      results: [],
      resultCount: 0,
      fromCache: false,
      searchType,
    };
  }

  try {
    const response = await fetch(TAVILY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: enhancedQuery,
        max_results: maxResults,
        include_answer: includeAnswer,
        search_depth: searchDepth,
        include_domains: getIncludeDomains(searchType),
        exclude_domains: getExcludeDomains(),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Tavily API error:", error);
      throw new Error(`Tavily API error: ${response.status}`);
    }

    const data: TavilyResponse = await response.json();

    const results: SearchResult[] = data.results.map((r) => ({
      title: r.title,
      url: r.url,
      content: r.content,
      score: r.score,
      publishedDate: r.published_date,
    }));

    // Cache the results
    await saveToCache(enhancedQuery, searchType, {
      answer: data.answer,
      results,
    });

    return {
      query: enhancedQuery,
      answer: data.answer,
      results,
      resultCount: results.length,
      fromCache: false,
      searchType,
    };
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
}

// ============================================
// SPECIALIZED SEARCH FUNCTIONS
// ============================================

/**
 * Search for reviews of a venue or supplier
 */
export async function searchReviews(
  name: string,
  category?: string
): Promise<SearchResponse> {
  const query = category
    ? `${name} ${category} ביקורות חוות דעת`
    : `${name} ביקורות חוות דעת`;

  return searchWeb(query, {
    searchType: "reviews",
    maxResults: 5,
    searchDepth: "advanced",
  });
}

/**
 * Search for price information
 */
export async function searchPrices(
  category: string,
  location?: string
): Promise<SearchResponse> {
  const query = location
    ? `${category} מחירים ${location}`
    : `${category} מחירים ישראל`;

  return searchWeb(query, {
    searchType: "prices",
    maxResults: 5,
  });
}

/**
 * Search for recommendations
 */
export async function searchRecommendations(
  category: string,
  eventType?: string,
  location?: string
): Promise<SearchResponse> {
  let query = `המלצות ${category}`;
  if (eventType) query += ` ל${eventType}`;
  if (location) query += ` ${location}`;
  query += " ישראל";

  return searchWeb(query, {
    searchType: "recommendations",
    maxResults: 7,
    searchDepth: "advanced",
  });
}

/**
 * Compare suppliers/venues
 */
export async function searchComparison(
  items: string[],
  category: string
): Promise<SearchResponse> {
  const query = `השוואה בין ${items.join(" ו")} ${category}`;

  return searchWeb(query, {
    searchType: "general",
    maxResults: 5,
    searchDepth: "advanced",
  });
}

// ============================================
// QUERY ENHANCEMENT
// ============================================

function enhanceQuery(query: string, searchType: SearchType, language: string): string {
  // Add context based on search type
  const enhancements: Record<SearchType, string[]> = {
    reviews: ["ביקורות", "חוות דעת", "המלצות"],
    prices: ["מחירים", "עלות", "תמחור"],
    recommendations: ["מומלץ", "הטוב ביותר", "איכותי"],
    general: [],
  };

  // Check if query already contains enhancement keywords
  const keywords = enhancements[searchType];
  const hasKeyword = keywords.some((k) => query.includes(k));

  if (!hasKeyword && keywords.length > 0) {
    return `${query} ${keywords[0]}`;
  }

  return query;
}

function getIncludeDomains(searchType: SearchType): string[] | undefined {
  // Prioritize reliable Israeli domains for certain search types
  const domainsByType: Partial<Record<SearchType, string[]>> = {
    reviews: [
      "google.com",
      "facebook.com",
      "wedsites.co.il",
      "easy.co.il",
      "talkback.ynet.co.il",
    ],
    recommendations: [
      "wedsites.co.il",
      "easy.co.il",
      "timeout.co.il",
      "xnet.ynet.co.il",
    ],
  };

  return domainsByType[searchType];
}

function getExcludeDomains(): string[] {
  // Exclude spammy or irrelevant domains
  return [
    "pinterest.com",
    "twitter.com",
    "instagram.com",
    "tiktok.com",
  ];
}

// ============================================
// CACHING
// ============================================

async function getFromCache(query: string): Promise<{
  answer?: string;
  results: SearchResult[];
} | null> {
  const queryHash = await hashQuery(query);

  const { data, error } = await supabase
    .from("search_cache")
    .select("results")
    .eq("query_hash", queryHash)
    .gt("expires_at", new Date().toISOString())
    .single();

  if (error || !data) {
    return null;
  }

  return data.results as { answer?: string; results: SearchResult[] };
}

async function saveToCache(
  query: string,
  searchType: SearchType,
  results: { answer?: string; results: SearchResult[] }
): Promise<void> {
  const queryHash = await hashQuery(query);
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + CACHE_TTL_HOURS);

  const { error } = await supabase.from("search_cache").upsert(
    {
      query_hash: queryHash,
      query_text: query,
      search_type: searchType,
      results: results,
      result_count: results.results.length,
      expires_at: expiresAt.toISOString(),
    },
    { onConflict: "query_hash" }
  );

  if (error) {
    console.error("Failed to cache search results:", error);
  }
}

async function hashQuery(query: string): Promise<string> {
  const normalized = query.toLowerCase().trim();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest("MD5", data).catch(() => {
    // Fallback if MD5 is not available
    return crypto.subtle.digest("SHA-256", data);
  });
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ============================================
// RESULT FORMATTING
// ============================================

/**
 * Format search results for display in chat
 */
export function formatSearchResultsForChat(response: SearchResponse): string {
  const lines: string[] = [];

  // Add AI-generated answer if available
  if (response.answer) {
    lines.push(response.answer);
    lines.push("");
  }

  // Add top results
  if (response.results.length > 0) {
    lines.push("מקורות:");
    for (const result of response.results.slice(0, 3)) {
      lines.push(`• ${result.title}`);
      // Truncate content if too long
      const snippet = result.content.length > 150
        ? result.content.substring(0, 150) + "..."
        : result.content;
      lines.push(`  ${snippet}`);
    }
  } else {
    lines.push("לא נמצאו תוצאות רלוונטיות.");
  }

  return lines.join("\n");
}

/**
 * Extract structured data from search results (e.g., ratings, prices)
 */
export function extractStructuredData(
  results: SearchResult[]
): {
  ratings: Array<{ source: string; rating: string }>;
  priceRanges: Array<{ source: string; range: string }>;
  pros: string[];
  cons: string[];
} {
  const ratings: Array<{ source: string; rating: string }> = [];
  const priceRanges: Array<{ source: string; range: string }> = [];
  const pros: string[] = [];
  const cons: string[] = [];

  for (const result of results) {
    const content = result.content;

    // Extract ratings (e.g., "4.5/5", "4.5 כוכבים")
    const ratingMatch = content.match(/(\d+\.?\d*)\s*\/\s*5|(\d+\.?\d*)\s*כוכבים/);
    if (ratingMatch) {
      ratings.push({
        source: result.title,
        rating: ratingMatch[1] || ratingMatch[2],
      });
    }

    // Extract price ranges (e.g., "₪350-450")
    const priceMatch = content.match(/₪?\s*(\d{2,6})\s*[-–]\s*₪?\s*(\d{2,6})/);
    if (priceMatch) {
      priceRanges.push({
        source: result.title,
        range: `₪${priceMatch[1]}-${priceMatch[2]}`,
      });
    }

    // Extract pros (common positive keywords)
    const posKeywords = ["יתרונות", "יתרון", "מעולה", "מומלץ", "איכותי", "מקצועי"];
    for (const keyword of posKeywords) {
      const idx = content.indexOf(keyword);
      if (idx !== -1) {
        const sentence = extractSentence(content, idx);
        if (sentence && !pros.includes(sentence)) {
          pros.push(sentence);
        }
      }
    }

    // Extract cons (common negative keywords)
    const negKeywords = ["חסרונות", "חסרון", "בעיה", "יקר", "ממתין"];
    for (const keyword of negKeywords) {
      const idx = content.indexOf(keyword);
      if (idx !== -1) {
        const sentence = extractSentence(content, idx);
        if (sentence && !cons.includes(sentence)) {
          cons.push(sentence);
        }
      }
    }
  }

  return { ratings, priceRanges, pros: pros.slice(0, 3), cons: cons.slice(0, 3) };
}

function extractSentence(text: string, position: number): string | null {
  // Find sentence boundaries
  const start = Math.max(0, text.lastIndexOf(".", position - 50) + 1);
  const end = text.indexOf(".", position + 50);
  if (end === -1 || end - start > 150) return null;
  return text.substring(start, end + 1).trim();
}

// ============================================
// CLEANUP FUNCTION (call periodically)
// ============================================

export async function cleanupExpiredCache(): Promise<number> {
  const { data, error } = await supabase
    .from("search_cache")
    .delete()
    .lt("expires_at", new Date().toISOString())
    .select("id");

  if (error) {
    console.error("Failed to cleanup search cache:", error);
    return 0;
  }

  return data?.length || 0;
}
