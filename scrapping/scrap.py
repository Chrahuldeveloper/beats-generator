import requests
import csv
from pathlib import Path

Path("beats").mkdir(exist_ok=True)

with open("links.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)

    for i, row in enumerate(reader, 1):
        url = row["links"]

        print("Downloading:", url)

        r = requests.get(url, timeout=60)

        if r.status_code == 200:
            output = Path("beats") / f"beat_{i}.mp3"
            output.write_bytes(r.content)
            print("saved",output)
        else:
            print("Failed:", r.status_code)