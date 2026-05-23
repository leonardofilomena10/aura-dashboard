with open('C:/Users/Admin/.gemini/antigravity/scratch/aura-dashboard/src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

import re
matches = list(re.finditer(r'actionMode\s*===\s*[\'\"]scenario[\'\"]', content))
if len(matches) >= 3:
    match = matches[2]
    line_no = content.count('\n', 0, match.start()) + 1
    print(f'Match 3 line: {line_no}')
else:
    print('Not enough matches')
