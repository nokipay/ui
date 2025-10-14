# Playground & Storybook - NxPay UI

Documentation du Playground Nuxt et du Storybook pour NxPay UI.

---

## PLAYGROUND NUXT

### Structure

```
playground/
├── app.vue                    # Layout principal avec navigation
├── nuxt.config.ts            # Configuration Nuxt + Tailwind
├── tailwind.config.ts        # 88 couleurs NxPay
├── package.json              # Dépendances playground
├── assets/
│   └── css/
│       └── tailwind.css      # CSS avec utilities custom
└── pages/
    ├── index.vue             # Accueil avec palette
    ├── components.vue        # Démo composants
    ├── buttons.vue           # Tous les boutons
    ├── forms.vue             # Formulaires interactifs
    ├── gradients.vue         # Galerie de gradients
    └── design-tokens.vue     # Design tokens
```

### Pages Disponibles

#### 1. Home (/)

Contenu :

- Hero avec gradient NxPay
- Palette de 5 couleurs interactive
- Statistiques du projet (composants, couleurs, tokens)
- Navigation vers autres pages

#### 2. Components (/components)

Contenu :

- Démonstration Button (6 couleurs)
- Badges avec variants (soft, solid, outline)
- Cards avec différents styles

#### 3. Buttons (/buttons)

Contenu :

- Toutes les couleurs (primary, secondary, green, yellow, white, black)
- Shadows (dark, soft)
- États (normal, loading)
- Groupes de boutons
- Sur fond foncé

#### 4. Forms (/forms)

Contenu :

- Formulaire complet interactif
- États des inputs (normal, succès, erreur, disabled)
- Focus states avec couleurs NxPay
- Validation visuelle

#### 5. Gradients (/gradients)

Contenu :

- Gradient signature (135deg)
- Gradient vertical (180deg)
- Gradients personnalisés (horizontal, diagonal)
- Gradient 5 couleurs complet
- Gradients avec transparence
- Exemples d'utilisation

#### 6. Design Tokens (/design-tokens)

Contenu :

- Gradients interactifs
- Shadows avec glow effects
- Border radius scale
- Typography scale

---

## STORYBOOK

### Structure

```
.storybook/
├── main.ts               # Configuration principale
└── preview.ts            # Preview avec Tailwind

stories/
├── Introduction.stories.mdx       # Page d'introduction
├── Colors.stories.mdx             # Documentation couleurs
└── DesignTokens.stories.mdx       # Documentation tokens

src/runtime/components/
├── Button/
│   └── Button.stories.ts          # Stories Button
├── Badge/
│   └── Badge.stories.ts           # Stories Badge
└── Card/
    └── Card.stories.ts            # Stories Card
```

### Stories Créées

#### Introduction

- Page d'accueil Storybook
- Présentation palette NxPay
- Quick start
- Installation

#### Colors

- Documentation complète couleurs
- Classes Tailwind disponibles
- Échelle de teintes
- Alias de compatibilité
- Guidelines accessibilité

#### Design Tokens

- Documentation tokens TypeScript
- Colors
- Gradients
- Spacing
- Border Radius
- Shadows
- Typography
- Breakpoints
- Transitions

#### Button Stories

- Primary, Secondary, Green, White, Black, Yellow
- Loading states
- Shadows (dark, soft)
- All colors grid

#### Badge Stories

- Success, Warning, Error, Info
- Variants (solid, soft, outline)
- Sizes (sm, md, lg)
- All variants grid

#### Card Stories

- Default
- With variation
- Negative variation
- Large amount
- All cards grid

---

## Lancer le Playground

### Commandes

```bash
cd playground

# Développement
pnpm dev
# Ouvre http://localhost:3000

# Build
pnpm build

# Preview
pnpm preview
```

### Navigation

Une fois lancé, naviguer vers :

- http://localhost:3000/ - Accueil
- http://localhost:3000/components - Composants
- http://localhost:3000/buttons - Boutons
- http://localhost:3000/forms - Formulaires
- http://localhost:3000/gradients - Gradients
- http://localhost:3000/design-tokens - Tokens

---

## Lancer Storybook

### Commandes

```bash
# Depuis la racine ui/
pnpm storybook
# Ouvre http://localhost:6006

# Build statique
pnpm storybook:build
# Génère dans storybook-static/
```

### Navigation

Une fois lancé, explorer :

- Documentation / Introduction
- Documentation / Colors
- Documentation / Design Tokens
- Components / Button
- Components / Badge
- Components / Card

---

## Fonctionnalités

### Playground

- 6 pages interactives
- Navigation responsive
- Auto-import composants NxPay
- Tailwind CSS avec 88 couleurs
- Hot reload
- Header avec logo gradient
- Footer

### Storybook

- Autodocs activé
- 3 backgrounds (light, dark, gradient NxPay)
- Controls interactifs
- Code snippets
- Documentation MDX
- Vue 3 + Vite
- Addons : essentials, interactions, links

---

## Utilities CSS Custom

Disponibles dans le Playground :

```css
.gradient-nxpay              /* Gradient signature */
.gradient-nxpay-vertical     /* Gradient vertical */
.shadow-nxpay-green          /* Shadow avec glow vert */
.shadow-nxpay-teal           /* Shadow avec glow teal */
```

---

## Développement

### Ajouter une Page Playground

1. Créer `playground/pages/my-page.vue`
2. Ajouter le lien dans `app.vue`
3. La route sera automatique : `/my-page`

### Ajouter une Story

1. Créer `src/runtime/components/MyComponent/MyComponent.stories.ts`
2. Lancer Storybook
3. La story apparaît automatiquement

---

## Contenu Créé

### Playground : 6 Pages

1. index.vue - Accueil
2. components.vue - Composants
3. buttons.vue - Boutons (NOUVEAU)
4. forms.vue - Formulaires (NOUVEAU)
5. gradients.vue - Gradients (NOUVEAU)
6. design-tokens.vue - Tokens

### Storybook : 6 Stories

1. Introduction.stories.mdx
2. Colors.stories.mdx (NOUVEAU)
3. DesignTokens.stories.mdx (NOUVEAU)
4. Button.stories.ts
5. Badge.stories.ts (NOUVEAU)
6. Card.stories.ts (NOUVEAU)

**Total : 12 fichiers de démo créés**

---

## Exemples Interactifs

### Playground

- Formulaire avec validation
- Boutons avec hover effects
- Gradients animés
- Couleurs cliquables

### Storybook

- Controls pour modifier props
- Code examples
- Playground interactif
- Documentation auto-générée

---

**Date :** 14 Octobre 2025  
**Playground Pages :** 6  
**Storybook Stories :** 6  
**Status :** Production Ready
