import requests
import os
from bs4 import BeautifulSoup

urls = ["https://www.deviantart.com/neorider217/gallery/94633124/gavv-renders","https://www.deviantart.com/neorider217/gallery/94633124/gavv-renders?page=2", "https://www.deviantart.com/neorider217/gallery/94633124/gavv-renders?page=3"]

for url in urls: 
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    temp = ''
    serie = ''
    pasta = 'imgs'

    for link in soup.find_all("a"):
        href = link.get("href")
        texto = link.text.strip()
        if "/art/" in href:
            
            response = requests.get(href)
            soup2 = BeautifulSoup(response.content, "html.parser")
            
            for pai_img in soup2.find_all("div", class_="_2Rewc"):
                img = pai_img.find('img')
                if img.get('src') != temp:
                    temp = img.get('src')

                    img_data = requests.get(img.get('src')).content 
                    serie = ''.join(img.get('alt').split()[2])

                    save_path = os.path.join(pasta, serie)
                    os.makedirs(save_path, exist_ok=True)
                    file_path = os.path.join(save_path, img.get('alt') + ".png")

                    with open(file_path, 'wb') as handler: 

                        handler.write(img_data)