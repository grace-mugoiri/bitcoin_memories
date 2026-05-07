import json
from memories import memories

with open("../frontend/src/data/memories.json", "w") as f:
    json.dump(memories, f, indent=2)

print("Memories built ✔")