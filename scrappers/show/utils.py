import json
import requests
import os



def serializer(obj):
    from models import Show
    if isinstance(obj, Show):
        return {
                
                    "model": "core.shows",
                    "pk": obj.id,
                    "fields": {
                        'name': obj.name,
                        'year': obj.year,
                        'synopsis': obj.synopsis,
                        "show_img_xl": obj.imgs.get("show_img_xl"),
                        "show_img_sm": obj.imgs.get("show_img_sm"),
                        "show_img_banner": obj.imgs.get("show_img_banner"),
                        "show_img_logo": obj.imgs.get("show_img_logo")
                    }
            
            }
    else:
         return {
                    {
                        "model": "core.riders",
                        "pk": obj.id,
                        "fields": obj.__dict___
                }
            }


def to_json(classList, archive):
    with open(f"{archive}.json", "w") as file:
        json.dump(classList, file, indent=4, default=serializer)


def normalizeName(name):
    if name == 'Kamen Rider (TV Show)':
        return 'kamen-rider'
    try:
        new_name = name.split("Rider")[1].split("(")[0]
    except:
        new_name = name.split("(")[0]

    return new_name.lower().strip().replace(' ', '')

def normalizeRiderName(name):
    return name.lower().strip().replace(' ', '_')

def writeImage(name, url, parent_folder, folder,):
    img_data = requests.get(url).content

    if parent_folder == 'show':
        new_name = normalizeName(name)
    else:
        new_name = normalizeRiderName(name)

    relative_path = f'{parent_folder}/{folder}'
    os.makedirs(relative_path, exist_ok=True)

    full_path = f"{relative_path}/{new_name}.png"
    
    with open(full_path, 'wb') as handler:
        handler.write(img_data)
    return full_path
