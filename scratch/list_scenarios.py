with open('C:/Users/Admin/.gemini/antigravity/scratch/aura-dashboard/src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find("const INITIAL_SCENARIOS = [")
end_idx = content.find("];", idx)
scenarios_block = content[idx:end_idx+2]

import re
matches = re.findall(r'id:\s*["\']([^"\']+)["\'],\s*name:\s*["\']([^"\']+)["\']', scenarios_block)
print(f"Total scenarios found: {len(matches)}")
for i, m in enumerate(matches):
    print(f"{i+1}: {m[0]} -> {m[1]}")
