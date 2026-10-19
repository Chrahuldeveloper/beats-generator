from pathlib import Path
import os
import json

sequence_data = list(Path("../sequence").iterdir())
meta_data = list(Path("../metadata").iterdir())

os.makedirs("./training-data", exist_ok=True)


for metafile in meta_data:
    for sequencefile in sequence_data:
        if metafile.name == sequencefile.name:
            with open(metafile, "r") as f:
               metadata =  json.load(f)["metadata"]
            with open (sequencefile,"r") as f:
                sequence = json.load(f)


            with open(Path("./training-data") / metafile.name, "w") as f:
                json.dump({
                    "metadata": metadata,
                    "sequence": sequence
                }, f, indent=2)

print("done")