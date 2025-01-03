## Prérequis

- Node.js (version 14 ou supérieure)
- MySQL

## Installation

1. Clonez le dépôt :

   ```sh
   git clone <url>
   cd restaurant-api
   ```

2. Installez les dépendances :

   ```sh
   npm install
   ```

3. Configurez les variables d'environnement :

   Copiez le fichier `.env.dist` en `.env` et remplissez les valeurs nécessaires :

   ```sh
   cp .env.dist .env
   ```

   Exemple de contenu du fichier `.env` :

   ```env
   APP_PORT=8081
   JWT_SECRET=your_jwt_secret
   JWT_ACCESS_TOKEN_EXPIRATION=2d
   MYSQL_URL=mysql://root:root@localhost:3306/restaurant_api
   ```

4. Démarrez le serveur :

   ```sh
   nodemon
   ```

   L'API sera accessible à l'adresse `http://localhost:8081`.

## Utilisation

### Endpoints

- **Authentification**
  - `POST /api/login` : Connexion d'un utilisateur
  - `POST /api/register` : Inscription d'un utilisateur

- **Utilisateurs**
  - `GET /api/users` : Récupérer tous les utilisateurs (ADMIN uniquement)
  - `GET /api/users/@me` : Récupérer les informations de l'utilisateur connecté
  - `GET /api/users/:user_id` : Récupérer les informations d'un utilisateur spécifique

- **Restaurants**
  - `POST /api/restaurants/new` : Créer un nouveau restaurant (ADMIN uniquement)
  - `GET /api/restaurants` : Récupérer tous les restaurants
  - `GET /api/restaurants/:restaurant_id` : Récupérer un restaurant spécifique
  - `DELETE /api/restaurants/:restaurant_id` : Supprimer un restaurant (ADMIN uniquement)

- **Plats**
  - `POST /api/dish/new` : Créer un nouveau plat (RESTAURANT ou ADMIN uniquement)
  - `GET /api/dishes` : Récupérer tous les plats
  - `GET /api/dish/:id` : Récupérer un plat spécifique
  - `GET /api/restaurant/:id/dishes` : Récupérer tous les plats d'un restaurant spécifique

- **Commandes**
  - `POST /api/orders/new` : Créer une nouvelle commande (RESTAURANT ou ADMIN uniquement)
  - `GET /api/orders` : Récupérer toutes les commandes (RESTAURANT ou ADMIN uniquement)
  - `GET /api/orders/restaurant/:restaurantId` : Récupérer toutes les commandes d'un restaurant spécifique
  - `DELETE /api/orders/:id` : Supprimer une commande (RESTAURANT ou ADMIN uniquement)

## Structure du projet

- `src/controllers` : Contient les contrôleurs pour les différentes routes de l'API
- `src/middlewares` : Contient les middlewares pour la gestion des autorisations et des accès
- `src/models` : Contient les modèles Sequelize pour les différentes entités (User, Restaurant, Dish, Order)
- `src/services` : Contient les services pour l'authentification
- `src/utils` : Contient les utilitaires (hash, sequelize)
- `src/voters` : Contient les voters pour la gestion des permissions