FROM node:12.16.2

WORKDIR /phoneCatalogueApp

COPY package*.json ./

RUN npm install

COPY . .

CMD ./script.sh