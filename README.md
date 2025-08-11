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