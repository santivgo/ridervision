import requests
from bs4 import BeautifulSoup
from parse import Parse
from utils import normalizeName
import json



class Show:
    def __init__(self, link: str):
        self.url = link
        self.name = Parse.getShowName(Parse.getSoup(self.url))
        self.year = Parse.getYearFromAirDate(Parse.getSoup(self.url))
        self.synopsis = Parse.getSynopsis(self.name, Parse.getSoup(self.url))

        self.imgs = {
            'rider_img_xl': Parse.getPoster(self.name, Parse.getSoup(self.url)), 
            'rider_img_sm': self.iconPath,
            'rider_img_banner': self.bannerPath,
            'rider_img_logo':  Parse.getLogo(self.name, Parse.getSoup(self.url))
            }
    
    @property
    def iconPath(self):
        return f'media/show/icons/{normalizeName(self.name)}-sm.png'
    @property
    def bannerPath(self):
        return f'media/show/banners/{normalizeName(self.name)}-banner.png'
    


class Rider:
    def __init__(self, name, main_user, rider_img_body, show_id):
        self.name = name
        self.main_user = main_user
        self.rider_img_sm = self.cardPath   #cards
        self.rider_img_body = rider_img_body # full-body img
        self.show_id = show_id
    @property
    def cardPath(self):
        return f'media/riders/cards/{normalizeName(self.name)}-card.png'
