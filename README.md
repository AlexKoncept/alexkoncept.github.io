# Alex Koncept — Universe (Interactive Web OS & Portfolio)

[![Live Demo](https://img.shields.io/badge/Demo-alexkoncept.github.io-00f0ff?style=for-the-badge&logo=googlechrome&logoColor=white)](https://alexkoncept.github.io/)
[![Three.js](https://img.shields.io/badge/Three.js-r128%20CSS3D-black?style=for-the-badge&logo=threedotjs)](https://threejs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa)](https://alexkoncept.github.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> **Hub créatif, laboratoire technologique et système d'exploitation web interactif.**  
> Exploration et prototypage aux frontières de l'**Intelligence Artificielle**, du **Creative Coding**, de la **3D temps réel** et de l'**Horlogerie physique**.

---

## 📌 Présentation

**Alex Koncept — Universe** n'est pas une simple landing page, mais une interface immersive conçue comme un mini-système d'exploitation web. Elle centralise et met en valeur l'ensemble des créations de l'écosystème AK (prototypes IA souverains, applications PWA, créations 3D/Web art, horlogerie de précision et travaux sonores).

---

## 🚀 Fonctionnalités Clés & Expérience Utilisateur

### 🌐 1. Dashboard 3D "Holo-Deck" (Three.js CSS3D)
- **Visualisation spatiale :** Projection de l'ensemble des projets dans un espace 3D temps réel grâce à `Three.js` et `CSS3DRenderer`.
- **4 topologies dynamiques interpolées par Tween.js :**
  - 🌐 **Sphère :** Distribution selon une sphère de Fibonacci.
  - 🧬 **Hélice :** Disposition hélicoïdale inspirée de l'ADN.
  - 📐 **Grille :** Matrice cubique tridimensionnelle.
  - 🔄 **Anneau :** Anneau orbital orbital navigable.
- **Contrôles complets :** Manipulation orbitale via `TrackballControls` avec support tactile dédié mobile (`touchstart`, `touchend`).

### 📊 2. Dashboard 2D Bento OS
- Vue alternative transformant le site en une interface de productivité moderne type **Bento Grid OS** (menu persistant, volet latéral biographique et grille dense de projets scrollable indépendamment).

### 🎨 3. Moteurs d'ambiances & Univers visuels (Canvas 2D)
5 thèmes complets basculant dynamiquement les variables graphiques et lançant des animations Canvas temps réel optimisées :
- ⚡ **Cyber Cyan (Défaut)** : Interface dark futuriste et curseur custom réactif.
- 🟢 **Matrix Reloaded** : Pluie de code numérique générative (Katakanas + caractères latins).
- 🌌 **Deep Space** : Champ d'étoiles avec gestion de profondeur et scintillement alpha.
- 🌴 **Vice City** : Synthwave wireframe perspective grid avec ciel dégradé rétro.
- ☢️ **Fallout** : Effet de phosphore vert/ambre et bruit CRT généré via `Uint32Array` haute performance.

### 🤖 4. AlexBot — Assistant IA Conversationnel
- Intégration modulaire moderne via **Import Map ES Modules** de **React 19** et de l'API **`@google/genai`**.
- Bulle conversationnelle interactive guidant le visiteur dans les coulisses de chaque Koncept.

### 🔍 5. Moteur de Recherche & Filtres instantanés
- Filtrage temps réel combinant recherche textuelle (titres, descriptions, tags) et onglets catégoriels (`IA & Agents`, `Web & PWA`, `3D & Horlogerie`, `Labs & Dystopie`).
- Gestion d'état à zéro latence avec affichage dynamique si aucun résultat n'est trouvé.

### 🎵 6. HSK Player & Passerelles Médias
- **Lecteur Audio Intégré :** Lecteur flottant persistant diffusant les compositions du projet musical IA *Hybrid Sound Koncept*.
- **Widget flottant OrbaOS :** Carte rétractable avec carrousel d'aperçus, synchronisée avec l'état mobile et le chatbot (*docking intelligent au scroll*).
- **Visionneuse modale accessible :** Modales intégrées avec piège de focus et raccourci `Échap` pour consulter le rapport d'analyse PDF ou lancer *AKNR Live*.
- **Système bilingue natif (FR / EN) :** Switch instantané sans rechargement de page persistant en `localStorage`.

---

## 🛠️ Optimisations Techniques & Architecture

Ce projet intègre plusieurs optimisations de performance front-end (*Performance & Core Web Vitals*) :

* **Lazy-Loading dynamique des scripts 3D :** `Three.min.js`, `CSS3DRenderer.js`, `TrackballControls.js` et `tween.umd.js` ne sont **pas** chargés au démarrage. Ils sont injectés à la volée via une fonction asynchrone `loadScript()` uniquement lorsque l'utilisateur sollicite le Dashboard 3D.
* **Boucle de scroll unifiée :** Une seule boucle passive cadencée par `window.requestAnimationFrame` pilote l'escamotage du header, l'apparition du bouton Back-to-Top, l'amarrage mobile du widget OrbaOS et la position des infobulles, évitant ainsi le *scroll jank*.
* **Gestion mémoire Canvas :** L'animation CRT (thème Fallout) alloue un unique tampon `createImageData` et manipule les pixels directement en 32 bits (`Uint32Array`), éliminant les fuites mémoire et le garbage collection intempestif.
* **Zéro Layout Shift au tri :** Réorganisation algorithmique des éléments du DOM par `appendChild` direct sans réécriture brutale de `innerHTML`.
* **SEO & Sémantique :** Données structurées enrichies `Schema.org` (`WebSite` et génération dynamique de l'`ItemList` pour les moteurs de recherche), balisage Open Graph / Twitter Cards et conformité PWA (`manifest.json` et `apple-touch-icon`).

---

## 💻 Stack Technologique

- **Cœur UI :** HTML5 sémantique, CSS3 (Custom Properties, Flexbox, CSS Grid, Glassmorphism).
- **Logique Client :** JavaScript moderne (ES6+), Vanilla Web APIs (Canvas 2D, Web Audio, IntersectionObserver, MutationObserver).
- **Moteur 3D :** Three.js (r128), CSS3DRenderer, TrackballControls, Tween.js.
- **Composants IA :** React 19, `@google/genai` (via Import Map & ESM).
- **Hébergement & CDN :** GitHub Pages, ESM.sh, Netlify.

---

👤 Auteur
Alex Koncept
Créateur indépendant — Informatique, IA, Design, Horlogerie & DIY.
🌐 Portfolio : alexkoncept.github.io
🐙 GitHub : @AlexKoncept
✉️ Contact : contact@alexkoncept.com

« Vivre. Apprendre. Créer. »
