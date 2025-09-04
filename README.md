# Projet C2WK - ETNA 2022-2023

## Membres du Groupe

- **Thomas PERRIAU**
- **Mile RISTOVSKI**

## Description

Projet C2WK est une application complète comprenant une API, une interface web et une application mobile. Le projet est structuré autour des technologies modernes telles que **Node.js**, **Express**, **Angular**, **Flutter**, et **Docker**.

## Architecture

### API

L'API permet la gestion des produits ainsi que des comptes utilisateurs. Elle est développée avec **Node.js** et **Express**, et utilise **Sequelize** pour la gestion de la base de données.

#### Technologies utilisées :

- **Node.js**
- **Express**
- **Sequelize** (ORM pour PostgreSQL, MySQL, etc.)
- **JWT** (JSON Web Token) pour l'authentification

### Front-End

L'application web est développée avec **Angular**, offrant une interface utilisateur réactive et performante.

#### Technologies utilisées :

- **Angular**
- **TypeScript**
- **Bootstrap / TailwindCSS** (si applicable)

### Application Mobile

Une application mobile développée avec **Flutter** permet d'accéder aux fonctionnalités de l'API en mobilité.

#### Technologies utilisées :

- **Flutter**
- **Dart**
- **HTTP package** pour la communication avec l'API

### Docker

Le projet est conteneurisé avec **Docker** afin d'assurer un déploiement facile et une compatibilité maximale sur différents environnements.

#### Commandes utiles :

- Construire et exécuter les conteneurs :
  ```sh
  docker-compose up --build
  ```
- Arrêter les conteneurs :
  ```sh
  docker-compose down
  ```

## Initialisation de la Base de Données

### Exécution des migrations

```sh
npx sequelize-cli db:migrate
```

### Peuplement de la base de données (seeding)

```sh
npx sequelize-cli db:seed:all
```

## Installation et Lancement du Projet

### API

```sh
git clone https://github.com/votre-repo/projet-c2wk.git
cd projet-c2wk/api
npm install
npm start
```

### Front-End

```sh
cd projet-c2wk/front
npm install
ng serve
```

### Mobile (Flutter)

```sh
cd projet-c2wk/mobile
flutter pub get
flutter run
```

## Auteurs

Ce projet a été développé par **Thomas PERRIAU** et **Mile RISTOVSKI** dans le cadre de l'année académique **ETNA 2022-2023**.

---

# C2WK Project - ETNA 2022-2023

## Group Members
- **Thomas PERRIAU**
- **Mile RISTOVSKI**

## Description
The C2WK Project is a comprehensive application including an API, web interface, and mobile application. The project is structured around modern technologies such as **Node.js**, **Express**, **Angular**, **Flutter**, and **Docker**.

## Architecture

### API
The API handles product management as well as user account management. It is developed with **Node.js** and **Express**, and uses **Sequelize** for database management.

#### Technologies used:
- **Node.js**
- **Express**
- **Sequelize** (ORM for PostgreSQL, MySQL, etc.)
- **JWT** (JSON Web Token) for authentication

### Front-End
The web application is developed with **Angular**, offering a responsive and performant user interface.

#### Technologies used:
- **Angular**
- **TypeScript**
- **Bootstrap / TailwindCSS** (if applicable)

### Mobile Application
A mobile application developed with **Flutter** provides access to the API functionalities on mobile devices.

#### Technologies used:
- **Flutter**
- **Dart**
- **HTTP package** for API communication

### Docker
The project is containerized with **Docker** to ensure easy deployment and maximum compatibility across different environments.

#### Useful commands:
- Build and run containers:
  ```sh
  docker-compose up --build
  ```
- Stop containers:
  ```sh
  docker-compose down
  ```

## Database Initialization

### Running migrations
```sh
npx sequelize-cli db:migrate
```

### Database seeding
```sh
npx sequelize-cli db:seed:all
```

## Project Installation and Launch

### API
```sh
git clone https://github.com/your-repo/projet-c2wk.git
cd projet-c2wk/api
npm install
npm start
```

### Front-End
```sh
cd projet-c2wk/front
npm install
ng serve
```

### Mobile (Flutter)
```sh
cd projet-c2wk/mobile
flutter pub get
flutter run
```

## Authors
This project was developed by **Thomas PERRIAU** and **Mile RISTOVSKI** as part of the **ETNA 2022-2023** academic year.

---
