import json
import requests
from bs4 import BeautifulSoup
from show.model import kamenRiderSeries
from time import sleep


prefix = "https://kamenrider.fandom.com"

def getAllLinks(soup):
    table = soup.find_all("div", class_='wds-tab__content')[-3]
    return [ f"{prefix}{link.a['href']}" for link in table.find_all("li")]

def getYearFromAirDate(airdate):
    if ("present" in airdate):
        return 2024
    try: 
        return int(airdate.split(",")[2].split("-")[0])
    except:
        return int(airdate.split(",")[2].split("-")[0].split("(")[0])
    
def getAllRiders(soup):
    table = soup.find_all("table", {'class':"mw-collapsible mw-collapsed"})
    for h in table: 
        link_list =  h.find_all("a")
        for link in link_list:
            title = link.get('title')
            print(f'Título: {title}' if title else 'Sem título')
    

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
        if(tv_show == "Kamen Rider Zeztz (TV Show)"):
            continue

        #getAllRiders(local_soup)

        airdate = getYearFromAirDate(local_soup.find("div", {'data-source':'airdate'}).text)

        try:
            poster = local_soup.find("figure", {'data-source':'poster'}).find("a", {'class': 'image'})['href']
        except:
            poster = local_soup.find("figure", {'class':'pi-image'}).find("a", {'class': 'image'})['href']
        
        try: 
            synopsis_el = local_soup.find("span", {'id':'Story'}).find_next("p")
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

def writeJson(tv_shows):
    with open("data.json", "w") as file:
        json.dump( [tv.__dict__ for tv in tv_shows], file, indent=4)

def main():
    urls = ['Heisei_Series', 'Reiwa_Series']
    tv_shows_all = []
    urls.reverse()
    for url in urls: 
        soup = BeautifulSoup(requests.get(f'{prefix}/wiki/Kamen_Rider_Series/{url}').content, 'html.parser')
        links = getAllLinks(soup)
        tv_shows_all += getAllTVShow(links)
    writeJson(tv_shows_all)

main()