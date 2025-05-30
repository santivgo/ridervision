import requests
from bs4 import BeautifulSoup
from parse import *

def getAllEraLinks(prefix):
    soup = BeautifulSoup(requests.get(f'{prefix}/wiki/Kamen_Rider_Series').content, 'html.parser')

    tables = soup.find("div", class_='mw-content-ltr')
    tables = tables.find("div")
    tables = tables.find_all("div")


    return [ f"{prefix}{table.find('tr').find('a').get('href')}" for table in tables[1:-1]]


def getAllRidersCategoryLinks(prefix):
    links = []
    riderEls = []
    soup = BeautifulSoup(requests.get(f'{prefix}/wiki/Category:Riders_by_series').content, 'html.parser')
    by_show = soup.find('span', id='By_show').find_parent()
    adaptations = soup.find('span', id='Adaptations').find_parent()
    
    for p in by_show.find_next_siblings():
        if p == adaptations:
            break
        riderEls.append(p)

    for el in riderEls:
        if el.find_all('li'):
            li_items = el.find_all('li')
            for li in li_items:
                links.append('{}{}'.format(prefix, li.find('a').get('href')) )
    links.append('https://kamenrider.fandom.com/wiki/Category:Amazons_Riders')
    return links


def getAllRidersLink(link):
    soup = BeautifulSoup(requests.get(link).content, 'html.parser')

    
    if (link == 'https://kamenrider.fandom.com/wiki/Category:Gaim_Riders'):
        soup = BeautifulSoup(requests.get(link+"#Armored_Riders").content, 'html.parser')
    
    if soup.find('div', id='gallery-0'):
        ridersEl = soup.find('div', id='gallery-0')
    elif soup.find('div', id='gallery-1'):
        ridersEl = soup.find('div', id='gallery-1')
    elif soup.find('div', id='gallery-8'):
        ridersEl = soup.find('div', id='gallery-8')

    bolds = ridersEl.find_all('b')
    urlList = []

    for bold in bolds:
        riderUrl = bold.find('a')
        if riderUrl:
            urlList.append(riderUrl.get('href'))
    return urlList        


def getAllShowLinks(links, prefix):
    all_shows = []
    index_tab = 0
    for i, link in enumerate(links):
        if (i == 2):
            index_tab = 3
        
        soup = BeautifulSoup(requests.get(link).content, 'html.parser')
        show_el = soup.find_all('div', class_='tabber wds-tabber')[index_tab]
        try:
            show_list = show_el.find_all('div', recursive=False)[1].find_all('li')
        except:
            show_list = show_el.find_all('ul')[1].find_all('li')

        for item in show_list:
            all_shows.append( '{}{}'.format(prefix, item.find('i').find('a').get('href')))

    return all_shows

