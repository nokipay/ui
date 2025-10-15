# Roadmap Migration - Admin vers @nxpay/ui

**Date :** 15 Octobre 2025  
**Statut :** En planification

---

## VUE D'ENSEMBLE

### Objectif

Extraire 21 fonctionnalités de l'Admin vers @nxpay/ui pour réutilisation dans Admin, Merchant et futurs projets.

### Durée totale

5 semaines (1 développeur)

### Impact

- Réduction duplication : 70%
- Réutilisabilité : 85%
- Nouveaux éléments : +21

---

## PLANNING VISUEL

```
Semaine 1 │ PERMISSIONS & AUTH
━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          │ ✓ useHasRole + useHasPermission
          │ ✓ v-permission directive
          │ ✓ v-role directive
          │ ✓ useLogout
          │ ✓ Models auth
          │
Semaine 2 │ EXPORT & TABLES
━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          │ ✓ ExportButton/Modal (PDF/Excel)
          │ ✓ TableLayout
          │ ✓ useUTableFilter
          │ ✓ Models table
          │
Semaine 3 │ STATS & DASHBOARD
━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          │ ✓ RefreshButton
          │ ✓ StatCard (amélioration)
          │ ✓ FilterBar
          │ ✓ StatHistory
          │
Semaine 4 │ FORMS & LAYOUTS
━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          │ ✓ FormWrapper (amélioration)
          │ ✓ LayoutSettings
          │ ✓ useApiErrorLabel
          │
Semaine 5 │ UTILS & FINITIONS
━━━━━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          │ ✓ Models TypeScript (5)
          │ ✓ Tests unitaires
          │ ✓ Documentation Storybook
          │ ✓ Playground demos
```

---

## ÉLÉMENTS PAR CATÉGORIE

### 🎨 COMPOSANTS (13 nouveaux)

| Composant              | Priorité   | Semaine | Status |
| ---------------------- | ---------- | ------- | ------ |
| ExportButton/Modal     | 🔴 HAUTE   | 2       | ⏳     |
| TableLayout            | 🔴 HAUTE   | 2       | ⏳     |
| RefreshButton          | 🔴 HAUTE   | 3       | ⏳     |
| StatCard (amélioré)    | 🟠 MOYENNE | 3       | ⏳     |
| FilterBar              | 🟠 MOYENNE | 3       | ⏳     |
| StatHistory            | 🟠 MOYENNE | 3       | ⏳     |
| FormWrapper (amélioré) | 🟠 MOYENNE | 4       | ⏳     |
| LayoutSettings         | 🟠 MOYENNE | 4       | ⏳     |

**Total :** 8 composants prioritaires

---

### 🔧 COMPOSABLES (5 nouveaux)

| Composable                    | Priorité   | Semaine | Status |
| ----------------------------- | ---------- | ------- | ------ |
| useHasRole / useHasPermission | 🔴 HAUTE   | 1       | ⏳     |
| useLogout                     | 🟠 MOYENNE | 1       | ⏳     |
| useUTableFilter               | 🔴 HAUTE   | 2       | ⏳     |
| useApiErrorLabel              | 🟠 MOYENNE | 4       | ⏳     |
| useResetStore                 | 🟡 BASSE   | 5       | ⏳     |

**Total :** 5 composables

---

### 📋 DIRECTIVES (2 nouvelles)

| Directive    | Priorité   | Semaine | Status |
| ------------ | ---------- | ------- | ------ |
| v-permission | 🔴 HAUTE   | 1       | ⏳     |
| v-role       | 🟠 MOYENNE | 1       | ⏳     |

**Total :** 2 directives

---

### 📦 MODELS & UTILS (6 nouveaux)

| Élément            | Type      | Semaine | Status |
| ------------------ | --------- | ------- | ------ |
| SidebarLink        | Interface | 1       | ⏳     |
| Notification       | Interface | 1       | ⏳     |
| TableColumn        | Interface | 2       | ⏳     |
| PaginationOptions  | Interface | 2       | ⏳     |
| errorMessages      | Constants | 4       | ⏳     |
| Validation schemas | Zod       | 5       | ⏳     |

**Total :** 6 éléments

---

## DÉTAILS PAR PHASE

### PHASE 1 - Permissions & Auth (Semaine 1)

**Objectif :** Système de permissions complet

**Livrables :**

```typescript
// Composables
useHasRole('admin')
useHasPermission('users.create')
useCanAccess('/admin/users')
useLogout()

// Directives
<div v-permission="'users.create'">...</div>
<div v-role="'admin'">...</div>

// Models
interface Permission { id, name, description }
interface Role { id, name, permissions }
```

**Tests :**

- Tests unitaires composables (10+)
- Tests directives (5+)
- Playground demo page

---

### PHASE 2 - Export & Tables (Semaine 2)

**Objectif :** Composants tables professionnels

**Livrables :**

```vue
<!-- Export PDF/Excel -->
<ExportButton :data="transactions" format="pdf" :logo="companyLogo" />

<!-- Layout CRUD complet -->
<TableLayout title="Utilisateurs" :showFilters="true" :showExport="true">
  <template #table>
    <UTable :rows="users" />
  </template>
</TableLayout>

<!-- Composable filtres -->
const { filteredData, search, sort } = useUTableFilter(data)
```

**Tests :**

- Tests export PDF (5+)
- Tests export Excel (5+)
- Tests TableLayout (10+)
- Tests useUTableFilter (10+)
- Storybook stories (3+)

---

### PHASE 3 - Stats & Dashboard (Semaine 3)

**Objectif :** Composants dashboard riches

**Livrables :**

```vue
<!-- Refresh animé -->
<RefreshButton :loading="loading" @click="refresh" />

<!-- Card stats améliorée -->
<StatCard title="Solde" :number="12345678" icon="heroicons:banknotes" :difference="15.3" />

<!-- Barre filtres -->
<FilterBar @updateFilters="apply" @resetFilters="reset" />

<!-- Historique avec badges -->
<StatHistory :items="history" :showExport="true" />
```

**Tests :**

- Tests RefreshButton (5+)
- Tests StatCard (10+)
- Tests FilterBar (8+)
- Tests StatHistory (10+)
- Storybook stories (4+)

---

### PHASE 4 - Forms & Layouts (Semaine 4)

**Objectif :** Amélioration forms & layouts

**Livrables :**

```vue
<!-- Form wrapper amélioré -->
<FormWrapper title="Créer" :error="error" :errors="errors" :success="success" :showBack="true">
  <!-- fields -->
</FormWrapper>

<!-- Layout settings -->
<NuxtLayout name="settings">
  <!-- content -->
</NuxtLayout>
```

**Composables :**

```typescript
const { getErrorLabel } = useApiErrorLabel()
const message = getErrorLabel('ERR_NETWORK')
```

**Tests :**

- Tests FormWrapper (10+)
- Tests LayoutSettings (5+)
- Tests useApiErrorLabel (8+)
- Storybook stories (2+)

---

### PHASE 5 - Utils & Finitions (Semaine 5)

**Objectif :** Finalisation & documentation

**Livrables :**

1. Models TypeScript complets
2. Constants erreurs
3. Schemas validation Zod
4. Tests coverage 80%+
5. Documentation Storybook complète
6. Playground démo toutes features
7. Migration guide
8. Changelog v3.0.0

---

## CHECKLIST QUALITÉ

### Chaque élément doit avoir :

- [ ] Tests unitaires (coverage 80%+)
- [ ] Story Storybook
- [ ] Démo Playground
- [ ] Documentation JSDoc
- [ ] Types TypeScript
- [ ] Exemples d'utilisation
- [ ] Migration guide (si breaking)

---

## MÉTRIQUES DE SUCCÈS

### Code

- Coverage tests : 80%+
- 0 erreurs TypeScript
- 0 warnings ESLint critiques
- Build size : < 200 kB

### Documentation

- 21 Storybook stories
- 21 Playground demos
- 1 Migration guide
- 1 Changelog v3.0

### Adoption

- Admin : 100% migration
- Merchant : 80% utilisation
- Mobile : 0% (React Native séparé)

---

## RISQUES & MITIGATIONS

### Risques identifiés

1. **Breaking changes apps existantes**
   - Mitigation : Versioning sémantique (v3.0)
   - Migration guide détaillé
   - Support v2.x pendant 3 mois

2. **Dépendances supplémentaires (jsPDF, xlsx)**
   - Mitigation : Lazy loading dynamique
   - Peer dependencies (optionnelles)
   - Tree-shaking optimisé

3. **Complexité TypeScript**
   - Mitigation : Types bien documentés
   - Exemples concrets
   - Support IDE (IntelliSense)

4. **Temps de développement**
   - Mitigation : Priorisation claire
   - Tests automatisés
   - Reviews régulières

---

## APRÈS MIGRATION

### Version @nxpay/ui 3.0

```
Composants : 33 (+65%)
Composables : 12 (+71%)
Directives : 2 (nouvelles)
Models : 8 (nouveaux)
Tests : 200+ (+150%)
Coverage : 85%
```

### Apps bénéficiaires

**Admin :**

- Suppression 70% duplication
- Import direct @nxpay/ui
- Maintenance centralisée

**Merchant :**

- Même components Admin
- Design cohérent
- Développement 50% plus rapide

**Futurs projets :**

- Démarrage rapide
- Components prêts
- Best practices incluses

---

## PROCHAINES ÉTAPES

### Cette semaine

1. ✅ Analyse complète Admin
2. ✅ Roadmap créée
3. ⏳ Validation roadmap
4. ⏳ Créer branche `feature/ui-v3-migration`

### Semaine prochaine

1. Démarrer Phase 1 (Permissions)
2. Setup tests environment
3. Première PR (useHasRole)

---

**Document :** Roadmap Migration  
**Version :** 1.0  
**Créé le :** 15 Octobre 2025  
**Prochaine révision :** Fin Phase 1
