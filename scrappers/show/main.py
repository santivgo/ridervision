import json
from bs4 import BeautifulSoup
# from show.model import kamenRiderSeries
from time import sleep
from soup import *
from models import Show


prefix = "https://kamenrider.fandom.com"


series_dict = {}

# def writeJson(tv_shows):
#     with open("data.json", "w") as file:
#         json.dump( [tv.__dict__ for tv in tv_shows], file, indent=4)

def main():

    eras_links = getAllEraLinks(prefix)
    eras_links.pop(2)

    rider_category = getAllRidersCategoryLinks(prefix)
    # shows_links = getAllShowLinks(eras_links, prefix)
    

    # for i, link in enumerate(shows_links[:-1]):
    #     show = Show(link)
    #     series_dict.update({show.url:i})
    


    rider_links = [url for link in rider_category for url in getAllRidersLink(link)]

    print(rider_links)

    


    # writeJson(tv_shows_all)

main()