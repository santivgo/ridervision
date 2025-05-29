import json
from bs4 import BeautifulSoup
# from show.model import kamenRiderSeries
from time import sleep
from soup import getAllTVShow, getAllEraLinks, getAllShowLinks


prefix = "https://kamenrider.fandom.com"




# def writeJson(tv_shows):
#     with open("data.json", "w") as file:
#         json.dump( [tv.__dict__ for tv in tv_shows], file, indent=4)

def main():

    eras_links = getAllEraLinks(prefix)
    eras_links.pop(2)

    shows_links = getAllShowLinks(eras_links, prefix)
    print(shows_links)
    tv_shows_all = getAllTVShow(shows_links)
    # writeJson(tv_shows_all)

main()