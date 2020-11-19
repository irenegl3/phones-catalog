FROM node:12.16.2

WORKDIR /phoneCatalogueApp

COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 5432:5432

CMD ./script.sh