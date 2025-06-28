import os
from PIL import Image

# colocar na pasta que tem as imagens de recorte, movi pra cá só pra deixar mais organizado

def recortar_e_salvar_imagens(pasta):
    for nome_arquivo in os.listdir(pasta):
        if not nome_arquivo.lower().endswith(('.png')):
            continue

        caminho_arquivo = os.path.join(pasta, nome_arquivo)
        imagem = Image.open(caminho_arquivo)
        largura, altura = imagem.size
        
        box = (0, 0, largura // 2, altura)
        lado_esquerdo = imagem.crop(box)

        nome_base, extensao = os.path.splitext(nome_arquivo)
        partes = nome_base.split('-')
        if len(partes) > 2:
            novo_nome = '-'.join(partes[1:-1]) + extensao
        else:
            novo_nome = '-'.join(partes[1:]) + extensao

        caminho_novo = os.path.join(pasta, novo_nome)
        lado_esquerdo.save(caminho_novo)
        print(f"Salvo: {caminho_novo}")

        os.remove(caminho_arquivo)
        print(f"Deletado: {caminho_arquivo}")

if __name__ == "__main__":
    pasta = os.path.dirname(os.path.abspath(__file__))
    recortar_e_salvar_imagens(pasta)