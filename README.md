# Product Management Application (Angular + Express + MySQL)

Application complète de gestion de produits avec un backend RESTful API Node.js/Express/MySQL et un frontend moderne en Angular 22 standalone avec design glassmorphism.

---

## 🏗️ Structure du Projet

```text
angular-atelier4/
├── front/        # Application Frontend Angular 22 (Standalone, Signals, Glassmorphism)
└── mon-api/      # Backend REST API (Node.js, Express, MySQL2, Joi)
```

---

## 🚀 Prérequis

- Node.js (v18+)
- MySQL (127.0.0.1:3306)

---

## 🗄️ Base de données MySQL

Créer la base `my-api` et exécuter le schéma suivant :

```sql
CREATE DATABASE IF NOT EXISTS `my-api`;
USE `my-api`;

CREATE TABLE IF NOT EXISTS categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id INT UNSIGNED,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  stock INT UNSIGNED NOT NULL DEFAULT 0,
  sku VARCHAR(50) UNIQUE,
  image_url VARCHAR(255),
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_product_category
    FOREIGN KEY (category_id) REFERENCES categories(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;
```

---

## ⚙️ Configuration & Lancement

### 1. Backend (`mon-api`)

```bash
cd mon-api
# Copier le fichier d'environnement et ajuster si nécessaire
cp .env.example .env

# Installer les dépendances
npm install

# Démarrer le serveur API (http://localhost:3000)
npm run dev
```

### 2. Frontend (`front`)

```bash
cd front

# Installer les dépendances
npm install

# Démarrer l'application Angular (http://localhost:4200)
npm start
```
