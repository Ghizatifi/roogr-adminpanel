# Rapport d’audit — Roogr Admin Panel (post-corrections)

**Date :** Février 2026  
**Périmètre :** Application React (Vite, TypeScript, Tailwind, Redux, i18n)  
**Contexte :** Audit réalisé après application des corrections du premier audit.

---

## 1. Résumé exécutif

Les corrections du premier audit ont été appliquées : **sécurité des routes** (ProtectedRoute, permissions dynamiques, normalisation), **performance** (lazy loading, suppression du délai fixe du loader), **i18n** (init centralisée, `changeLanguage` dans un `useEffect`), **images 404/500** (chemins publics + `BASE_URL`), **configuration API** (variables d’environnement).  

Le présent audit identifie les **points restants** et **nouveaux sujets** : redirection du Guard (chemin relatif), double chargement de SweetAlert2, Loader sans thème sombre, risque de crash dans la Sidebar si `permissions` est null, et recommandations (HTML, accessibilité, cohérence).

---

## 2. État des corrections du premier audit

| Point | Statut |
|-------|--------|
| 2.1 ProtectedRoute `hasPermission` (assignation → comparaison) | Corrigé : `permissionIndex` + `value === '1' \|\| value === 1` |
| 2.2 Permissions figées au chargement du module | Corrigé : lecture dans le store via `useSelector(checkPermissions)` dans ProtectedRoute |
| 2.3 Images 404/500 | Corrigé : chemins avec `import.meta.env.BASE_URL` + `alt` via `t()` |
| 3.1 Lazy loading des routes | Corrigé : `React.lazy` + `RouteSuspense` (Loader en fallback) |
| 3.2 Loader initial fixe 1 s | Corrigé : plus de `setTimeout`, loader uniquement au premier rendu |
| 3.3 i18n réinitialisé à chaque rendu | Corrigé : `src/i18n.ts` importé dans `main.tsx`, `changeLanguage(language)` dans `useEffect` dans App |
| 5.1 Route `products` en doublon | Corrigé : une seule route protégée |
| 5.2 Import inutilisé `activeUsers` | Corrigé : supprimé |
| 5.3 Configuration API en dur | Corrigé : `VITE_API_BASE_URL` + `.env.example`, `.env.development`, `.env.production`, README |
| Permissions tableau/chaîne avec virgules | Corrigé : normalisation dans le slice (array → string, suppression des virgules) |

---

## 3. Bugs et problèmes restants

### 3.1 Redirection du Guard vers le login (chemin relatif)

**Fichier :** `src/components/guards/Guards.tsx`

- **Problème :** `return <Navigate to="auth/login" />` utilise un chemin **relatif**. Selon la route courante (ex. `/charts`), la résolution peut donner `/charts/auth/login`, qui n’existe pas.
- **Correction :** Utiliser un chemin absolu : `return <Navigate to="/auth/login" />`.

```tsx
// Avant
return <Navigate to="auth/login" />;

// Après
return <Navigate to="/auth/login" />;
```

---

### 3.2 SweetAlert2 chargé deux fois

**Fichier :** `index.html`

- **Problème :** SweetAlert2 est chargé via le CDN et via un script local `sweetalert2.all.min.js`. Ce fichier **n’existe pas** dans `public/`. Par ailleurs, l’app utilise déjà le package npm (`import Swal from 'sweetalert2'`) dans plusieurs fichiers.
- **Conséquence :** Conflits possibles, erreur 404 pour le script local, bundle inutilement lourd si le CDN est utilisé en plus du bundle.
- **Correction :** Supprimer les deux balises `<script>` SweetAlert2 de `index.html` et ne garder que l’usage via le package npm (déjà en place dans les hooks/composants).

---

### 3.3 Sidebar : crash si `permissions` est null

**Fichier :** `src/components/Sidebar/index.tsx`

- **Problème :** `const permissions = localStorage.getItem('permissions');` peut renvoyer `null`. Ensuite `permissions[0]`, `permissions[1]`, etc. sont utilisés dans l’état initial et dans le `useEffect`, ce qui peut provoquer une erreur (accès à une propriété de `null`).
- **Correction :** Utiliser une valeur par défaut (ex. chaîne de 22 zéros) ou le store Redux pour les permissions, et ne jamais indexer `null` :

```tsx
const permissionsRaw = localStorage.getItem('permissions');
const permissions = permissionsRaw ?? '0000000000000000000000';
```

Ou préférer `useSelector(checkPermissions)` pour rester cohérent avec ProtectedRoute et le slice (normalisation déjà en place).

---

## 4. Design et expérience utilisateur

### 4.1 Loader global et thème sombre

**Fichier :** `src/common/Loader/index.tsx`

- **Constat :** Le loader utilise `bg-white` uniquement. En mode sombre, le fond reste blanc.
- **Recommandation :** Adapter au thème, par exemple : `className="... bg-white dark:bg-primaryBG-dark"` (ou la classe de fond sombre utilisée ailleurs dans l’app).

### 4.2 États de chargement et d’erreur

- Plusieurs pages pourraient encore avoir des états loading/error commentés ou absents. Vérifier les pages qui appellent l’API (users, products, etc.) et s’assurer qu’elles affichent un loader/skeleton et un message d’erreur + action « Réessayer » si pertinent.

---

## 5. Structure du code et maintenabilité

### 5.1 Fichier i18next.ts redondant

**Fichier :** `src/i18next.ts`

- **Constat :** Ce fichier configure i18n avec Backend et LanguageDetector. L’app utilise désormais `src/i18n.ts` (ressources inline, init dans `main.tsx`). `LandingLayout` et `LanguageSwitcher` pointent vers `../i18n` / `../../i18n`.
- **Recommandation :** Supprimer `src/i18next.ts` s’il n’est plus référencé nulle part, ou le documenter clairement s’il est conservé pour un usage futur (ex. chargement async des traductions).

### 5.2 Cohérence des couleurs

- Des couleurs en dur (`#F9FAFF`, `#14141A` dans DefaultLayout, etc.) coexistent avec des classes Tailwind (ex. `primary`, `primaryBG-dark`). Pour la maintenabilité et le dark mode, centraliser les couleurs dans `tailwind.config` ou des variables CSS et les réutiliser partout.

---

## 6. Accessibilité et SEO

### 6.1 index.html

**Fichier :** `index.html`

- **lang :** `lang="en"` est fixe alors que l’app est bilingue (AR/EN). Idéalement, mettre à jour `document.documentElement.lang` côté client en fonction de la langue courante (déjà géré pour `dir` dans App).
- **Meta :** Aucune meta description ni balises Open Graph. Recommandation : au moins une meta description et un titre cohérent (le titre « Roogr Dashboard » est déjà pertinent).

### 6.2 Breadcrumb et RTL

**Fichier :** `src/components/Breadcrumbs/Breadcrumb.tsx`

- En RTL (arabe), l’ordre visuel des liens et le séparateur `/` peuvent être inadaptés. Vérifier l’ordre et le sens (ex. `flex-row-reverse` ou ordre logique des éléments) lorsque `dir="rtl"`.

---

## 7. Sécurité et bonnes pratiques

- **Token / 401 :** L’intercepteur axios déconnecte et redirige vers `/#/auth/login` en cas de 401 ; le slice auth nettoie le localStorage. Comportement cohérent ; s’assurer que le token est bien supprimé et que l’utilisateur ne peut pas accéder aux routes protégées sans se reconnecter.
- **Données sensibles :** Token et données utilisateur dans le localStorage restent exposées en cas de XSS. Limiter les données stockées, sécuriser les entrées (CSP, sanitization) et limiter la durée de vie du token côté backend.

---

## 8. Plan d’action recommandé

| Priorité | Action |
|----------|--------|
| **P0** | Guard : utiliser `<Navigate to="/auth/login" />` (chemin absolu). |
| **P0** | Supprimer les scripts SweetAlert2 de `index.html` (CDN + script local). |
| **P1** | Sidebar : sécuriser l’accès à `permissions` (valeur par défaut ou `useSelector(checkPermissions)`). |
| **P2** | Loader : ajouter le support du thème sombre (`dark:bg-...`). |
| **P2** | Supprimer ou documenter `src/i18next.ts` s’il n’est plus utilisé. |
| **P2** | index.html : meta description ; optionnellement mettre à jour `lang` côté client. |
| **P3** | Breadcrumb : vérifier l’affichage en RTL. |
| **P3** | Centraliser les couleurs (Tailwind / variables CSS). |

---

## 9. Conclusion

Les corrections du premier audit ont nettement amélioré la **sécurité** (ProtectedRoute, permissions dynamiques), la **performance** (lazy loading, loader sans délai fixe) et la **maintenabilité** (i18n, env, images).  

Il reste à **corriger la redirection du Guard** et le **double chargement de SweetAlert2**, et à **sécuriser la Sidebar** face à `permissions` null. Les points P2/P3 renforcent la cohérence design, l’accessibilité et la qualité du code.
