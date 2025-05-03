import json
import requests
from bs4 import BeautifulSoup
from main_show import kamenRiderSeries


prefix = "https://kamenrider.fandom.com"
soup = BeautifulSoup(requests.get(f'{prefix}/wiki/Kamen_Rider_Series/Heisei_Series').content, 'html.parser')

def getAllLinks():
    table = soup.find("div", {"class":'wds-tab__content'})
    return [ f"{prefix}{link['href']}" for link in table.find_all("a")]
def getYearFromAirDate(airdate):
    try: 
        return int(airdate.split(",")[2].split("-")[0])
    except:
        return int(airdate.split(",")[2].split("-")[0].split("(")[0])


def getAllTVShow(links):

    tv_shows = []
    airdate = ""
    tv_show = ""
    poster = ""
    forms = []
    for i, link in enumerate(links):
        local_soup = BeautifulSoup(requests.get(link).content, 'html.parser')

        tv_show = local_soup.find("h2", {'data-source':'name'}).text + " (TV Show)"
        airdate = getYearFromAirDate(local_soup.find("div", {'data-source':'airdate'}).text) 
        try:
            poster = local_soup.find("figure", {'data-source':'poster'}).find("a", {'class': 'image'})['href']
        except:
            poster = local_soup.find("figure", {'class':'pi-image'}).find("a", {'class': 'image'})['href']
            
        tv_shows.append(kamenRiderSeries(i, tv_show, airdate, poster))
    return tv_shows        


def main():
    links = getAllLinks()
    tv_shows = getAllTVShow(links)
    print([tv.__dict__ for tv in tv_shows])
    with open("data.json", "w") as file:
        json.dump( [tv.__dict__ for tv in tv_shows], file, indent=4)
main()