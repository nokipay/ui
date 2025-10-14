# Quick Start - NxPay UI v2.0

Le serveur de développement fonctionne ! Voici comment explorer tout ce qui a été créé.

---

## Playground en Cours

**URL :** http://localhost:3000/

### Pages Disponibles

#### 1. Accueil
http://localhost:3000/
- Palette de 5 couleurs NxPay
- Statistiques du projet
- Navigation

#### 2. Tous les Composants
http://localhost:3000/components
- **20+ composants** organisés en 8 sections
- Navigation rapide par ancres
- Démos interactives
- Code snippets pour chaque composant

Sections :
- Buttons (6 couleurs)
- Badges (variants soft, solid, outline)
- Cards (3 styles)
- Forms (5 composants)
- Tables (3 composants)
- Modals (2 composants)
- Utility (4 composants : Preloader, NetworkStatus, InitData, Header)

#### 3. Boutons
http://localhost:3000/buttons
- 6 couleurs détaillées
- Shadows (dark, soft)
- États (normal, loading)
- Groupes de boutons
- Sur fond foncé

#### 4. Formulaires
http://localhost:3000/forms
- Formulaire complet interactif
- États des inputs
- Validation visuelle
- Soumission avec feedback

#### 5. Gradients
http://localhost:3000/gradients
- Gradient signature (135deg)
- Gradient vertical
- 4 gradients personnalisés
- Gradient 5 couleurs
- Transparences
- Code CSS pour chaque gradient

#### 6. Design Tokens
http://localhost:3000/design-tokens
- Gradients
- Shadows
- Border radius
- Typography

---

## Storybook

### Lancer Storybook

```bash
# Dans un autre terminal
cd ui
pnpm storybook
```

**URL :** http://localhost:6006/

### Stories Disponibles

#### Documentation
- Introduction
- Colors (palette complète)
- Design Tokens (tous les tokens)

#### Components
- Button (8 variantes)
- Badge (10+ variantes)
- Card (5 variantes)

---

## Composants Disponibles

### Liste Complète (20+)

**Boutons & Actions**
- Button (6 couleurs)
- ButtonAction

**Badges & Cards**
- Badge (3 variants, 3 tailles)
- Card (stats, montants)

**Formulaires**
- FormWrapper
- FormAuth
- FormInput
- FormPhoneInput
- FormFileUploader
- Form (base)

**Tables**
- TableWrapper
- ElementByPage
- PaginationInfo
- Table (base)

**Modals**
- Confirm
- ConfirmDialog

**Utility**
- Preloader
- NetworkStatus
- InitData
- Header

---

## Palette NxPay

### 5 Couleurs

```
#77F07F - Vert Clair (Primary)
#3FC995 - Teal (Secondary)
#40A0AE - Bleu Turquoise (Tertiary)
#37669C - Bleu Moyen (Quaternary)
#3A2F6B - Violet Foncé (Accent)
```

### Classes Tailwind

```html
<div class="bg-nxGreen-500">Vert</div>
<div class="bg-nxTeal-500">Teal</div>
<div class="bg-nxBlueTurquoise-500">Bleu Turquoise</div>
<div class="bg-nxBlue-500">Bleu Moyen</div>
<div class="bg-nxPurple-500">Violet</div>
```

### Gradient Signature

```html
<div class="gradient-nxpay">
  Gradient NxPay
</div>
```

---

## Tests

```bash
npm test
# Résultat : 93/93 tests passed (100%)
```

---

## Prochaines Étapes

1. **Explorer le Playground**
   - Ouvrez http://localhost:3000
   - Naviguez entre les 6 pages
   - Testez les composants interactifs

2. **Explorer Storybook**
   - Lancez `pnpm storybook`
   - Ouvrez http://localhost:6006
   - Modifiez les props des composants

3. **Utiliser dans vos Apps**
   - Admin : http://localhost:3007
   - Merchant : http://localhost:3008

4. **Lire la Documentation**
   - Voir `docs/INDEX.md`
   - Guide complet disponible

---

## Commandes Utiles

```bash
# Playground
pnpm dev          # Déjà lancé !

# Storybook
pnpm storybook    # Port 6006

# Tests
pnpm test         # 93 tests

# Build
pnpm build        # Build module
```

---

**Le Playground est maintenant accessible et complet avec 20+ composants démontrés !**

**Explorez : http://localhost:3000/components** pour voir tous les composants NxPay UI.

---

**Date :** 14 Octobre 2025  
**Version :** 2.0.0  
**Status :** Running on port 3000

