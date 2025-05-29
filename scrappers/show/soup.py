import requests
from bs4 import BeautifulSoup
from model import Show
from utils import *

def getAllEraLinks(prefix):
    soup = BeautifulSoup(requests.get(f'{prefix}/wiki/Kamen_Rider_Series').content, 'html.parser')

    tables = soup.find("div", class_='mw-content-ltr')
    tables = tables.find("div")
    tables = tables.find_all("div")


    return [ f"{prefix}{table.find('tr').find('a').get('href')}" for table in tables[1:-1]]


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
    synopsis = []
    
    for i, link in enumerate(links):
        local_soup = BeautifulSoup(requests.get(f'{link}').content, 'html.parser')
                
        tv_show = local_soup.find("h2", {'data-source':'name'}).text + " (TV Show)"
        if(tv_show == "Kamen Rider Zeztz (TV Show)"):
            continue
        
        #getAllRiders(local_soup)

        airdate = getYearFromAirDate(local_soup.find("div", {'data-source':'airdate'}).text)

        try:
            poster = local_soup.find("figure", {'data-source':'poster'}).find("a", {'class': 'image'})['href']
        except:
            poster = local_soup.find("figure", {'class':'pi-image'}).find("a", {'class': 'image'})['href']
        
        poster = get_poster(poster)

        print(tv_show)


        if 'Decade' in tv_show:
            inicio_sinopse = local_soup.find("span", {'id':'Plot'}).find_parent()
            fim_sinopse = local_soup.find("span", {'id':'Production'}).find_parent()
        elif 'Amazons' in tv_show:
            inicio_sinopse = local_soup.find("span", {'id':'Series_Overview'}).find_parent()
            fim_sinopse = local_soup.find("span", {'id':'Characters'}).find_parent()
        else:
            try:
                inicio_sinopse = local_soup.find("span", {'id':'Story'}).find_parent()
            except:
                inicio_sinopse = local_soup.find("span", {'id':'Plot'}).find_parent().find_next()

            fim_sinopse = local_soup.find("span", {'id':'Characters'}).find_parent()


        # try: 
        #     inicio_sinopse = local_soup.find("span", {'id':'Story'}).find_parent()

        #     print(local_soup.find("span", {'id':'Series_Overview'}))

        #     # inicio_sinopse = local_soup.find("span", {'id':'Series_Overview'}).find_parent()


        # fim_sinopse = local_soup.find("span", {'id':'Characters'}).find_parent()
        
        for paragrafo in inicio_sinopse.find_next_siblings():
            if paragrafo == fim_sinopse:
                break
            synopsis.append(paragrafo.getText())
            
            


    #     try:
    #     except:
    #         pass
    #     try: 
    #         synopsis_el = local_soup.find("span", {'id':'Plot'}).find_next("p")
    #     except:
    #         pass 
        

    #     if("Kamen Rider OOO (TV Show)" == tv_show):
    #         synopsis_el = synopsis_el.find_next_sibling()
        


    #     if (synopsis_el.find_next_sibling('p')):
    #         synopsis = (synopsis_el.text + synopsis_el.find_next_sibling('p').text)
    #     else:
    #         synopsis = (synopsis_el.text)
            
    #     tv_shows.append(Show(i, tv_show, airdate, poster,synopsis))
    # return tv_shows  


if __name__ == "__main__":
    print("Este arquivo não deve ser executado diretamente.")