from bs4 import BeautifulSoup
import requests

def getAllEraLinks(prefix):
    soup = BeautifulSoup(requests.get(f'{prefix}/wiki/Kamen_Rider_Series').content, 'html.parser')

    tables = soup.find("div", class_='mw-content-ltr')
    tables = tables.find("div")
    tables = tables.find_all("div")


    return [ f"{prefix}{table.find('tr').find('a').get('href')}" for table in tables[1:-1]]


def getAllShowLinks(links):
    index_tab = 0
    for i, link in enumerate(links):
        soup = BeautifulSoup(requests.get(link).content, 'html.parser')

        if (i == 2):
            index_tab = 2


        show_el = soup.find_all('div', class_='tabber wds-tabber')[index_tab]
        show_list = show_el.find_all('div', recursive=False)[1]

        print(show_list)

        # print(show_list)



def getAllRiders(soup):
    table = soup.find_all("table", {'class':"mw-collapsible mw-collapsed"})
    for h in table: 
        link_list =  h.find_all("a")
        for link in link_list:
            title = link.get('title')
            print(f'Título: {title}' if title else 'Sem título')


def getAllTVShow(soup):
    pass
    # tv_shows = []
    # airdate = ""
    # tv_show = ""
    # poster = ""
    # forms = []
    # synopsis = ""
    # for i, link in enumerate(links):
    #     local_soup = BeautifulSoup(requests.get(f'{prefix}{link}').content, 'html.parser')
                
    #     tv_show = local_soup.find("h2", {'data-source':'name'}).text + " (TV Show)"
    #     if(tv_show == "Kamen Rider Zeztz (TV Show)"):
    #         continue

    #     #getAllRiders(local_soup)

    #     airdate = getYearFromAirDate(local_soup.find("div", {'data-source':'airdate'}).text)

    #     try:
    #         poster = local_soup.find("figure", {'data-source':'poster'}).find("a", {'class': 'image'})['href']
    #     except:
    #         poster = local_soup.find("figure", {'class':'pi-image'}).find("a", {'class': 'image'})['href']
        
    #     poster = get_poster(poster)
        
    #     try: 
    #         synopsis_el = local_soup.find("span", {'id':'Story'}).find_next("p")
    #     except:
    #         pass
    #     try:
    #         synopsis_el = local_soup.find("span", {'id':'Plot'}).find_next("p")
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
            
    #     tv_shows.append(kamenRiderSeries(i, tv_show, airdate, poster,synopsis))
    # return tv_shows  