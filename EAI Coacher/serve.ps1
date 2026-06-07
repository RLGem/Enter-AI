# Enter AI — Local dev server
# Run: .\serve.ps1
# Then open: http://localhost:8080

$port = 8080
$root = $PSScriptRoot

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host ""
Write-Host "  Enter AI — AIlex Knowledge Base" -ForegroundColor Cyan
Write-Host "  Local server running at: http://localhost:$port" -ForegroundColor Green
Write-Host "  Serving from: $root" -ForegroundColor Gray
Write-Host "  Press Ctrl+C to stop." -ForegroundColor Gray
Write-Host ""

$mimeTypes = @{
  '.html' = 'text/html; charset=utf-8'
  '.md'   = 'text/plain; charset=utf-8'
  '.css'  = 'text/css'
  '.js'   = 'application/javascript'
  '.json' = 'application/json'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.svg'  = 'image/svg+xml'
  '.ico'  = 'image/x-icon'
}

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response

    $path = $req.Url.LocalPath -replace '/', [System.IO.Path]::DirectorySeparatorChar
    $path = $path.TrimStart([System.IO.Path]::DirectorySeparatorChar)
    $fullPath = Join-Path $root $path

    if ((Test-Path $fullPath -PathType Container) -or $path -eq '') {
      $fullPath = Join-Path $root 'index.html'
    }

    if (Test-Path $fullPath -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
      $mime = $mimeTypes[$ext]
      if (-not $mime) { $mime = 'application/octet-stream' }

      $res.ContentType = $mime
      $res.Headers.Add('Access-Control-Allow-Origin', '*')
      $bytes = [System.IO.File]::ReadAllBytes($fullPath)
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
      Write-Host "  200  $($req.Url.LocalPath)" -ForegroundColor DarkGray
    } else {
      $res.StatusCode = 404
      $body = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
      $res.ContentLength64 = $body.Length
      $res.OutputStream.Write($body, 0, $body.Length)
      Write-Host "  404  $($req.Url.LocalPath)" -ForegroundColor DarkYellow
    }

    $res.OutputStream.Close()
  }
} finally {
  $listener.Stop()
}
