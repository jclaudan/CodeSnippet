# 📌 Code Snippet

![Stars](https://img.shields.io/github/stars/Spectrenard/CodeSnippet?style=flat-square&logo=github&color=blue)
![Forks](https://img.shields.io/github/forks/Spectrenard/CodeSnippet?style=flat-square&logo=github&color=green)
![Issues](https://img.shields.io/github/issues/Spectrenard/CodeSnippet?style=flat-square&logo=github&color=red)
![Last Commit](https://img.shields.io/github/last-commit/Spectrenard/CodeSnippet?style=flat-square&logo=github&color=orange)
![License](https://img.shields.io/github/license/Spectrenard/CodeSnippet?style=flat-square&logo=github&color=purple)

Un gestionnaire d'extraits de code moderne et intuitif pour organiser, rechercher et partager vos snippets de code efficacement.

<img width="1680" alt="Capture d’écran 2025-01-30 à 15 19 14" src="https://github.com/user-attachments/assets/ff3de49e-5485-4f4a-b059-edaec6aa7e99" />

## ⚙️ Stack Technique

- **Frontend** : Next.js, Tailwind CSS
- **Backend** : Node.js, Express, Prisma, PostgreSQL
- **Authentification** : JWT (JSON Web Tokens)

## 🚀 Fonctionnalités

- 🔍 **Recherche avancée** : Trouvez instantanément un snippet grâce à la recherche par mots-clés et catégories.
- 📂 **Organisation structurée** : Classez vos snippets par catégories pour un accès rapide.
- ✏️ **CRUD complet** : Ajoutez, modifiez et supprimez vos snippets facilement.
- 👤 **Authentification sécurisée** : JWT pour sécuriser les utilisateurs.
- 🌐 **API REST** : Backend robuste basé sur Node.js, Express et Prisma.
- 🎨 **Interface moderne** : Frontend en Next avec une expérience utilisateur fluide.

## 📦 Installation

### 1️⃣ Cloner le projet
```sh
git clone [https://github.com/tonpseudo/snippet-manager.git](https://github.com/Spectrenard/CodeSnippet.git)
cd CodeSnippet
```

### 2️⃣ Configurer les variables d'environnement
Créez un fichier `.env` à la racine du backend avec :
```env
JWT_SECRET="votre_secret"
DATABASE_URL="votre_url_postgresql"
```

### 3️⃣ Installer les dépendances
#### Backend :
```sh
cd backend
npm install
```
#### Frontend :
```sh
cd frontend
npm install
```

### 4️⃣ Lancer l'application
#### Démarrer le backend :
```sh
cd backend
npm start
```
#### Démarrer le frontend :
```sh
cd frontend
npm run dev
```

## 📖 API Endpoints
| Méthode | Endpoint | Description |
|---------|---------|-------------|
| `GET` | `/snippets` | Récupère tous les snippets de l'utilisateur |
| `POST` | `/snippets` | Ajoute un nouveau snippet |
| `PUT` | `/snippets/:id` | Modifie un snippet existant |
| `DELETE` | `/snippets/:id` | Supprime un snippet |

## 🤝 Contribuer
1. **Fork** le projet 🍴
2. **Crée une branche** (`git checkout -b feature-ma-feature`)
3. **Commit** (`git commit -m 'Ajout de ma feature'`)
4. **Push** (`git push origin feature-ma-feature`)
5. **Ouvre une Pull Request** ✨

## 📜 Licence
Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus d'informations.

## ⭐ Remerciements
Si ce projet vous aide, n'hésitez pas à laisser une étoile ⭐ sur GitHub !

---

🚀 Développé avec ❤️ par [Spectrenard](https://github.com/Spectrenard).

