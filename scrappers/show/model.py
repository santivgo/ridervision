class Show:
    def __init__(self, id, name, year, synopsis, poster, path_btn, path_banner):
        self.id = id
        self.name = name
        self.year = year
        self.synopsis = synopsis
        self.imgs = {
            'rider_img_xl': poster, 
            'rider_img_sm': path_btn,
            'rider_img_banner': path_banner}
