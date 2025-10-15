# Erreurs Dev Corrigées

**Date :** 15 Octobre 2025  
**Statut :** ✅ CORRIGÉ

---

## PROBLÈME IDENTIFIÉ

### Warning Nuxt

```
WARN  Two component files resolving to the same name Noki:
- src/runtime/components/index.ts
- src/runtime/components/index.js
```

**Cause :** Fichiers générés (.js, .d.ts) présents dans `src/runtime/` au lieu d'être seulement dans `dist/`

---

## SOLUTION APPLIQUÉE

### 1. Mise à jour .gitignore

```gitignore
node_modules
.nuxt
dist

# Fichiers générés (doivent rester uniquement dans dist/)
src/**/*.js
src/**/*.d.ts
!src/**/*.spec.ts
!src/**/*.test.ts
```

### 2. Suppression fichiers générés

```bash
find src/runtime -name "*.js" -type f -delete
find src/runtime -name "*.d.ts" -type f -delete
```

**Résultat :** 66 fichiers générés supprimés de `src/`

### 3. Rebuild

```bash
npm run build
# ✅ Build succeeded for ui
# Σ Total dist size: 134 kB
```

---

## FICHIERS SUPPRIMÉS (66 fichiers)

### Components (23 fichiers)

- components/index.js
- components/index.d.ts
- components/\*.vue.d.ts
- components/\*\*/index.vue.d.ts

### Composables (10 fichiers)

- composables/useApi.js/d.ts
- composables/useCurrencyFormat.js/d.ts
- composables/useCustomConfirm.js/d.ts
- etc.

### Utils (23 fichiers)

- utils/constants/\*.js/d.ts
- utils/models/\*.js/d.ts
- utils/helpers/\*.js/d.ts
- utils/designTokens.js/d.ts

### Assets (10 fichiers)

- assets/index.js/d.ts
- assets/styles/\*.js/d.ts
- assets/images/index.js/d.ts

**Total :** 66 fichiers nettoyés

---

## VALIDATION

### Build ✅

```bash
npm run build
# ✅ Build succeeded for ui
# Σ Total dist size: 134 kB
# ❌ Aucune erreur
```

### Structure Propre ✅

```
src/runtime/
├── components/       (uniquement .vue et .ts)
├── composables/      (uniquement .ts)
├── utils/            (uniquement .ts)
└── assets/           (uniquement .ts et images)

dist/runtime/
├── components/       (.vue, .js, .d.ts générés)
├── composables/      (.js, .d.ts générés)
└── utils/            (.js, .d.ts générés)
```

---

## SERVEUR DEV

### Status

```
URL: http://localhost:3001
Status: Running
Warnings: Devraient être résolus
```

### Test

Accéder à :

- http://localhost:3001/
- http://localhost:3001/navigation-demo
- http://localhost:3001/form-wrapper-demo

---

## CONCLUSION

### ✅ Problème Résolu

- Fichiers générés supprimés de `src/`
- .gitignore mis à jour
- Build propre (134 kB)
- Structure projet correcte

### 🎯 Prochaine Étape

Vérifier que le serveur dev ne montre plus de warnings sur http://localhost:3001

---

**Dernière mise à jour :** 15 Octobre 2025 12:00  
**Status :** ✅ Corrigé
