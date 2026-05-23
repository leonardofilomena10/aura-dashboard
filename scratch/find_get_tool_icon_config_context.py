with open('C:/Users/Admin/.gemini/antigravity/scratch/aura-dashboard/src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

import re
match = re.search(r'const getToolIconConfig\s*=', content)
if match:
    start_line = content.count('\n', 0, match.start()) + 1
    end_idx = content.find('const renderToolIcon', match.start())
    end_line = content.count('\n', 0, end_idx) + 1
    print(f"Start line: {start_line}, End line: {end_line}")
else:
    print("Not found")
