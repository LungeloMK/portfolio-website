# Resize screenshots to 1200px and produce WebP variants
# Requires ImageMagick (magick) available in PATH

$assets = @(
  'assets/proj-cleanslate.png',
  'assets/proj-devworkflow.png'
)

foreach($src in $assets){
  if(-not (Test-Path $src)){ Write-Host "Skipping missing $src"; continue }
  $base = [System.IO.Path]::GetFileNameWithoutExtension($src)
  $dir = [System.IO.Path]::GetDirectoryName($src)
  $outPng = Join-Path $dir ("${base}-1200.png")
  $outWebp = Join-Path $dir ("${base}.webp")

  Write-Host "Processing $src -> $outPng and $outWebp"
  # Resize to width 1200px, preserving aspect ratio, and strip metadata
  magick convert `"$src`" -resize 1200x -strip -quality 85 `"$outPng`"
  # Create a WebP (lossy) variant
  magick convert `"$outPng`" -quality 80 `"$outWebp`"
}

Write-Host "Done. Check the assets/ folder for new files."