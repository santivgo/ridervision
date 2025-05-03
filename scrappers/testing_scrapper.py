import json
import requests
from bs4 import BeautifulSoup
from main_show import kamenRiderSeries
from time import sleep


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
    synopsis = ""
    for i, link in enumerate(links):
        local_soup = BeautifulSoup(requests.get(link).content, 'html.parser')

        tv_show = local_soup.find("h2", {'data-source':'name'}).text + " (TV Show)"

        airdate = getYearFromAirDate(local_soup.find("div", {'data-source':'airdate'}).text) 
        try:
            poster = local_soup.find("figure", {'data-source':'poster'}).find("a", {'class': 'image'})['href']
        except:
            poster = local_soup.find("figure", {'class':'pi-image'}).find("a", {'class': 'image'})['href']
        
        try: 
            print(tv_show)
            synopsis_el = local_soup.find("span", {'id':'Story'}).find_next("p")
            print(local_soup.find("span", {'id':'Story'}).find_next("p"))
        except:
            pass
        try:
            synopsis_el = local_soup.find("span", {'id':'Plot'}).find_next("p")
        except:
            pass
        try: 
            synopsis_el = local_soup.find("span", {'id':'Plot'}).find_next("p")
        except:
            pass 
        

        if("Kamen Rider OOO (TV Show)" == tv_show):
            synopsis_el = synopsis_el.find_next_sibling()
        


        if (synopsis_el.find_next_sibling('p')):
            synopsis = (synopsis_el.text + synopsis_el.find_next_sibling('p').text)
        else:
            synopsis = (synopsis_el.text)

            

            
        tv_shows.append(kamenRiderSeries(i, tv_show, airdate, poster,synopsis))
    return tv_shows        


def main():
    links = getAllLinks()
    tv_shows = getAllTVShow(links)
    print([tv.__dict__ for tv in tv_shows])
    with open("data.json", "w") as file:
        json.dump( [tv.__dict__ for tv in tv_shows], file, indent=4)
main()