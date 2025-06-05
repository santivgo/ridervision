import requests
from bs4 import BeautifulSoup
from parse import Parse
from utils import normalizeName
import json



class Show:
    def __init__(self, id: int, link: str):
        self.url = link
        self.id = id
        self.name = Parse.getShowName(Parse.getSoup(self.url))
        self.year = Parse.getYearFromAirDate(Parse.getSoup(self.url))
        self.synopsis = Parse.getSynopsis(self.name, Parse.getSoup(self.url))

        self.imgs = {
            'show_img_xl': Parse.getPoster(self.name, Parse.getSoup(self.url)), 
            'show_img_sm': self.iconPath,
            'show_img_banner': self.bannerPath,
            'show_img_logo':  Parse.getLogo(self.name, Parse.getSoup(self.url))
            }
    
    @property
    def iconPath(self):
        return f'show/icons/{normalizeName(self.name)}-sm.png'
    @property
    def bannerPath(self):
        return f'show/banners/{normalizeName(self.name)}-banner.png'
    


class Rider:
    def __init__(self, id, name, main_user, rider_img_body, show_id):
        self.id = id
        self.name = name
        self.main_user = main_user
        self.rider_img_sm = self.cardPath   #cards
        self.rider_img_body = rider_img_body # full-body img
        self.tv_show = int(show_id)+1
    @property
    def cardPath(self):
        return f'riders/cards/{normalizeName(self.name)}-card.png'
