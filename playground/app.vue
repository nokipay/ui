<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">UI Library Playground</h1>
      
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Button Component</h2>
        
        <div class="space-y-4">
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-2">Variants</h3>
            <div class="flex gap-4">
              <Button variant="primary" @click="handleClick">Primary</Button>
              <Button variant="secondary" @click="handleClick">Secondary</Button>
              <Button variant="outline" @click="handleClick">Outline</Button>
            </div>
          </div>
          
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-2">Sizes</h3>
            <div class="flex items-center gap-4">
              <Button size="sm" @click="handleClick">Small</Button>
              <Button size="md" @click="handleClick">Medium</Button>
              <Button size="lg" @click="handleClick">Large</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const handleClick = (event: MouseEvent) => {
  console.log('Button clicked!', event)
}
</script>