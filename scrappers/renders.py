import requests
import os
import time
import random
from bs4 import BeautifulSoup
from urllib.parse import urlparse

def gerar_links(link_base, total_paginas):
    return [f"{link_base}?page={i}" if i > 1 else link_base for i in range(1, total_paginas + 1)]

def montar_nome_pasta(link):
    caminho = urlparse(link).path
    return caminho.rstrip('/').split('/')[-1]

def extrair_nomes_pastas(alt):
    if not alt:
        return "Outros", "Outros"

    palavras = alt.replace('\n', ' ').split()

    try:
        idx = palavras.index("Kamen")
        if palavras[idx + 1] == "Rider":
            nome1 = palavras[idx + 2] if len(palavras) > idx + 2 else "Outros"
            nome2 = palavras[idx + 3] if len(palavras) > idx + 3 else "Outros"
            return nome1, nome2
    except (ValueError, IndexError):
        pass

    return "Outros", "Outros"

def baixar_imagens(link_base, total_paginas, pasta_base='data/imgs'):
    links = gerar_links(link_base, total_paginas)
    nome_galeria = montar_nome_pasta(link_base)
    pasta_destino = os.path.join(pasta_base, nome_galeria)
    os.makedirs(pasta_destino, exist_ok=True)

    imagens_baixadas = set()

    for link in links:
        print(f"Agora em {link}")
        time.sleep(random.uniform(2, 5))
        response = requests.get(link)
        soup = BeautifulSoup(response.content, "html.parser")

        links_imagens = [a.get("href") for a in soup.find_all("a") if a.get("href") and "/art/" in a.get("href")]

        for link in links_imagens:
            try:
                time.sleep(random.uniform(1.5, 3.5))
                response_img_page = requests.get(link)
                soup_img = BeautifulSoup(response_img_page.content, "html.parser")

                for container in soup_img.find_all("div", class_="_2Rewc"):
                    img = container.find('img')
                    if img:
                        src = img.get('src')
                        alt = img.get('alt')

                        if not src or src in imagens_baixadas:
                            continue

                        imagens_baixadas.add(src)

                        nome1, nome2 = extrair_nomes_pastas(alt)

                        pasta_final = os.path.join(pasta_destino, nome1, nome2)
                        os.makedirs(pasta_final, exist_ok=True)

                        nome_arquivo = alt.replace('/', '_').replace('\\', '_') + ".png"
                        caminho_arquivo = os.path.join(pasta_final, nome_arquivo)

                        time.sleep(random.uniform(1.0, 2.5)) 
                        img_data = requests.get(src).content
                        with open(caminho_arquivo, 'wb') as handler:
                            handler.write(img_data)

            except Exception as e:
                print(f"Erro ao processar {link}: {e}")


link = "https://www.deviantart.com/neorider217/gallery/90466529/gaim-renders"
paginas = 1
baixar_imagens(link, paginas)
