import json

def writeJson(tv_shows):
    with open("data.json", "w") as file:
        json.dump( [tv.__dict__ for tv in tv_shows], file, indent=4)
