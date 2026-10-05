import pandas as pd
import json
from pathlib import Path

metadata_path = Path(
    "/home/rahul/Desktop/code/Apps/beats-generator/metadata"
)

training_path = Path(
    "/home/rahul/Desktop/code/Apps/beats-generator/training"
)


for path in metadata_path.glob("*.json"):
    with open(path,"r") as f:
        data = json.load(f)
        
        df = pd.DataFrame(data["events"])

        beats = [
        "SNARE",
        "TOM-MID",
        "CLAP",
        "KICK",
        "HIHAT-CLOSED",
        "BONGO",
        "BASS",
        "HIHAT",
        "HIHAT-OPEN",
        "TAMBOURINE",
        "TOM-HIGH",
        "TOM-LOW",
        "SAMPLE"
        ]
        
        if len(df) >= 64:
            df = df.iloc[:64]
            grid = []
            for i in range(64):
                row = []
                print(i,  df.iloc[i]["sample"])

                for beat in beats:
                    if df.iloc[i]["sample"] == beat:
                        row.append(1)
                    else:
                        row.append(0)   

                grid.append(row)

            output_path = training_path / path.name

            with open(output_path, "w") as f:
                    json.dump(grid, f, indent=2)

            print("Saved:", output_path)

        else:
            print("less than 64",path)    