import json
from bs4 import BeautifulSoup
# from show.model import kamenRiderSeries
from time import sleep
from soup import getAllTVShow, getAllEraLinks, getAllShowLinks


prefix = "https://kamenrider.fandom.com"

def getYearFromAirDate(airdate):
    if ("present" in airdate):
        return 2024
    try: 
        return int(airdate.split(",")[2].split("-")[0])
    except:
        return int(airdate.split(",")[2].split("-")[0].split("(")[0])
    

def get_poster(link):
    print(link)    
      

# def writeJson(tv_shows):
#     with open("data.json", "w") as file:
#         json.dump( [tv.__dict__ for tv in tv_shows], file, indent=4)

def main():
    tv_shows_all = []

    eras_links = getAllEraLinks(prefix)
    eras_links.pop(2)

    rider_links = getAllShowLinks(eras_links)

    # tv_shows_all += getAllTVShow(links)
    # writeJson(tv_shows_all)

main()