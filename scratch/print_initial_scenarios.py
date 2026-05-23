with open('C:/Users/Admin/.gemini/antigravity/scratch/aura-dashboard/src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

import re
idx = content.find("const INITIAL_SCENARIOS = [")
if idx != -1:
    # let's look at the next 2000 characters
    print(content[idx:idx+2500].encode('ascii', 'ignore').decode('ascii'))
else:
    print("Not found")
