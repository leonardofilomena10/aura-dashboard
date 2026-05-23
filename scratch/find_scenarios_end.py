with open('C:/Users/Admin/.gemini/antigravity/scratch/aura-dashboard/src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find("const INITIAL_SCENARIOS = [")
if idx != -1:
    end_idx = content.find("];", idx)
    print("Found end at:", end_idx)
    # print the last 800 characters of the array definition
    print(content[end_idx-800:end_idx+5].encode('ascii', 'ignore').decode('ascii'))
else:
    print("Not found")
