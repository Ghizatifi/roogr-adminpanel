# Rapport d'audit — Roogr Admin Panel

**Date :** Février 2026  
**Périmètre :** Application React (Vite, TypeScript, Tailwind, Redux, i18n)

---

## 1. Résumé exécutif

L’application est un tableau de bord d’administration fonctionnel avec authentification, permissions, multilingue (AR/EN) et thème clair/sombre. L’audit identifie des **bugs critiques** (sécurité des routes), des **problèmes de performance** (chargement initial, pas de lazy loading), des **incohérences design/UX** (loaders, états d’erreur, chemins d’images) et des **améliorations recommandées** (env, accessibilité, qualité de code).

---

## 2. Bugs critiques à corriger en priorité

### 2.1 Protection des routes (sécurité)

**Fichier :** `src/components/guards/ProtectedRoute.tsx`

- **Problème :** `if (hasPermission=1)` utilise l’**assignation** au lieu de la **comparaison**.
- **Conséquence :** `hasPermission` est toujours écrasé par `1`, donc la condition est toujours vraie : **tous les utilisateurs voient toutes les pages**, indépendamment des permissions.
- **Correction :** Remplacer par `if (hasPermission === 1)` ou `if (hasPermission === '1')` (les permissions sont des caractères `'0'`/`'1'` depuis `localStorage`).

```tsx
// Avant (bug)
if (hasPermission=1) {

// Après
if (hasPermission === 1 || hasPermission === '1') {
```

- **Recommandation :** Typer correctement `hasPermission` (string ou number) et utiliser une comparaison stricte partout.

---

### 2.2 Permissions lues au chargement du module

**Fichier :** `src/App.tsx`

- **Problème :** `const storedPermissions = store.getState().permissions.permissions` est exécuté **au chargement du module**, une seule fois.
- **Conséquence :** Après login, les permissions sont dans le store et le `localStorage`, mais le **router a déjà été créé** avec l’ancien état (souvent la chaîne par défaut `'0000...'`). Les routes protégées utilisent donc des permissions potentiellement obsolètes jusqu’à un rechargement complet.
- **Correction :** Ne pas créer le router avec des permissions figées. Options :
  - Construire les routes à l’intérieur d’un composant qui lit `useSelector(checkPermissions)` et rendre `<RouterProvider router={router} />` seulement quand les permissions sont à jour (après login), ou
  - Utiliser un composant par route qui lit les permissions dans le store (ou via un hook) et fait la redirection vers `/unauthorized` si besoin, au lieu de se baser sur une variable module-level.

---

### 2.3 Images 404 / 500 introuvables

**Fichiers :**  
`src/pages/errorElement/ErrorElement.tsx`  
`src/pages/notfound/Notfound.tsx`

- **Problème :** Chemins relatants du type `./../../../500Internal.png` et `./../../../404error.png`. En build Vite, les chemins relatants depuis `src/` ne pointent pas vers `public/`.
- **Conséquence :** En production, les images d’erreur ne s’affichent pas (404).
- **Correction :** Utiliser des chemins publics absolus, par exemple :
  - `src="/404error.png"` et `src="/500Internal.png"` (fichiers dans `public/`),
  - ou importer les assets depuis `src` si vous les déplacez et que Vite les hash.

Vérifier que `public/404error.png` et `public/500Internal.png` existent (ou les ajouter / renommer selon le nom réel).

---

## 3. Performance et chargement des pages

### 3.1 Pas de lazy loading des routes

**Fichier :** `src/App.tsx`

- **Problème :** Plus de 50 composants de pages importés en **static** en haut du fichier. Tout le code de toutes les pages est chargé au premier chargement de l’app.
- **Conséquence :** Bundle JS initial très lourd, premier affichage lent, surtout sur mobile ou connexions lentes.
- **Correction :** Utiliser `React.lazy` et `Suspense` pour les routes :

```tsx
import { lazy, Suspense } from 'react';

const Charts = lazy(() => import('./pages/home/home'));
const SignIn = lazy(() => import('./pages/Authentication/SignIn'));
// ... idem pour chaque page

// Dans le router, envelopper les éléments avec :
<Suspense fallback={<Loader />}>
  <ProtectedRoute component={Charts} hasPermission={...} />
</Suspense>
```

- **Recommandation :** Un fallback commun (ex. le composant `Loader` existant) pour toutes les routes lazy. Enchaîner avec une analyse du bundle (`vite build --mode analyze` si vous ajoutez `rollup-plugin-visualizer`) pour vérifier la réduction de la taille du chunk initial.

---

### 3.2 Loader initial fixe (1 seconde)

**Fichier :** `src/App.tsx`

- **Problème :** `setTimeout(..., 1000)` : l’utilisateur attend toujours au moins 1 seconde au démarrage, même si l’app est prête avant.
- **Correction :** Afficher le loader uniquement le temps du chargement réel (i18n, restauration de session, etc.). Exemple : un état `isAppReady` basé sur la fin de l’init i18n et, si besoin, une vérification token/session, puis `setLoading(false)` sans délai fixe.

---

### 3.3 i18n réinitialisé à chaque rendu

**Fichier :** `src/App.tsx`

- **Problème :** `i18next.init({ ... })` est appelé dans le corps du composant `App`, donc à **chaque rendu** (ex. changement de langue).
- **Conséquence :** Risque de réinitialisation inutile, comportement potentiellement instable, perte de langue courante si elle n’est pas repassée dans `init`.
- **Correction :** Déplacer l’initialisation d’i18next dans un fichier dédié (ex. `src/i18next.ts` ou `src/i18n.ts`) et l’importer une fois au point d’entrée (`main.tsx`). Dans `App`, utiliser uniquement `i18next.changeLanguage(language)` dans un `useEffect` quand `language` change, sans rappeler `init`.

---

## 4. Design et expérience utilisateur

### 4.1 Loader global et loaders par page

- **Loader global :** `src/common/Loader/index.tsx` est très minimal (spinner seul, fond blanc). Il ne reflète pas le thème (dark) ni la charte (couleurs primaires / logo).
- **Recommandation :** Adapter le Loader au thème (classe `dark:bg-primaryBG-dark` ou équivalent) et réutiliser ce même composant comme fallback des routes lazy.

### 4.2 États de chargement et d’erreur incohérents

- Plusieurs pages **n’affichent pas** d’état de chargement ou d’erreur (ex. `users.tsx`, `products.tsx`, `PrdDetials.tsx`, `CategorySubscription.tsx`) : code commenté du type `// if (loading) return <p>Loading...</p>;`.
- **Recommandation :**
  - Décommenter et afficher un loader (idéalement le composant `Loader` ou un skeleton) pendant le chargement.
  - Afficher un message d’erreur clair + bouton “Réessayer” en cas d’échec API, au lieu de laisser une liste vide ou une page blanche.

### 4.3 Breadcrumb et RTL

- **Fichier :** `src/components/Breadcrumbs/Breadcrumb.tsx`
- Le séparateur `/` et l’ordre des liens peuvent être inadaptés en RTL (arabe). Vérifier que l’ordre visuel et le sens de lecture sont corrects quand `dir="rtl"` (utilisation de `flex-row-reverse` ou ordre logique des éléments si nécessaire).

### 4.4 Cohérence des couleurs et des composants

- Mélange de couleurs en dur (`#0E1FB2`, `#70F1EB`, `#32E26B`, etc.) et de classes Tailwind. Pour la maintenabilité et le dark mode, centraliser les couleurs dans `tailwind.config.cjs` (ou variables CSS) et les réutiliser partout.
- Réutiliser des composants communs pour les cartes, boutons et listes (ex. une “Card” commune, un “DataTable” avec loading/empty/error) pour un design plus homogène.

---

## 5. Structure du code et maintenabilité

### 5.1 Routes dupliquées

**Fichier :** `src/App.tsx`

- Deux routes avec `path: 'products'` : une avec `ProtectedRoute`, une sans. La deuxième n’est jamais atteinte. Supprimer la route en doublon et ne garder qu’une définition (avec ou sans `ProtectedRoute` selon la règle métier).

### 5.2 Imports inutilisés

- `activeUsers` est importé alors que la route utilise `activeCustomers`. Supprimer l’import `activeUsers` s’il n’est utilisé nulle part.

### 5.3 Configuration API en dur

**Fichier :** `src/axiosConfig/instanc.tsx`

- **Problème :** `baseURL: 'https://roogr.sa/api/v1/admin'` en dur. Pas de `process.env` / `import.meta.env` utilisé dans le projet.
- **Recommandation :** Introduire des variables d’environnement, par exemple :
  - `import.meta.env.VITE_API_BASE_URL` (Vite) pour la base URL de l’API.
  - Fichiers `.env`, `.env.development`, `.env.production` (à ne pas commiter avec des secrets). Documenter dans le README.

### 5.4 Typage des permissions

- `hasPermission` est typé `number` dans `ProtectedRoute` alors que les permissions viennent d’une chaîne (`permissions[7]` => `'0'` ou `'1'`). Les index dans `App.tsx` utilisent des nombres. Harmoniser le type (string ou number) et la comparaison (`=== '1'` ou `=== 1`) partout pour éviter des bugs silencieux.

---

## 6. Accessibilité et SEO

### 6.1 index.html

- `lang="en"` fixe : en multilingue, idéalement le `lang` devrait refléter la langue courante (ou au moins être mis à jour côté client si possible).
- Pas de meta description ni de balises Open Graph. Recommandation : au moins une meta description et un titre cohérent avec l’app (déjà “Roogr Dashboard”).

### 6.2 Images

- Plusieurs `<img>` sans `alt` pertinent (ex. ErrorElement, Notfound). Toujours mettre un `alt` descriptif (ex. “Page non trouvée”, “Erreur serveur”) pour l’accessibilité et le SEO.

### 6.3 Focus et navigation clavier

- Vérifier que les modales, sidebars et menus déroulants sont fermables au clavier (Escape, focus trap). Le `DefaultLayout` gère déjà un overlay et Escape pour le sidebar ; à étendre aux popups et formulaires si besoin.

---

## 7. Sécurité et bonnes pratiques

### 7.1 Données sensibles en localStorage

- Token, email, prénom, nom sont stockés dans `localStorage`. C’est acceptable pour un admin, mais en cas de XSS tout est lisible. Recommandation : pas de données ultra-sensibles en clair ; sécuriser les entrées (CSP, sanitization) et limiter la durée de vie du token côté backend.

### 7.2 Gestion 401

- L’intercepteur axios déconnecte et redirige vers `/#/auth/login`. C’est cohérent ; vérifier que le token est bien supprimé et que l’utilisateur ne peut pas revenir en arrière sur des pages protégées sans se reconnecter.

---

## 8. Scripts et assets externes

**Fichier :** `index.html`

- SweetAlert2 est chargé deux fois : CDN + `sweetalert2.all.min.js` (fichier local peut-être absent). Garder une seule source (de préférence le package npm déjà dans le projet) et supprimer les scripts externes dupliqués pour éviter conflits et temps de chargement inutile.

---

## 9. Plan d’action recommandé

| Priorité | Action |
|----------|--------|
| P0       | Corriger `ProtectedRoute` : `hasPermission === 1` ou `=== '1'`. |
| P0       | Corriger les chemins des images 404/500 (chemins publics). |
| P1       | Ne plus figer les permissions au chargement du module ; lire les permissions depuis le store au moment de l’accès à une route (ou recréer le router après login). |
| P1       | Introduire le lazy loading des routes avec `React.lazy` + `Suspense` et un fallback commun. |
| P1       | Supprimer le délai fixe de 1 s du loader initial ; lier le loader au chargement réel de l’app. |
| P2       | Déplacer `i18next.init` dans un module chargé une fois ; utiliser `changeLanguage` dans `App`. |
| P2       | Afficher des états loading/error sur toutes les pages qui font des appels API (réutiliser un même pattern). |
| P2       | Supprimer la route `products` en doublon et l’import inutilisé `activeUsers`. |
| P2       | Utiliser des variables d’environnement pour la base URL de l’API. |
| P3       | Améliorer le Loader global (thème, cohérence). |
| P3       | Vérifier Breadcrumb et composants en RTL. |
| P3       | Ajouter meta description et `alt` aux images ; unifier les couleurs dans la config Tailwind. |

---

## 10. Conclusion

Le projet est utilisable au quotidien mais comporte un **bug critique de permissions** et des **chemins d’assets cassés en production**. Les corrections P0 et P1 (sécurité, permissions, lazy loading, loader) apporteront une amélioration forte en sécurité et en performance. Les points P2/P3 consolideront la maintenabilité, l’UX et l’accessibilité.

Si vous souhaitez, on peut détailler les modifications fichier par fichier pour une des sections (par exemple uniquement sécurité et routes, ou uniquement performance).
