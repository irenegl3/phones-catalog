# App for a phones' catalogue

## Description
The application allows the user to interact with different phones in a web page. The services the application offers are the following:
- Navigate through the phones displayed in the web page
- Select a specific phone to see more information about it
- Edit the information of the selected phone
- Create a new phone by adding its characteristics and image
- Delete a selected phone

The project is divided in two parts:

**1. Backend**
- Contains the logic of the application and the connection to the PostgreSQL database.
- Formed by the folders controllers, migrations, models, routers, seeders, and the files app.js and index.js

**2. Frontend**
- Contains the front part of the application
- The application consists of a SPA (Single Page App)
- Formed by the folders public and src.
- When deploying the front part (explained later), the **.js** files generated are stored in the build folder, which is used by the backend as the views of the application

## Technologies and versions used
	- Node.js (version 12.15.0)
	- npm (version 6.14.8)
    - Sequelize ORM (version 6.3.5)
    - Sequelize CLI (version 5.5.1)
	- PostgreSQL (version 9.6)
    - React.js
	- Docker (version 19.0.13)
	- Docker-compose (version 1.27.4)


## Backend
### Database
A **PostgreSQL** database has been used to store the phones' information. It is accessed by using a ORM called **Sequelize** https://sequelize.org/v5/. A model for the phone's table has been created, as well as a migration file to keep track of the updates of the table more easily. In addition, a seeder file has been provided to poblate the database when the application is deployed (container up). To connect to the database, the following URL is necessary: 
postgres://DB_USERNAME:DB_PASSWORD@DB_HOST:DB_PORT/POSTGRES_DB

These variables are configurable depending on which name the user wants the database to have. It is recommended to keep the ones already set in the phone-catalogue.env file, so the application connects the database correctly on the container.

Once the database is created, the program runs the migrations and the seeders (automatized in the script.sh when starting the container):

```shell
sequelize db:migrate:all
sequelize db:seeder:all
```

It is possible to access the database inside the container with this commands:
```shell
docker ps #get the name of the db container
docker exec -it "name_db_container" /bin/bash #access to the container shell
psql -U postgres #enters to the psql shell
\c phoneCatalogue #connects to the database
\d #displays the tables
```


### API
In order to the front part to get the information stored in the database, and to thandle the information sent from the web browser, an API has been implemented:

```shell
router.get('/phones', controller.getAllPhones);
router.post('/phones', controller.configureMultiPartFormData, controller.updateOrCreatePhone)
router.delete('/phones/:id', controller.deletePhone);
```
## Frontend
**React.js** has been used for this part. Several components have been implemented (in src/components):
- App
- Catalogue
- FormCreate
- FormUpdate
- Info

To create the react part, the module create-react-app has been used (https://github.com/facebook/create-react-app). It generates the initial project structure. It could be launched with the command 
```shell
npm startReact
```
When the application is ready for production, it is built by using the command:
```shell
npm buildReact
```
It correctly bundles React in production mode and optimizes the build for the best performance.The build is minified and the filenames include the hashes. The index.html automatically uses those files to display the web page.


## Docker Compose
Docker compose has been used to run the application and the database in order to falicitate the deployment. Two services have been created:
- **dbcatalogue:** built over a postgres image, on port 5555 that enables the connection to the internal postgreSQL port 5432
- **phonecatalogue:** built with the code of the application and that depends on the other service

To create the image: 
```shell 
docker-compose build 
```

To start the container:
```shell 
docker-compose up -d 
```
Once it is launched, the application is accesible on the URL : http://localhost:3000

## Instructions to run the application

The option 3 is the recommended one because of its simplicity.

### Option 1: separated apps on local
For this option, you must have a PostgreSQL database created. Set the db variables on the phone-catalogue.env file to be able to connect the app to the database. The migration and seeder will create and poblate the phone table.

1. Download the repository on your local host.
2. Set the option variable in the phone-catalogue.env file to **1**.
3. Set the port in which the server will be listening in the phone-catalogue.env (different from 3000, port predefined for the front part). SERVER_PORT=3001 for example
4. Run ```npm start``` to start the server (inside the project folder). You could verify it on http://localhost:3001, following this example.
5. Now, start the react app. Set the service to be the same url as in previous step (with the SERVER_PORT you defined) in the /src/components/App.js: ```const service = 'http://localhost:3001'; ```.
6. Run: ```npm run startReact``` in other terminal (inside the project folder). It is launched in port 3000 by default.
7. To successfully see the catalogue, browse to url: htttp://localhost:3000, where the react app is up.

### Option 2: joint app on local, using react build
For this option, you must have a PostgreSQL database created. Set the db variables on the phone-catalogue.env file to be able to connect the app to the database. The migration and seeder will create and poblate the phone table.

1. Download the repository on your local host.
2. Set the option variable in the phone-catalogue.env file to **not 1**: 2, 3, 4 ...
3. Set the port in which the server will be listening in the phone-catalogue.env. Now it could be whatever you want. SERVER_PORT=3004 for example.
4. Set the service to be the same url as in previous step (with the SERVER_PORT you defined) in the /src/components/App.js: ```const service = 'http://localhost:3004'; ``` for example.
5. Run the command: ```npm run buildReact```. This will create the build folder with the js required.
6. Run: ```npm start```to launch the application.
7. To successfully see the catalogue, browse to url: htttp://localhost:**3004**, where the react app is up. (Now it is the same port as the SERVER_PORT)

### Option 3: using a docker image 
For this option, you just need to have docker-compose installed.
1. Create a folder for the application and move to it:
```
	mkdir app
	cd app
```
1. Create a docker-compose.yml just like the file of this repo inside the app folder:
```shell 
version: '3'

services: 
   
  app:
    container_name: phonecatalogue_app
    restart: always
    ports: 
      - "3002:3002" #host_port:container_port
    image: irenegl3/phonecatalogue:latest
    depends_on:
      - db
    env_file:
      - phone-catalogue.env

  db:
    container_name: phonecatalogue_db
    image: postgres:latest
    restart: always
    volumes:
      - ./init.sql:/init.sql
    env_file:
      - phone-catalogue-db.env
```
2. Create the phone-cataloge.env file just like the file of this repo inside the app folder:
```shell
POSTGRES_DB=phonesCatalogue
DB_USERNAME=postgres
DB_PASSWORD=1234
DB_HOST=db
DB_PORT=5432
SERVER_PORT=3002
OPTION=2
```
3. Create the phone-cataloge-db.env file just like the file of this repo inside the app folder:
```shell
POSTGRES_DB=phonesCatalogue
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1234
```
4. Create the init.sql file just like the file of this repo inside the app folder:
```
CREATE DATABASE IF NOT EXISTS phonesCatalogue;
```
5. Now, the files required for creating the containers are ready. Run the command inside the app folder :```docker-compose up  -d``` to create the container using the image.

6. Once it is up and running, go to the url http://localhost:3002. If you want to change the port, you must change the host_port on the docker-compose.yml file.
