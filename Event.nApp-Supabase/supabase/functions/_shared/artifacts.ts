// Artifact Generation Module
// Generates PDF, Excel, CSV, Markdown, and Charts dynamically

// jsPDF for PDF generation (Deno compatible)
import { jsPDF } from "https://esm.sh/jspdf@2.5.1";
// ExcelJS for Excel generation
import ExcelJS from "https://esm.sh/exceljs@4.4.0";

// ============================================
// TYPES
// ============================================

export type ArtifactFormat = "pdf" | "excel" | "csv" | "markdown" | "chart";
export type ChartType = "bar" | "pie" | "line" | "doughnut" | "radar";

export interface ArtifactContent {
  title?: string;
  subtitle?: string;
  sections?: ArtifactSection[];
  table?: TableData;
  chart?: ChartData;
  footer?: string;
}

export interface ArtifactSection {
  heading?: string;
  content?: string;
  items?: string[];
  table?: TableData;
}

export interface TableData {
  headers: string[];
  rows: (string | number)[][];
  summary?: Record<string, string | number>;
}

export interface ChartData {
  type: ChartType;
  labels: string[];
  datasets: ChartDataset[];
  title?: string;
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string;
}

export interface GeneratedArtifact {
  format: ArtifactFormat;
  buffer: Uint8Array;
  filename: string;
  mimeType: string;
}

// ============================================
// PDF GENERATION
// ============================================

export async function generatePDF(
  content: ArtifactContent,
  options?: { rtl?: boolean; pageSize?: "a4" | "letter" }
): Promise<GeneratedArtifact> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: options?.pageSize || "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let y = 20;

  // Helper function to add text with word wrap
  const addText = (
    text: string,
    x: number,
    fontSize: number,
    fontStyle: "normal" | "bold" = "normal",
    maxWidth?: number
  ): number => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", fontStyle);

    if (maxWidth) {
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return lines.length * (fontSize * 0.4);
    } else {
      doc.text(text, x, y);
      return fontSize * 0.4;
    }
  };

  // Title
  if (content.title) {
    const titleHeight = addText(content.title, margin, 18, "bold", pageWidth - 2 * margin);
    y += titleHeight + 5;
  }

  // Subtitle
  if (content.subtitle) {
    doc.setTextColor(100);
    const subtitleHeight = addText(content.subtitle, margin, 12, "normal", pageWidth - 2 * margin);
    y += subtitleHeight + 8;
    doc.setTextColor(0);
  }

  // Sections
  if (content.sections) {
    for (const section of content.sections) {
      // Check if we need a new page
      if (y > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        y = 20;
      }

      // Section heading
      if (section.heading) {
        const headingHeight = addText(section.heading, margin, 14, "bold", pageWidth - 2 * margin);
        y += headingHeight + 3;
      }

      // Section content
      if (section.content) {
        const contentHeight = addText(section.content, margin, 10, "normal", pageWidth - 2 * margin);
        y += contentHeight + 3;
      }

      // Section items (bullet list)
      if (section.items) {
        for (const item of section.items) {
          if (y > doc.internal.pageSize.getHeight() - 30) {
            doc.addPage();
            y = 20;
          }
          doc.setFontSize(10);
          doc.text("•", margin, y);
          const itemHeight = addText(item, margin + 5, 10, "normal", pageWidth - 2 * margin - 5);
          y += itemHeight + 2;
        }
      }

      // Section table
      if (section.table) {
        y = addTableToPDF(doc, section.table, margin, y, pageWidth - 2 * margin);
      }

      y += 5;
    }
  }

  // Main table (if not in sections)
  if (content.table && !content.sections?.some((s) => s.table)) {
    y = addTableToPDF(doc, content.table, margin, y, pageWidth - 2 * margin);
  }

  // Footer
  if (content.footer) {
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128);
      doc.text(content.footer, margin, doc.internal.pageSize.getHeight() - 10);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 20, doc.internal.pageSize.getHeight() - 10);
    }
  }

  // Generate filename
  const filename = sanitizeFilename(content.title || "document") + ".pdf";

  // Get buffer
  const arrayBuffer = doc.output("arraybuffer");
  const buffer = new Uint8Array(arrayBuffer);

  return {
    format: "pdf",
    buffer,
    filename,
    mimeType: "application/pdf",
  };
}

function addTableToPDF(
  doc: jsPDF,
  table: TableData,
  x: number,
  y: number,
  maxWidth: number
): number {
  const colCount = table.headers.length;
  const colWidth = maxWidth / colCount;
  const rowHeight = 8;
  const cellPadding = 2;

  // Header row
  doc.setFillColor(240, 240, 240);
  doc.rect(x, y, maxWidth, rowHeight, "F");
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");

  for (let i = 0; i < colCount; i++) {
    doc.text(String(table.headers[i]).substring(0, 15), x + i * colWidth + cellPadding, y + 5);
  }
  y += rowHeight;

  // Data rows
  doc.setFont("helvetica", "normal");
  for (const row of table.rows) {
    if (y > doc.internal.pageSize.getHeight() - 30) {
      doc.addPage();
      y = 20;
    }

    for (let i = 0; i < colCount; i++) {
      const cellValue = row[i] !== undefined ? String(row[i]).substring(0, 18) : "";
      doc.text(cellValue, x + i * colWidth + cellPadding, y + 5);
    }
    y += rowHeight;
  }

  // Summary row
  if (table.summary) {
    doc.setFillColor(230, 230, 230);
    doc.rect(x, y, maxWidth, rowHeight, "F");
    doc.setFont("helvetica", "bold");

    let summaryX = x + cellPadding;
    for (const [key, value] of Object.entries(table.summary)) {
      doc.text(`${key}: ${value}`, summaryX, y + 5);
      summaryX += colWidth;
    }
    y += rowHeight;
  }

  return y + 5;
}

// ============================================
// EXCEL GENERATION
// ============================================

export async function generateExcel(
  content: ArtifactContent,
  options?: { sheets?: { name: string; content: ArtifactContent }[] }
): Promise<GeneratedArtifact> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Event.nApp";
  workbook.created = new Date();

  if (options?.sheets) {
    // Multiple sheets
    for (const sheetData of options.sheets) {
      addSheetToWorkbook(workbook, sheetData.name, sheetData.content);
    }
  } else {
    // Single sheet
    addSheetToWorkbook(workbook, content.title || "Sheet1", content);
  }

  // Generate filename
  const filename = sanitizeFilename(content.title || "spreadsheet") + ".xlsx";

  // Get buffer
  const buffer = await workbook.xlsx.writeBuffer();

  return {
    format: "excel",
    buffer: new Uint8Array(buffer as ArrayBuffer),
    filename,
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };
}

function addSheetToWorkbook(
  workbook: ExcelJS.Workbook,
  sheetName: string,
  content: ArtifactContent
): void {
  const worksheet = workbook.addWorksheet(sheetName.substring(0, 31)); // Excel limit

  let rowNum = 1;

  // Title
  if (content.title) {
    worksheet.getCell(rowNum, 1).value = content.title;
    worksheet.getCell(rowNum, 1).font = { bold: true, size: 16 };
    rowNum += 2;
  }

  // Subtitle
  if (content.subtitle) {
    worksheet.getCell(rowNum, 1).value = content.subtitle;
    worksheet.getCell(rowNum, 1).font = { italic: true, color: { argb: "666666" } };
    rowNum += 2;
  }

  // Main table
  if (content.table) {
    rowNum = addTableToWorksheet(worksheet, content.table, rowNum);
  }

  // Sections
  if (content.sections) {
    for (const section of content.sections) {
      if (section.heading) {
        worksheet.getCell(rowNum, 1).value = section.heading;
        worksheet.getCell(rowNum, 1).font = { bold: true, size: 12 };
        rowNum++;
      }

      if (section.content) {
        worksheet.getCell(rowNum, 1).value = section.content;
        rowNum++;
      }

      if (section.items) {
        for (const item of section.items) {
          worksheet.getCell(rowNum, 1).value = `• ${item}`;
          rowNum++;
        }
      }

      if (section.table) {
        rowNum = addTableToWorksheet(worksheet, section.table, rowNum);
      }

      rowNum++;
    }
  }

  // Auto-fit columns (approximate)
  worksheet.columns.forEach((column) => {
    column.width = 20;
  });
}

function addTableToWorksheet(
  worksheet: ExcelJS.Worksheet,
  table: TableData,
  startRow: number
): number {
  let rowNum = startRow;

  // Header row
  const headerRow = worksheet.getRow(rowNum);
  table.headers.forEach((header, index) => {
    const cell = headerRow.getCell(index + 1);
    cell.value = header;
    cell.font = { bold: true };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "E0E0E0" },
    };
    cell.border = {
      bottom: { style: "thin" },
    };
  });
  rowNum++;

  // Data rows
  for (const row of table.rows) {
    const dataRow = worksheet.getRow(rowNum);
    row.forEach((value, index) => {
      dataRow.getCell(index + 1).value = value;
    });
    rowNum++;
  }

  // Summary row
  if (table.summary) {
    const summaryRow = worksheet.getRow(rowNum);
    let colIndex = 1;
    for (const [key, value] of Object.entries(table.summary)) {
      const cell = summaryRow.getCell(colIndex);
      cell.value = `${key}: ${value}`;
      cell.font = { bold: true };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "F0F0F0" },
      };
      colIndex++;
    }
    rowNum++;
  }

  return rowNum + 1;
}

// ============================================
// CSV GENERATION
// ============================================

export function generateCSV(content: ArtifactContent): GeneratedArtifact {
  const lines: string[] = [];

  // Title as comment
  if (content.title) {
    lines.push(`# ${content.title}`);
  }

  // Table data
  if (content.table) {
    lines.push(content.table.headers.map(escapeCSV).join(","));
    for (const row of content.table.rows) {
      lines.push(row.map((v) => escapeCSV(String(v))).join(","));
    }
    if (content.table.summary) {
      lines.push("");
      const summaryLine = Object.entries(content.table.summary)
        .map(([k, v]) => `${k}: ${v}`)
        .join(",");
      lines.push(summaryLine);
    }
  }

  // Sections with tables
  if (content.sections) {
    for (const section of content.sections) {
      if (section.heading) {
        lines.push("");
        lines.push(`# ${section.heading}`);
      }
      if (section.table) {
        lines.push(section.table.headers.map(escapeCSV).join(","));
        for (const row of section.table.rows) {
          lines.push(row.map((v) => escapeCSV(String(v))).join(","));
        }
      }
    }
  }

  const csvContent = lines.join("\n");
  const encoder = new TextEncoder();
  const buffer = encoder.encode(csvContent);

  const filename = sanitizeFilename(content.title || "data") + ".csv";

  return {
    format: "csv",
    buffer,
    filename,
    mimeType: "text/csv",
  };
}

function escapeCSV(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

// ============================================
// MARKDOWN GENERATION
// ============================================

export function generateMarkdown(content: ArtifactContent): GeneratedArtifact {
  const lines: string[] = [];

  // Title
  if (content.title) {
    lines.push(`# ${content.title}`);
    lines.push("");
  }

  // Subtitle
  if (content.subtitle) {
    lines.push(`*${content.subtitle}*`);
    lines.push("");
  }

  // Sections
  if (content.sections) {
    for (const section of content.sections) {
      if (section.heading) {
        lines.push(`## ${section.heading}`);
        lines.push("");
      }

      if (section.content) {
        lines.push(section.content);
        lines.push("");
      }

      if (section.items) {
        for (const item of section.items) {
          lines.push(`- ${item}`);
        }
        lines.push("");
      }

      if (section.table) {
        lines.push(tableToMarkdown(section.table));
        lines.push("");
      }
    }
  }

  // Main table
  if (content.table && !content.sections?.some((s) => s.table)) {
    lines.push(tableToMarkdown(content.table));
    lines.push("");
  }

  // Footer
  if (content.footer) {
    lines.push("---");
    lines.push(`*${content.footer}*`);
  }

  const mdContent = lines.join("\n");
  const encoder = new TextEncoder();
  const buffer = encoder.encode(mdContent);

  const filename = sanitizeFilename(content.title || "document") + ".md";

  return {
    format: "markdown",
    buffer,
    filename,
    mimeType: "text/markdown",
  };
}

function tableToMarkdown(table: TableData): string {
  const lines: string[] = [];

  // Header
  lines.push("| " + table.headers.join(" | ") + " |");
  lines.push("| " + table.headers.map(() => "---").join(" | ") + " |");

  // Rows
  for (const row of table.rows) {
    lines.push("| " + row.map(String).join(" | ") + " |");
  }

  // Summary
  if (table.summary) {
    lines.push("");
    const summaryLine = Object.entries(table.summary)
      .map(([k, v]) => `**${k}:** ${v}`)
      .join(" | ");
    lines.push(summaryLine);
  }

  return lines.join("\n");
}

// ============================================
// CHART GENERATION (via QuickChart.io)
// ============================================

export async function generateChart(
  chartData: ChartData,
  options?: { width?: number; height?: number; backgroundColor?: string }
): Promise<GeneratedArtifact> {
  const width = options?.width || 600;
  const height = options?.height || 400;
  const backgroundColor = options?.backgroundColor || "white";

  // Build QuickChart configuration
  const chartConfig = {
    type: chartData.type,
    data: {
      labels: chartData.labels,
      datasets: chartData.datasets.map((ds) => ({
        label: ds.label,
        data: ds.data,
        backgroundColor: ds.backgroundColor || generateColors(ds.data.length),
        borderColor: ds.borderColor,
        borderWidth: 1,
      })),
    },
    options: {
      title: chartData.title
        ? { display: true, text: chartData.title }
        : undefined,
      responsive: false,
      plugins: {
        legend: { display: true },
      },
    },
  };

  // Call QuickChart.io API
  const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(
    JSON.stringify(chartConfig)
  )}&w=${width}&h=${height}&bkg=${encodeURIComponent(backgroundColor)}`;

  const response = await fetch(chartUrl);
  if (!response.ok) {
    throw new Error(`QuickChart API error: ${response.status}`);
  }

  const buffer = new Uint8Array(await response.arrayBuffer());
  const filename = sanitizeFilename(chartData.title || "chart") + ".png";

  return {
    format: "chart",
    buffer,
    filename,
    mimeType: "image/png",
  };
}

function generateColors(count: number): string[] {
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#E7E9ED",
    "#7CB342",
    "#5C6BC0",
    "#FF7043",
  ];
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(colors[i % colors.length]);
  }
  return result;
}

// ============================================
// UNIFIED GENERATOR
// ============================================

export async function generateArtifact(
  format: ArtifactFormat,
  content: ArtifactContent,
  options?: {
    rtl?: boolean;
    sheets?: { name: string; content: ArtifactContent }[];
    chartOptions?: { width?: number; height?: number; backgroundColor?: string };
  }
): Promise<GeneratedArtifact> {
  switch (format) {
    case "pdf":
      return generatePDF(content, { rtl: options?.rtl });
    case "excel":
      return generateExcel(content, { sheets: options?.sheets });
    case "csv":
      return generateCSV(content);
    case "markdown":
      return generateMarkdown(content);
    case "chart":
      if (!content.chart) {
        throw new Error("Chart data required for chart format");
      }
      return generateChart(content.chart, options?.chartOptions);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
}

// ============================================
// HELPERS
// ============================================

function sanitizeFilename(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9\u0590-\u05FF\s-]/g, "") // Allow Hebrew, English, numbers, spaces, hyphens
    .replace(/\s+/g, "_")
    .substring(0, 50);
}

// ============================================
// CONTENT BUILDERS (helpers for common use cases)
// ============================================

export function buildTaskListContent(
  tasks: Array<{
    title: string;
    status: string;
    due_date?: string;
    priority?: string;
    assigned_to?: string;
    category?: string;
  }>,
  eventName?: string
): ArtifactContent {
  const openTasks = tasks.filter((t) => t.status === "open");
  const doneTasks = tasks.filter((t) => t.status === "done");

  return {
    title: eventName ? `Task List - ${eventName}` : "Task List",
    subtitle: `${openTasks.length} open, ${doneTasks.length} completed`,
    table: {
      headers: ["Task", "Status", "Due Date", "Priority", "Assigned To"],
      rows: tasks.map((t) => [
        t.title,
        t.status === "done" ? "Done" : "Open",
        t.due_date || "-",
        t.priority || "medium",
        t.assigned_to || "-",
      ]),
      summary: {
        Total: tasks.length,
        Open: openTasks.length,
        Done: doneTasks.length,
      },
    },
    footer: `Generated by Event.nApp - ${new Date().toLocaleDateString("he-IL")}`,
  };
}

export function buildBudgetContent(
  items: Array<{
    category?: string;
    name: string;
    estimated_cost?: number;
    actual_cost?: number;
    status?: string;
  }>,
  eventName?: string
): ArtifactContent {
  const totalEstimated = items.reduce((sum, i) => sum + (i.estimated_cost || 0), 0);
  const totalActual = items.reduce((sum, i) => sum + (i.actual_cost || 0), 0);

  return {
    title: eventName ? `Budget - ${eventName}` : "Budget Summary",
    subtitle: `Total Estimated: ${totalEstimated.toLocaleString()}`,
    table: {
      headers: ["Category", "Item", "Estimated", "Actual", "Status"],
      rows: items.map((i) => [
        i.category || "-",
        i.name,
        i.estimated_cost ? `${i.estimated_cost.toLocaleString()}` : "-",
        i.actual_cost ? `${i.actual_cost.toLocaleString()}` : "-",
        i.status || "pending",
      ]),
      summary: {
        "Total Estimated": totalEstimated.toLocaleString(),
        "Total Actual": totalActual.toLocaleString(),
        Difference: (totalEstimated - totalActual).toLocaleString(),
      },
    },
    footer: `Generated by Event.nApp - ${new Date().toLocaleDateString("he-IL")}`,
  };
}

export function buildGuestListContent(
  guests: Array<{
    name: string;
    side?: string;
    group_name?: string;
    rsvp_status?: string;
    plus_one?: boolean;
    plus_one_name?: string;
  }>,
  eventName?: string
): ArtifactContent {
  const confirmed = guests.filter((g) => g.rsvp_status === "confirmed");
  const pending = guests.filter((g) => g.rsvp_status === "pending");
  const declined = guests.filter((g) => g.rsvp_status === "declined");

  return {
    title: eventName ? `Guest List - ${eventName}` : "Guest List",
    subtitle: `${guests.length} guests (${confirmed.length} confirmed)`,
    table: {
      headers: ["Name", "Side", "Group", "RSVP", "+1"],
      rows: guests.map((g) => [
        g.name,
        g.side || "-",
        g.group_name || "-",
        g.rsvp_status || "pending",
        g.plus_one ? (g.plus_one_name || "Yes") : "-",
      ]),
      summary: {
        Total: guests.length,
        Confirmed: confirmed.length,
        Pending: pending.length,
        Declined: declined.length,
      },
    },
    footer: `Generated by Event.nApp - ${new Date().toLocaleDateString("he-IL")}`,
  };
}

export function buildComparisonChart(
  title: string,
  items: Array<{ name: string; values: Record<string, number> }>
): ChartData {
  const categories = Object.keys(items[0]?.values || {});

  return {
    type: "bar",
    title,
    labels: items.map((i) => i.name),
    datasets: categories.map((cat) => ({
      label: cat,
      data: items.map((i) => i.values[cat] || 0),
    })),
  };
}
