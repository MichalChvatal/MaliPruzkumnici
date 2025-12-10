# Resize images in img/ folder to max 1000px width
Add-Type -AssemblyName System.Drawing

$targetFolder = "c:\Repo\mali_pruzkumnici\img"
$maxWidth = 1000

Get-ChildItem -Path $targetFolder -Filter "Foto_krouzek_*.jpg" | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    
    if ($img.Width -gt $maxWidth) {
        $newHeight = [Math]::Floor($img.Height * ($maxWidth / $img.Width))
        $resized = new-object System.Drawing.Bitmap($maxWidth, $newHeight)
        $graph = [System.Drawing.Graphics]::FromImage($resized)
        $graph.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graph.DrawImage($img, 0, 0, $maxWidth, $newHeight)
        
        $img.Dispose()
        
        # Save as new file then replace original to avoid locking issues
        $tempName = $_.FullName + ".tmp.jpg"
        $resized.Save($tempName, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        $resized.Dispose()
        $graph.Dispose()
        
        Move-Item -Path $tempName -Destination $_.FullName -Force
        Write-Host "Resized: $($_.Name)"
    } else {
        $img.Dispose()
        Write-Host "Skipped (already small): $($_.Name)"
    }
}
