<template>
  <div class="space-y-8">
    <h2 class="text-3xl font-bold text-gray-900">Boutons NxPay</h2>

    <section class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Couleurs</h3>
      <div class="space-y-4">
        <div class="flex gap-4 flex-wrap items-center">
          <NokiButton color="primary" label="Primary (Vert)" />
          <span class="text-xs text-gray-500">#77F07F</span>
        </div>
        <div class="flex gap-4 flex-wrap items-center">
          <NokiButton color="secondary" label="Secondary (Teal)" />
          <span class="text-xs text-gray-500">#3FC995</span>
        </div>
        <div class="flex gap-4 flex-wrap items-center">
          <NokiButton color="green" label="Green" />
          <span class="text-xs text-gray-500">Vert NxPay</span>
        </div>
        <div class="flex gap-4 flex-wrap items-center">
          <NokiButton color="white" label="White" />
          <span class="text-xs text-gray-500">Blanc</span>
        </div>
        <div class="flex gap-4 flex-wrap items-center">
          <NokiButton color="black" label="Black" />
          <span class="text-xs text-gray-500">Noir</span>
        </div>
        <div class="flex gap-4 flex-wrap items-center">
          <NokiButton color="yellow" label="Yellow (Compat)" />
          <span class="text-xs text-gray-500">Compatibilité</span>
        </div>
      </div>
    </section>

    <section class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Shadows</h3>
      <div class="flex gap-4 flex-wrap">
        <NokiButton color="primary" shadowType="dark" label="Dark Shadow" />
        <NokiButton color="primary" shadowType="soft" label="Soft Shadow" />
        <NokiButton color="secondary" shadowType="dark" label="Teal Dark" />
        <NokiButton color="secondary" shadowType="soft" label="Teal Soft" />
      </div>
    </section>

    <section class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">États</h3>
      <div class="flex gap-4 flex-wrap">
        <NokiButton color="primary" label="Normal" />
        <NokiButton color="primary" label="Loading..." :loading="true" />
        <NokiButton color="secondary" label="Loading..." :loading="true" />
      </div>
    </section>

    <section class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Groupes de Boutons</h3>

      <div class="space-y-6">
        <div>
          <p class="text-sm text-gray-600 mb-3">Actions Principales</p>
          <div class="flex gap-4 flex-wrap">
            <NokiButton color="primary" label="Confirmer" />
            <NokiButton color="white" label="Annuler" />
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-3">Actions Multiples</p>
          <div class="flex gap-4 flex-wrap">
            <NokiButton color="primary" label="Créer" />
            <NokiButton color="secondary" label="Modifier" />
            <NokiButton color="black" label="Supprimer" />
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-3">Navigation</p>
          <div class="flex gap-4 flex-wrap">
            <NokiButton color="white" label="Précédent" />
            <NokiButton color="primary" label="Suivant" />
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gray-50 p-8 rounded-xl">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Sur Fond Foncé</h3>
      <div class="bg-gray-900 p-8 rounded-xl flex gap-4 flex-wrap">
        <NokiButton color="primary" label="Primary" />
        <NokiButton color="secondary" label="Secondary" />
        <NokiButton color="white" label="White" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts"></script>
