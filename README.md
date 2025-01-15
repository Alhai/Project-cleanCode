# Project-Blog-cleanCode

## Configuration

### Prérequis

- Node.js installé sur votre machine (version LTS recommandée)
- MongoDB installé et en cours d'exécution, ou un URI MongoDB valide pour une base de données hébergée

### Étapes d'installation

1. **Cloner le dépôt :**

   ```bash
   git clone git@github.com:Alhai/Project-cleanCode.git
   cd project-cleanCode

   ```

2. **Installer les dépendances :**

   ```bash
    npm install

   ```

3. **Configurer les variables d'environnement :**

   Copiez le fichier .env.example en .env :

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
