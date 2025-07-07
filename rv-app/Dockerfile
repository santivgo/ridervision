FROM node:22
WORKDIR /app
COPY ./package*.json ./
RUN npm install @angular/cli -g
RUN npm install

COPY . .
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]