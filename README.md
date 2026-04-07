
---

# 📘 Central App Frontend

Frontend pour **Central App**, permettant aux utilisateurs d’accéder aux différents services : recitation, gestion de mots de passe, galerie d’images, analyse CSV et gestion des amis.

---

## 🛠️ Technologies

* **React.js** (ou Next.js si SSR)
* **TypeScript**
* **TailwindCSS** pour le style
* **Axios / Fetch API** pour communiquer avec le backend
* **Vite / Next.js** pour le bundling et le dev server

---

## 🚀 Fonctionnalités

* Interface intuitive pour chaque service du backend
* Gestion des playlists de récitation
* Gestion sécurisée des mots de passe
* Galerie d’images avec upload et visualisation
* Import et analyse de fichiers CSV
* Gestion de réseau social (amis, partage de contenu)

---

## ⚙️ Installation

1. Cloner le projet :

```bash
git clone <URL_DU_FRONTEND>
cd central-app-frontend
```

2. Installer les dépendances :

```bash
npm install
```

3. Configurer l’URL du backend dans `.env` :

```env
VITE_API_URL="http://localhost:3000"
```

> Remplacez `localhost:3000` par l’URL de votre backend si nécessaire.

---

## 🚀 Lancer le serveur de développement

```bash
npm run dev
```

* Serveur par défaut : `http://localhost:5173` (Vite)
* Hot reload actif pour développement rapide

---

## 🗂️ Structure du projet

```bash
central-app-frontend/
│
├─ src/
│   ├─ components/          # Composants réutilisables
│   ├─ pages/               # Pages ou routes
│   ├─ services/            # Appels API vers le backend
│   ├─ styles/              # Fichiers CSS/Tailwind
│   └─ main.tsx             # Entrée de l’application
│
├─ public/                  # Assets statiques
├─ package.json
└─ tsconfig.json
```

---

## 🔧 Bonnes pratiques

* Utiliser **Axios ou Fetch** pour communiquer avec le backend
* Stocker l’URL du backend dans une variable d’environnement
* Organiser les composants par feature/service
* Ajouter des types TypeScript pour toutes les données reçues du backend
* Vérifier la connectivité au backend avant de lancer les services

---

## 📖 Liens utiles

* [React Documentation](https://reactjs.org/docs/getting-started.html)
* [Vite Documentation](https://vitejs.dev/)
* [TailwindCSS Documentation](https://tailwindcss.com/docs)
* [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---


Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
