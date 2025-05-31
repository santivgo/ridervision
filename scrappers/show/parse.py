import requests
from bs4 import BeautifulSoup
from utils import writeImage

class Parse:
        
    @staticmethod
    def getShowName(soup):
        return soup.find("h2", {'data-source':'name'}).text + " (TV Show)"
    
    @staticmethod
    def getSoup(link):
        return BeautifulSoup(requests.get(f'{link}').content, 'html.parser')

    @staticmethod
    def getPoster(name, soup):
        hasPoster = {
            'Kamen Rider V3 (TV Show)': 'https://m.media-amazon.com/images/M/MV5BNWE2NzRkNzQtOTkyMy00MjdjLTkxZDQtNDY4YzVlY2FiOGE0XkEyXkFqcGc@._V1_.jpg',
            'Kamen Rider X (TV Show)': 'https://m.media-amazon.com/images/M/MV5BNWVmM2MzNGItODc1Yi00YWNmLTk5NTgtODBhZjllOGYyZjMxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
            'Kamen Rider Amazon (TV Show)': 'https://m.media-amazon.com/images/M/MV5BNTdhMTNhNWQtOWZlNC00ODhmLTlhNjMtNzllM2M0YzIzNDgyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
            'Kamen Rider Stronger (TV Show)': 'https://m.media-amazon.com/images/M/MV5BNzYzOGIzYzYtZTg5Ny00MTk4LTg1MWEtMzZkNTM4MmE5YmU2XkEyXkFqcGc@._V1_.jpg',
            'Kamen Rider Super-1 (TV Show)': 'https://static.wikia.nocookie.net/kamenrider/images/b/b2/Super_1_movie_poster.jpg/',
            'Kamen Rider Ryuki (TV Show)': 'https://static.wikia.nocookie.net/kamenrider/images/7/75/Ryuki_Poster.jpg',
            'Kamen Rider Amazons (TV Show)': 'https://static.wikia.nocookie.net/kamenrider/images/e/e8/KRAs-LastJudgement.jpg',
            'Kamen Rider Gotchard (TV Show)': 'https://static.wikia.nocookie.net/kamenrider/images/4/49/Gotchard_Q1_Poster.jpg',
            'Kamen Rider Gavv (TV Show)': 'https://static.wikia.nocookie.net/kamenrider/images/5/54/Gavv_Q1_Poster.jpg'
            } # todos esses aqui usam a LOGO, entao da pra aproveitar na proxima funcao de LOGO!
        
        poster = hasPoster.get(name)
        if not poster:
            try:
                poster = soup.find("figure", {'data-source':'poster'}).find("a", {'class': 'image'})['href']
            except:
                poster = soup.find("figure", {'class':'pi-image'}).find("a", {'class': 'image'})['href']

        return writeImage(name, Parse.getImgFull(poster), 'show', 'posters') 

    @staticmethod
    def getImgFull(img):   
        return img.split('revision')[0]   


    @staticmethod
    def getRiderBodyImage(item):
        return Parse.getImgFull(item.find('a', class_='image').find('img').get('src'))
    
    @staticmethod
    def getRiderName(item):
        return item.find('div', class_='lightbox-caption').find('b').text
    
    @staticmethod
    def getMainUser(item):
        return item.find('div', class_='lightbox-caption').find_all('a')[-1].text

    @staticmethod
    def getSynopsis(name, soup):
            changeSynopsis = {
                'Kamen Rider Decade (TV Show)': ('Plot', 'Production'), 
                'Kamen Rider Amazons (TV Show)': ('Series_Overview', 'Characters'),

                'normal': ('Story', 'Characters'),
                'alt': ('Plot', 'Characters')
            }
            synopsis_list = []

            if changeSynopsis.get(name):
                initName, endName = changeSynopsis.get(name)
            else:
                initName, endName = changeSynopsis.get('normal')
            


            try:
                inicio_sinopse = soup.find("span", {'id':f'{initName}'}).find_parent()
            except:
                initName, endName = changeSynopsis.get('alt')
                inicio_sinopse = soup.find("span", {'id':f'{initName}'}).find_parent().find_next()

                if(len(inicio_sinopse.find_next_siblings()) < 2):
                    inicio_sinopse = soup.find("span", {'id':f'{initName}'}).find_parent()


            fim_sinopse = soup.find("span", {'id': f'{endName}'}).find_parent()


            for paragrafo in inicio_sinopse.find_next_siblings():
                if paragrafo == fim_sinopse:
                    break
                synopsis_list.append(paragrafo.getText())
            return " ".join(synopsis_list)

    @staticmethod
    def getLogo(showName, soup):
        logo = soup.find("img", {'class':'pi-image-thumbnail'})['src']
        return writeImage(showName, logo.split('revision')[0], 'show', 'logos')    
    
    @staticmethod
    def getYearFromAirDate(soup):
        airdate = soup.find("div", {'data-source':'airdate'}).text
        if ("present" in airdate):
            return '2024'
        try: 
            airdate_str =  airdate.split(",")[2].split("-")[0]
        except:
            airdate_str = airdate.split(",")[2].split("-")[0].split("(")[0].split("(")
        
        airdate_str = airdate_str.split("(")[0].split("\n")[0]
        return airdate_str.strip()

