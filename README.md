# Project-Blog-cleanCode

## Groupe Aly & Sibo

## Configuration

### Prérequis

- Node.js installé sur votre machine (version LTS recommandée)
- MongoDB installé et en cours d'exécution, ou un URI MongoDB valide pour une base de données hébergée

### Étapes d'installation

1. **Cloner le dépôt :**

   ```bash
   git clone git@github.com:Alhai/blog-clean-code.git
   cd project-cleanCode

   ```

2. **Installer les dépendances :**

   ```bash
    npm install
   ```

3. **Configurer les variables d'environnement :**

   ```bash
   Copiez le fichier .env.example en .env :
   ```

4. **Compiler le projet :**

   ```bash
    npm run build
   ```

5. **Démarrer le serveur :**
   ```bash
    npm run start
   ```

### Structure du projet

- **`src/`** : Contient le code source du projet, organisé comme suit :

  - **`models/`** : Les modèles de données (exemple : `Article`).
  - **`routes/`** : Les routes de l'application (exemple : gestion des articles).
  - **`controllers/`** : La logique métier (à ajouter selon les besoins).
  - **`services/`** : Services pour les opérations spécifiques ou logiques complexes.
  - **`utils/`** : Fonctions utilitaires réutilisables.

- **`dist/`** : Dossier généré contenant le code compilé par TypeScript.

### Documentation API (Swagger)
- **La documentation de l'API est disponible via Swagger UI à l'adresse** : http://localhost:3000/api-docs
- **Points d'entrée principaux**  :

- **GET /articles**  : Récupérer tous les articles
- **POST /articles**  : Créer un nouvel article
- **PUT /articles/:id/comments**  : Ajouter un commentaire
- **PUT /articles/:id/like**  : Liker un article
- **GET /articles/search**  : Rechercher des articles

- **Exemple d'utilisation avec Swagger** :

Accédez à http://localhost:3000/api-docs
Explorez les différents endpoints disponibles
Testez les requêtes directement depuis l'interface Swagger

### Tests Unitaires
Le projet utilise Jest comme framework de test.

Exécuter les tests

# Exécuter tous les tests
 ```bash
    npm test
   ```

# Exécuter les tests avec couverture
 ```bash
npm run test:coverage
   ```

# Exécuter les tests en mode watch
 ```bash
npm run test:watch
   ```

-**Structure des tests**

src/
  tests/
    unit/
      controllers/
        articleController.test.ts
      services/
        articleService.test.ts
      models/
        articleModel.test.ts

-**Scripts de test disponibles** :

 ```bash
test : Exécute tous les tests
test:coverage : Exécute les tests et génère un rapport de couverture
test:watch : Exécute les tests en mode watch
test:clear : Nettoie le cache de Jest
test:ci : Exécute les tests en mode CI
   ```

### Structure du projet

- **src/** : Contient le code source du projet, organisé comme suit :
- **models/**  : Les modèles de données (exemple : Article)
- **routes/** : Les routes de l'application
- **controllers/** : La logique métier
- **services/** : Services pour les opérations spécifiques
- **utils/** : Fonctions utilitaires réutilisables
- **tests/** : Tests unitaires et d'intégration
- **dist/** : Dossier généré contenant le code compilé