<script setup lang="ts">
import { ref } from 'vue'
import type { SidebarLink } from '../../src/runtime/utils/models/sidebar-link'

const mobileMenuOpen = ref(false)

const menuLinks: SidebarLink[] = [
  {
    title: 'Dashboard',
    icon: 'heroicons:home',
    route_link: '/navigation-demo',
  },
  {
    title: 'Utilisateurs',
    icon: 'heroicons:users',
    children: [
      { title: 'Liste Utilisateurs', route_link: '/users', icon: 'heroicons:list-bullet' },
      {
        title: 'Créer Utilisateur',
        route_link: '/users/create',
        icon: 'heroicons:user-plus',
      },
      {
        title: 'Permissions',
        route_link: '/users/permissions',
        icon: 'heroicons:shield-check',
      },
    ],
  },
  {
    title: 'Transactions',
    icon: 'heroicons:banknotes',
    route_link: '/transactions',
  },
  {
    title: 'Rapports',
    icon: 'heroicons:chart-bar',
    children: [
      { title: "Vue d' ensemble", route_link: '/reports', icon: 'heroicons:eye' },
      { title: 'Statistiques', route_link: '/reports/stats', icon: 'heroicons:chart-pie' },
      { title: 'Exportations', route_link: '/reports/exports', icon: 'heroicons:arrow-down-tray' },
    ],
  },
  {
    title: 'Paramètres',
    icon: 'heroicons:cog-6-tooth',
    route_link: '/settings',
  },
]
</script>

<template>
  <div>
    <!-- Titre page -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Navigation Components</h1>
      <p class="text-gray-600">Démonstration des composants de navigation</p>
    </div>

    <!-- Démo Layout Dashboard -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Layout Dashboard Complet</h2>
      <p class="text-gray-600 mb-6">
        Exemple de layout complet avec Sidebar + Navbar + Navigation.
        <strong
          >Cette démo montre un vrai dashboard avec sidebar fixe, navbar responsive et contenu
          scrollable.</strong
        >
      </p>

      <!-- Wrapper avec hauteur fixe pour la démo -->
      <div
        class="border-4 border-gray-300 rounded-lg overflow-hidden bg-gray-50"
        style="height: 700px"
      >
        <div class="flex h-full">
          <!-- Sidebar Desktop -->
          <div class="w-64 flex-shrink-0">
            <NavigationSidebar logo="/logo.png" app-name="NxPay" :links="menuLinks">
              <template #footer>
                <div class="px-4 py-3 border-t border-gray-800">
                  <UButton
                    icon="i-heroicons-arrow-right-on-rectangle"
                    label="Déconnexion"
                    color="red"
                    variant="soft"
                    block
                  />
                </div>
              </template>
            </NavigationSidebar>
          </div>

          <!-- Mobile Sidebar -->
          <NavigationSidebarMobile
            v-model="mobileMenuOpen"
            logo="/logo.png"
            app-name="NxPay"
            :links="menuLinks"
          />

          <!-- Main Content -->
          <div class="flex-1 flex flex-col overflow-hidden bg-white">
            <!-- Navbar -->
            <NavigationNavbar
              title="Dashboard"
              subtitle="Vue d'ensemble de votre activité"
              @toggle-mobile-menu="mobileMenuOpen = !mobileMenuOpen"
            >
              <template #actions>
                <div class="relative">
                  <UButton
                    icon="i-heroicons-bell"
                    color="white"
                    variant="solid"
                    class="rounded-full"
                  />
                  <UBadge
                    color="red"
                    variant="solid"
                    size="xs"
                    class="absolute -top-1 -right-1"
                    label="3"
                  />
                </div>
                <UButton icon="i-heroicons-user-circle" color="gray" variant="ghost" />
              </template>
            </NavigationNavbar>

            <!-- Content Scrollable -->
            <div class="flex-1 overflow-y-auto p-6">
              <!-- Content Démo -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card title="Solde Total" :number="5678900" icon="heroicons:banknotes" />
                <Card
                  title="Revenus"
                  :number="12345678"
                  icon="heroicons:arrow-trending-up"
                  :difference="15.5"
                  color="green-600"
                  accent-color="success"
                />
                <Card
                  title="Dépenses"
                  :number="987654"
                  icon="heroicons:arrow-trending-down"
                  :difference="-8.2"
                  color="red-600"
                  accent-color="danger"
                />
                <Card title="Transactions" :number="987654321" icon="heroicons:currency-dollar" />
              </div>

              <!-- Tables démo -->
              <div>
                <TableWrapper
                  title="Dernières Transactions"
                  description="Liste des transactions récentes"
                >
                  <template #header>
                    <div class="flex gap-2">
                      <UButton icon="i-heroicons-funnel" label="Filtrer" size="sm" />
                      <UButton
                        icon="i-heroicons-arrow-down-tray"
                        label="Exporter"
                        color="primary"
                        size="sm"
                      />
                    </div>
                  </template>

                  <UTable
                    :rows="[
                      {
                        id: 1,
                        type: 'Recharge',
                        montant: '50 000 FCFA',
                        status: 'Approuvé',
                      },
                      {
                        id: 2,
                        type: 'Transfert',
                        montant: '25 000 FCFA',
                        status: 'En attente',
                      },
                      {
                        id: 3,
                        type: 'Retrait',
                        montant: '100 000 FCFA',
                        status: 'Approuvé',
                      },
                    ]"
                    :columns="[
                      { key: 'id', label: 'ID' },
                      { key: 'type', label: 'Type' },
                      { key: 'montant', label: 'Montant' },
                      { key: 'status', label: 'Statut' },
                    ]"
                  />
                </TableWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Composants Individuels -->
    <div class="space-y-12">
      <!-- NavigationLink -->
      <div>
        <h2 class="text-2xl font-bold text-gray-800 mb-4">NavigationLink</h2>
        <p class="text-gray-600 mb-6">Liens de navigation avec support accordéon</p>

        <div class="bg-gray-900 p-6 rounded-lg max-w-xs border border-gray-700">
          <div class="space-y-2">
            <NavigationLink icon="heroicons:home" title="Dashboard" link="/navigation-demo" />
            <NavigationLink
              icon="heroicons:users"
              title="Utilisateurs"
              :children="[
                { title: 'Liste', route_link: '/users', icon: 'heroicons:list-bullet' },
                { title: 'Créer', route_link: '/users/create', icon: 'heroicons:user-plus' },
              ]"
            />
            <NavigationLink icon="heroicons:cog-6-tooth" title="Paramètres" link="/settings" />
          </div>
        </div>

        <p class="text-sm text-gray-500 mt-2">
          ✅ Support accordéon pour les sous-menus<br />
          ✅ Icônes Heroicons<br />
          ✅ Active state automatique<br />
          ✅ Dark theme intégré
        </p>
      </div>

      <!-- NavigationNavbar -->
      <div>
        <h2 class="text-2xl font-bold text-gray-800 mb-4">NavigationNavbar</h2>
        <p class="text-gray-600 mb-6">Barre de navigation responsive</p>

        <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <NavigationNavbar
            title="Page d'Exemple"
            subtitle="Sous-titre de la page"
            @toggle-mobile-menu="mobileMenuOpen = !mobileMenuOpen"
          >
            <template #actions>
              <UButton icon="i-heroicons-bell" color="primary" variant="soft" />
              <UButton icon="i-heroicons-user" color="gray" variant="ghost" />
            </template>
          </NavigationNavbar>
        </div>

        <p class="text-sm text-gray-500 mt-2">
          ✅ Responsive avec menu mobile<br />
          ✅ Actions customisables<br />
          ✅ Breadcrumb automatique<br />
          ✅ Toggle mobile menu intégré
        </p>
      </div>

      <!-- NavigationSidebarMobile -->
      <div>
        <h2 class="text-2xl font-bold text-gray-800 mb-4">NavigationSidebarMobile</h2>
        <p class="text-gray-600 mb-6">
          Sidebar mobile (slideover) avec même contenu que la sidebar desktop
        </p>

        <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p class="text-sm text-gray-600 mb-4">
            💡 <strong>Testez le mobile sidebar :</strong> Cliquez sur le bouton hamburger dans la
            navbar ci-dessus
          </p>

          <div class="flex gap-4">
            <UButton
              @click="mobileMenuOpen = true"
              icon="i-heroicons-bars-3"
              label="Ouvrir Mobile Sidebar"
              color="primary"
            />
            <UButton
              @click="mobileMenuOpen = false"
              icon="i-heroicons-x-mark"
              label="Fermer"
              color="gray"
              variant="outline"
            />
          </div>
        </div>

        <p class="text-sm text-gray-500 mt-2">
          ✅ Slideover animation<br />
          ✅ Même contenu que sidebar desktop<br />
          ✅ Overlay avec fermeture<br />
          ✅ Responsive automatique
        </p>
      </div>

      <!-- Code Examples -->
      <div>
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Code Examples</h2>

        <div class="space-y-6">
          <!-- Sidebar -->
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-3">NavigationSidebar</h3>
            <pre
              class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"
            ><code>&lt;NavigationSidebar
  logo="/logo.png"
  app-name="NxPay"
  :links="menuLinks"
&gt;
  &lt;template #footer&gt;
    &lt;div&gt;© 2025 NxPay&lt;/div&gt;
  &lt;/template&gt;
&lt;/NavigationSidebar&gt;</code></pre>
          </div>

          <!-- Navbar -->
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-3">NavigationNavbar</h3>
            <pre
              class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"
            ><code>&lt;NavigationNavbar
  title="Dashboard"
  subtitle="Vue d'ensemble"
  @toggle-mobile-menu="toggleMenu"
&gt;
  &lt;template #actions&gt;
    &lt;NotificationCenter /&gt;
  &lt;/template&gt;
&lt;/NavigationNavbar&gt;</code></pre>
          </div>

          <!-- Link -->
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-3">NavigationLink</h3>
            <pre
              class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"
            ><code>&lt;NavigationLink
  icon="heroicons:users"
  title="Utilisateurs"
  :children="[
    { title: 'Liste', route_link: '/users' },
    { title: 'Créer', route_link: '/users/create' }
  ]"
/&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
