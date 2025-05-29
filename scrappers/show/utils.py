import json

def get_poster(link):
    return link.split('revision')[0]   

def getYearFromAirDate(airdate):
    if ("present" in airdate):
        return 2024
    try: 
        return int(airdate.split(",")[2].split("-")[0])
    except:
        return int(airdate.split(",")[2].split("-")[0].split("(")[0])

def writeJson(tv_shows):
    with open("data.json", "w") as file:
        json.dump( [tv.__dict__ for tv in tv_shows], file, indent=4)

def writeTest(synopsis):
    with open("texts.txt", "+a") as file:
        file.writelines(str(synopsis)+"\n\n\n")