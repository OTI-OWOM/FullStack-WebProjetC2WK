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

