import requests
from bs4 import BeautifulSoup
from parse import Parse

class Show:
    def __init__(self, link: str):
        self.url = link
        self.local_soup = Parse.getSoup(self.url)
        self.name = Parse.getShowName(self.local_soup)
        self.year = Parse.getYearFromAirDate(self.local_soup)
        self.synopsis = Parse.getSynopsis(self.name, self.local_soup)

        self.imgs = {
            'rider_img_xl': Parse.getPoster(self.name, self.local_soup), 
            'rider_img_sm': self.getIconPath(),
            'rider_img_banner': self.getBannerPath(),
            'rider_img_logo':  Parse.getLogo(self.local_soup)
            }
    
    def getIconPath(self):
        return ''
    
    def getBannerPath(self):
        return ''
    


class Rider:
    def __init__(self, link):
        self.url = link
        # self.name = name
        # self.main_user = ''
        # self.forms = forms
        # self.rider_img_sm = ""   #cards
        # self.rider_img_body = "" # full-body img
        self.show_id = 0