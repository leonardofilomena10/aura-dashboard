with open('C:/Users/Admin/.gemini/antigravity/scratch/aura-dashboard/src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find("actionMode === 'scenario'")
idx1 = content.find("actionMode === 'scenario'", idx + 1)
idx2 = content.find("actionMode === 'scenario'", idx1 + 1)

if idx2 != -1:
    start = idx2
    end = min(len(content), idx2 + 4000)
    text = content[start:end].encode('ascii', 'ignore').decode('ascii')
    print(text)
else:
    print("Not found")
