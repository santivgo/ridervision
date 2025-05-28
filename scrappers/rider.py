from show.model import kamenRiderSeries

class RiderImg:
    def __init__(self):
        self.rider_img_sm = ""   #icones
        self.rider_img_xl = "" # poster
        self.rider_img_bg = "" # bg-rider
        self.rider_img_bd = "" # full-body img

class Rider:
    def __init__(self, id:int, name:str, forms:list[str], imgs: RiderImg, show: kamenRiderSeries):
        self.id = id
        self.name = name
        self.forms = forms
        self.imgs = imgs
        self.show = show

        