=[System.IO.File]::ReadAllBytes('DWUD digital pdf.pdf') 
=[System.Text.Encoding]::ASCII.GetString() 
=.IndexOf('/Type /Page') 
if( -lt 0){=0} 
Write-Output .Substring(, [Math]::Min(4000,.Length-)) 
