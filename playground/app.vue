<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 gradient-nxpay rounded-lg"></div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">NxPay UI</h1>
              <p class="text-sm text-gray-500">Component Playground v2.0</p>
            </div>
          </div>
          
          <nav class="flex gap-4">
            <NuxtLink to="/" class="text-gray-600 hover:text-nxGreen-500 transition-colors">
              Home
            </NuxtLink>
            <NuxtLink to="/components" class="text-gray-600 hover:text-nxGreen-500 transition-colors">
              Components
            </NuxtLink>
            <NuxtLink to="/design-tokens" class="text-gray-600 hover:text-nxGreen-500 transition-colors">
              Design Tokens
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="text-center text-gray-500 text-sm">
          <p>&copy; 2025 NxPay UI Library. Les bords arrivent by NxPay Team.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
