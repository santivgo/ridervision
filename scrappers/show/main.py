import json
from bs4 import BeautifulSoup
from time import sleep
from soup import *
from models import Show, Rider
from utils import to_json

prefix = "https://kamenrider.fandom.com"


series_dict = {}

# def writeJson(tv_shows):
#     with open("data.json", "w") as file:
#         json.dump( [tv.__dict__ for tv in tv_shows], file, indent=4)

def main():
    riderList = []
    showList = []

    eras_links = getAllEraLinks(prefix)
    rider_category_links = getAllRidersCategoryLinks(prefix)
    shows_links = getAllShowLinks(eras_links, prefix)


    for i, link in enumerate(shows_links[:-1]):
        show = Show(i, link)
        showList.append(show)
        series_dict.update({show.url:i})

    to_json(showList, 'shows')
    
    for url in rider_category_links: 
        riderList.extend(getAllRidersLink(prefix, url, series_dict))    
    
    to_json(riderList, 'riders')
        


main()