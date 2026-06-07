# Agile Site - Static server in PowerShell only (no installation)
# Run: Right-click serve.ps1 -> Run with PowerShell
# Or: powershell -ExecutionPolicy Bypass -File serve.ps1

$Root = $PSScriptRoot
$Ports = @(8888, 3001, 3000)
$Listener = $null

foreach ($Port in $Ports) {
  $Listener = New-Object System.Net.HttpListener
  $Listener.Prefixes.Add("http://localhost:$Port/")
  try {
    $Listener.Start()
    $Url = "http://localhost:$Port/"
    break
  } catch {
    $Listener = $null
  }
}

if (-not $Listener) {
  Write-Host "Error: All ports (8888, 3001, 3000) are in use. Close other servers and try again." -ForegroundColor Red
  exit 1
}

Write-Host ""
Write-Host "  Agile Site - Local Server" -ForegroundColor Cyan
Write-Host "  $Url" -ForegroundColor Green
Write-Host "  Opening browser... Press Ctrl+C to stop" -ForegroundColor Gray
Write-Host ""
Start-Process $Url

$Mime = @{
  ".html" = "text/html; charset=utf-8"
  ".htm"  = "text/html; charset=utf-8"
  ".css"  = "text/css"
  ".js"   = "application/javascript"
  ".json" = "application/json"
  ".md"   = "text/markdown; charset=utf-8"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".gif"  = "image/gif"
  ".svg"  = "image/svg+xml"
  ".webp" = "image/webp"
  ".mp4"  = "video/mp4"
  ".webm" = "video/webm"
  ".ico"  = "image/x-icon"
}

while ($Listener.IsListening) {
  try {
    $Context = $Listener.GetContext()
    $Path = $Context.Request.Url.LocalPath
    if ($Path -eq "/") { $Path = "/index.html" }
    $FilePath = Join-Path $Root ($Path.TrimStart("/").Replace("/", [IO.Path]::DirectorySeparatorChar))
    
    if (Test-Path $FilePath -PathType Leaf) {
      $Ext = [IO.Path]::GetExtension($FilePath)
      $Context.Response.ContentType = if ($Mime[$Ext]) { $Mime[$Ext] } else { "application/octet-stream" }
      $Context.Response.StatusCode = 200
      [IO.File]::OpenRead($FilePath).CopyTo($Context.Response.OutputStream)
    } else {
      $Context.Response.StatusCode = 404
    }
    $Context.Response.Close()
  } catch { break }
}
$Listener.Stop()
