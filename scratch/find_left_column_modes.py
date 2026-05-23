with open('C:/Users/Admin/.gemini/antigravity/scratch/aura-dashboard/src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find("TAB: LIVE ACTION WORKSPACE (TERMINAL)")
if idx != -1:
    # search for the mode rendering blocks in the left column
    # e.g., actionMode === 'gmb' or similar
    import re
    for match in re.finditer(r'actionMode\s*===\s*[\'\"](gmb|tiktok|saas|outreach|youtube|scenario)[\'\"]', content[idx:idx+15000]):
        start = max(0, match.start() - 50)
        end = min(len(content[idx:idx+15000]), match.end() + 500)
        text = content[idx:idx+15000][start:end].encode('ascii', 'ignore').decode('ascii')
        print(f"Match at {idx + match.start()} for mode {match.group(1)}:\n{text}\n---")
else:
    print("Not found")
