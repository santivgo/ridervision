<p align="center" width="100%">
    <img width="33%" src="https://raw.githubusercontent.com/santivgo/ridervision/refs/heads/main/pre-projeto/assets/ridervision-logo-colored.png"> 
</p>

### 🎨 Front-end (Angular)
### :computer: Back-end (Django)
##### by [@santivgo](github.com/santivgo) && [@AlyssonHenri](github.com/AlyssonHenri)
---
## :pencil: Pré-projeto 
## Paleta:
    - #F2F2F2 White Smoke
    - #D9042B Fire Engine Red
    - #A61731 Madder
    - #610F1E Chocolate Cosmos
    - #1E1E1E Eerie Black

![palette](https://raw.githubusercontent.com/santivgo/ridervision/refs/heads/main/pre-projeto/palette.png)

## Fontes:
  -  **h1**: Special Gothic Expanded One, Montserrat
  -  **h2 específicos**: Syncopate, Nunito Sans
  -  **Parágrafos**: Inter Light 
## Ideias
- [ ] **Definições:**
    - [x] ~~*Vai ter os henshin sounds na página?*~~
    - [x] *O modelo pode comportar outras séries futuramente?*
    - [x] *Selecionar as características relevantes para a API*
    - [x] ~~*Considerar riders com mais de uma identidade (Ixa, Birth)*~~
- [ ] **Object-relational mapping** (Modelo Lógico, Modelo Entidade-Relacionamento)
- [ ] **Web-Scraping dos Dados** ([RiderWiki](https://kamenrider.fandom.com/pt/wiki/Wiki_Kamen_Rider), [RiderApi](https://riderapi.netlify.app/))
---

### :airplane: Futuro
- [ ] Conteinerizar a aplicação para rodar somente um container, com **adminer, nginx, ridervision-api, ridervision-app**  
### :question: Frameworks
- [Fundamental NGX](https://sap.github.io/fundamental-ngx/#/core/home): Uma alternativa para o Angular Material
- [Angular powered Bootstrap](https://ng-bootstrap.github.io/): Usada para o collapse

---


### Comando para ativar manualmente task de rider do dia

```
comandos que eu usei no startup

-poetry install

-source $(poetry env info --path)/bin/activate

-celery -A rv worker -l info

-python3 manage.py migrate

-python3 manage.py createsuperuser

-python3 manage.py loaddata fixtures/*


``` 
