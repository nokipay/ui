# Nuxt UI Library

Une librairie de composants UI pour Nuxt 3.

## Installation

```bash
npm install @nokipay/ui
```

## Configuration

Ajoutez le module à votre `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    '@nokipay/ui'
  ]
})
```

## Développement

```bash
# Installer les dépendances
npm install

# Développer avec le playground
npm run dev

# Construire la librairie
npm run build

# Lancer les tests
npm run test
```

## Composants disponibles

### Header (NokiHeader)

```vue
<template>
  <NokiHeader 
    title="Mon titre" 
    subtitle="Mon sous-titre"
    icon="i-heroicons-home"
    titleSize="2xl"
    subtitleSize="sm"
  >
    <template #right>
      <Button label="Action" />
    </template>
  </NokiHeader>
</template>
```

#### Props

- `title`: Titre principal (requis)
- `subtitle`: Sous-titre optionnel
- `icon`: Icône à afficher (format Heroicons)
- `badge`: Badge simple avec label et classe CSS
- `statusBadge`: Badge de statut avec propriétés avancées
- `titleSize`: Taille du titre - 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' (défaut: '2xl')
- `subtitleSize`: Taille du sous-titre - 'xs' | 'sm' | 'md' | 'lg' | 'xl' (défaut: 'sm')

#### Tailles de titre disponibles

- **xs**: `text-xs` (12px)
- **sm**: `text-sm` (14px) 
- **md**: `text-base` (16px)
- **lg**: `text-lg` (18px)
- **xl**: `text-xl` (20px)
- **2xl**: `text-2xl` (24px) - Responsive: `md:text-3xl` (30px)
- **3xl**: `text-3xl` (30px) - Responsive: `md:text-4xl` (36px)
- **4xl**: `text-4xl` (36px)
- **5xl**: `text-5xl` (48px)

#### Tailles de sous-titre disponibles

- **xs**: `text-xs` (12px)
- **sm**: `text-sm` (14px)
- **md**: `text-base` (16px)
- **lg**: `text-lg` (18px)
- **xl**: `text-xl` (20px)

#### Slots

- `#left`: Contenu à gauche du titre
- `#right`: Contenu à droite du header
- `#extra`: Contenu supplémentaire sous le sous-titre

### Button

```vue
<template>
  <Button variant="primary" size="md" @click="handleClick">
    Mon bouton
  </Button>
</template>
```

#### Props

- `variant`: 'primary' | 'secondary' | 'outline' (défaut: 'primary')
- `size`: 'sm' | 'md' | 'lg' (défaut: 'md')

#### Events

- `click`: Émis lors du clic sur le bouton