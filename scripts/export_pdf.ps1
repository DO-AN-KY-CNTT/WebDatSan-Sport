$docxPath = (Resolve-Path "Bao_Cao_Tong_Hop_SportBooking.docx").Path
$pdfPath = [System.IO.Path]::ChangeExtension($docxPath, ".pdf")
Write-Host "Exporting to PDF: $pdfPath"

$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
    $doc = $word.Documents.Open($docxPath)
    # Update all fields in document (TOC, page numbers)
    $doc.Fields.Update()
    
    # 17 = wdFormatPDF
    $doc.SaveAs([ref]$pdfPath, [ref]17)
    Write-Host "PDF successfully exported: $pdfPath"
    
    # Also copy PDF to docs/ and frontend/public/
    Copy-Item $pdfPath -Destination "docs/Bao_Cao_Tong_Hop_SportBooking.pdf" -Force
    Copy-Item $pdfPath -Destination "frontend/public/Bao_Cao_Tong_Hop_SportBooking.pdf" -Force
    Write-Host "Copied PDF to docs/ and frontend/public/"
    
    $doc.Close([ref]$false)
} catch {
    Write-Host "Error during PDF export: $($_.Exception.Message)"
} finally {
    $word.Quit()
}
