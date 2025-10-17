# Correction Warning Vue Slot

**Date :** 15 Octobre 2025  
**Erreur :** `Non-function value encountered for default slot`

---

## 🐛 PROBLÈME

```
[Vue warn]: Non-function value encountered for default slot.
Prefer function slots for better performance.
```

**Localisation :** `playground/pages/navigation-demo.vue`, ligne 101-110

---

## ❌ CODE ERRONÉ

```vue
<template #actions>
  <UButton icon="i-heroicons-bell" color="white" variant="solid" class="rounded-full">
    <UBadge color="red" variant="solid" size="xs" class="absolute -top-1 -right-1"> 3 </UBadge>
  </UButton>
</template>
```

**Problème :** Le `UBadge` était placé à l'intérieur du `UButton` comme contenu de slot par défaut, ce qui causait le warning Vue.

---

## ✅ CODE CORRIGÉ

```vue
<template #actions>
  <div class="relative">
    <UButton icon="i-heroicons-bell" color="white" variant="solid" class="rounded-full" />
    <UBadge color="red" variant="solid" size="xs" class="absolute -top-1 -right-1" label="3" />
  </div>
  <UButton icon="i-heroicons-user-circle" color="gray" variant="ghost" />
</template>
```

**Solution :**

1. Envelopper le bouton et le badge dans une `<div class="relative">`
2. Placer le badge en dehors du bouton
3. Utiliser `position: absolute` sur le badge pour le positionner au-dessus du bouton
4. Utiliser la prop `label` au lieu du contenu du slot

---

## 🎯 RÉSULTAT VISUEL

**Avant et après :** Identique visuellement  
**Performance :** Améliorée (pas de warning)  
**Structure HTML :** Plus propre et conforme aux bonnes pratiques Vue

---

## 📝 LEÇON APPRISE

### Bonnes Pratiques Vue 3

1. **Éviter d'imbriquer des composants dans les slots par défaut** sans fonction wrapper
2. **Utiliser `position: absolute`** pour superposer des éléments plutôt que de les imbriquer
3. **Préférer les props** (`label`) au contenu de slot quand possible
4. **Structure HTML correcte** : Un badge de notification doit être un sibling, pas un enfant

### Pattern Correct pour Badge de Notification

```vue
<!-- ✅ BON -->
<div class="relative">
  <UButton icon="i-heroicons-bell" />
  <UBadge label="3" class="absolute -top-1 -right-1" />
</div>

<!-- ❌ MAUVAIS -->
<UButton icon="i-heroicons-bell">
  <UBadge>3</UBadge>
</UButton>
```

---

## 🧪 VALIDATION

```bash
npm run dev
# → Aucun warning Vue
# → http://localhost:3001/navigation-demo fonctionne correctement
```

**Status :** ✅ Corrigé et validé

---

## 📚 RÉFÉRENCES

- [Vue 3 Slots Guide](https://vuejs.org/guide/components/slots.html)
- [Vue 3 Performance Best Practices](https://vuejs.org/guide/best-practices/performance.html)
- [@nuxt/ui Button Component](https://ui.nuxt.com/components/button)
- [@nuxt/ui Badge Component](https://ui.nuxt.com/components/badge)

---

**Fichier modifié :** `playground/pages/navigation-demo.vue`  
**Lignes modifiées :** 100-117  
**Warning résolu :** ✅
