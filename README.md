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

### Badge (NokiBadge)

```vue
<template>
  <!-- Badge avec statut automatique -->
  <NokiBadge 
    status="active" 
    size="md" 
    variant="soft" 
  />
  
  <!-- Badge avec label personnalisé -->
  <NokiBadge 
    label="Personnalisé" 
    customSize="text-lg px-4 py-2 font-bold" 
  />
  
  <!-- Badge avec type spécifique -->
  <NokiBadge 
    :status="true" 
    type="activeinactive" 
  />
</template>
```

#### Props

- `status`: Statut optionnel à afficher (string, number, boolean, null, undefined)
- `size`: Taille prédéfinie ('sm', 'md', 'lg') - défaut: 'md'
- `variant`: Style du badge ('solid', 'soft', 'outline') - défaut: 'soft'
- `className`: Classes CSS personnalisées
- `label`: Texte personnalisé (recommandé pour un affichage optimal)
- `customSize`: Classes CSS personnalisées pour la taille (priorité sur size)
- `color`: Couleur personnalisée ('success', 'warning', 'error', 'info', 'default', 'purple', 'pink', 'orange', 'teal', 'gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'violet') - défaut: 'default'
- `fontWeight`: Poids de la police ('normal', 'medium', 'semibold', 'bold', 'italic') - défaut: 'medium'

#### Utilisation Simplifiée

Le composant `NokiBadge` est maintenant simplifié et plus flexible. Il n'y a plus de logique complexe de gestion des types booléens. À la place, vous contrôlez directement l'apparence via les props :

```vue
<!-- Badge simple avec label et couleur -->
<NokiBadge 
  label="Actif" 
  color="success" 
/>

<!-- Badge avec statut et label personnalisé -->
<NokiBadge 
  :status="true" 
  label="Utilisateur connecté" 
  color="green" 
  fontWeight="bold" 
/>
```

#### Couleurs par type de statut

Le composant utilise un système de couleurs basé sur le type de statut :

- **🟢 Vert (succès)**: `success`, `active`, `approved`, `paid`, `online`, `completed`, `true`, `1`
- **🟡 Jaune (attente)**: `pending`, `unpaid`
- **🔴 Rouge (erreur)**: `failed`, `rejected`
- **⚫ Gris (neutre)**: `inactive`, `cancelled`, `offline`, `false`, `0`
- **🔵 Bleu (défaut)**: Tous les autres statuts

**Note**: 
- Tous les badges ont des bords arrondis (`rounded-full`) pour un design moderne
- Les couleurs sont contrôlées via la prop `color`
- Les labels sont recommandés pour un affichage optimal
- Le composant est maintenant plus simple et plus flexible

#### Exemples d'utilisation

```vue
<!-- Badge simple -->
<NokiBadge status="pending" />

<!-- Badge avec taille et style personnalisés -->
<NokiBadge 
  status="completed" 
  size="lg" 
  variant="outline" 
/>

<!-- Badge avec label personnalisé -->
<NokiBadge 
  label="Important" 
  customSize="text-xl px-6 py-3 font-bold bg-red-100 text-red-800" 
/>

<!-- Badge avec couleur personnalisée -->
<NokiBadge 
  label="Premium" 
  color="purple" 
  fontWeight="bold" 
/>

<!-- Badge avec poids de police personnalisé -->
<NokiBadge 
  label="Urgent" 
  color="red" 
  fontWeight="semibold" 
  size="lg" 
/>

<!-- Badge de statut booléen avec label traduit -->
<NokiBadge 
  :status="true" 
  type="activeinactive" 
  :label="t('status.active')" 
/>

<!-- Badge yesno avec label traduit -->
<NokiBadge 
  :status="false" 
  type="yesno" 
  :label="t('status.no')" 
/>
```