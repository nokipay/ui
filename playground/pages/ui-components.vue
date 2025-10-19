<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">UI Components</h1>
      <p class="text-gray-600">Phase 2 - Dropdown, Tabs, Tooltip, Avatar, Card</p>
    </div>

    <!-- Dropdown -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Dropdown</h2>
      <p class="text-gray-600 mb-4">Dropdown menus with items and dividers</p>
      
      <div class="flex flex-wrap gap-4">
        <Dropdown label="Actions">
          <DropdownItem icon="i-heroicons-pencil" @click="handleAction('edit')">
            Edit
          </DropdownItem>
          <DropdownItem icon="i-heroicons-document-duplicate" @click="handleAction('duplicate')">
            Duplicate
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem icon="i-heroicons-trash" variant="danger" @click="handleAction('delete')">
            Delete
          </DropdownItem>
        </Dropdown>
        
        <Dropdown label="User Menu" placement="bottom-end">
          <DropdownItem icon="i-heroicons-user">Profile</DropdownItem>
          <DropdownItem icon="i-heroicons-cog-6-tooth">Settings</DropdownItem>
          <DropdownDivider />
          <DropdownItem icon="i-heroicons-arrow-right-on-rectangle">Logout</DropdownItem>
        </Dropdown>
      </div>
    </section>

    <!-- Tabs -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Tabs</h2>
      <p class="text-gray-600 mb-4">Tabbed navigation interface</p>
      
      <TabGroup v-model="activeTab">
        <template #tabs>
          <button
            :class="[
              'px-4 py-2 font-medium transition-colors',
              activeTab === 'profile' ? 'text-nxGreen-600 border-b-2 border-nxGreen-600' : 'text-gray-500 hover:text-gray-700'
            ]"
            @click="activeTab = 'profile'"
          >
            Profile
          </button>
          <button
            :class="[
              'px-4 py-2 font-medium transition-colors',
              activeTab === 'settings' ? 'text-nxGreen-600 border-b-2 border-nxGreen-600' : 'text-gray-500 hover:text-gray-700'
            ]"
            @click="activeTab = 'settings'"
          >
            Settings
          </button>
          <button
            :class="[
              'px-4 py-2 font-medium transition-colors',
              activeTab === 'notifications' ? 'text-nxGreen-600 border-b-2 border-nxGreen-600' : 'text-gray-500 hover:text-gray-700'
            ]"
            @click="activeTab = 'notifications'"
          >
            Notifications
          </button>
        </template>
        
        <TabPanel name="profile" :active="activeTab === 'profile'">
          <div class="p-4 space-y-3">
            <h3 class="text-lg font-semibold">Profile Information</h3>
            <p class="text-gray-600">Manage your profile details here.</p>
          </div>
        </TabPanel>
        
        <TabPanel name="settings" :active="activeTab === 'settings'">
          <div class="p-4 space-y-3">
            <h3 class="text-lg font-semibold">Settings</h3>
            <p class="text-gray-600">Configure your account settings.</p>
          </div>
        </TabPanel>
        
        <TabPanel name="notifications" :active="activeTab === 'notifications'">
          <div class="p-4 space-y-3">
            <h3 class="text-lg font-semibold">Notifications</h3>
            <p class="text-gray-600">Manage your notification preferences.</p>
          </div>
        </TabPanel>
      </TabGroup>
    </section>

    <!-- Tooltip -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Tooltip</h2>
      <p class="text-gray-600 mb-4">Hover tooltips with different placements</p>
      
      <div class="grid grid-cols-3 gap-8 p-8">
        <!-- Top row -->
        <div class="text-center">
          <Tooltip content="Top left tooltip" placement="top-start">
            <button class="px-4 py-2 bg-gray-200 rounded-lg">Top Start</button>
          </Tooltip>
        </div>
        <div class="text-center">
          <Tooltip content="Top tooltip" placement="top">
            <button class="px-4 py-2 bg-gray-200 rounded-lg">Top</button>
          </Tooltip>
        </div>
        <div class="text-center">
          <Tooltip content="Top right tooltip" placement="top-end">
            <button class="px-4 py-2 bg-gray-200 rounded-lg">Top End</button>
          </Tooltip>
        </div>
        
        <!-- Middle row -->
        <div class="text-center">
          <Tooltip content="Left tooltip" placement="left">
            <button class="px-4 py-2 bg-gray-200 rounded-lg">Left</button>
          </Tooltip>
        </div>
        <div class="text-center">
          <button class="px-4 py-2 bg-nxGreen-500 text-white rounded-lg">Hover around</button>
        </div>
        <div class="text-center">
          <Tooltip content="Right tooltip" placement="right">
            <button class="px-4 py-2 bg-gray-200 rounded-lg">Right</button>
          </Tooltip>
        </div>
        
        <!-- Bottom row -->
        <div class="text-center">
          <Tooltip content="Bottom left tooltip" placement="bottom-start">
            <button class="px-4 py-2 bg-gray-200 rounded-lg">Bottom Start</button>
          </Tooltip>
        </div>
        <div class="text-center">
          <Tooltip content="Bottom tooltip" placement="bottom">
            <button class="px-4 py-2 bg-gray-200 rounded-lg">Bottom</button>
          </Tooltip>
        </div>
        <div class="text-center">
          <Tooltip content="Bottom right tooltip" placement="bottom-end">
            <button class="px-4 py-2 bg-gray-200 rounded-lg">Bottom End</button>
          </Tooltip>
        </div>
      </div>
    </section>

    <!-- Avatar -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Avatar</h2>
      <p class="text-gray-600 mb-4">User avatars in different sizes</p>
      
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-3">Sizes</h3>
          <div class="flex items-end gap-4">
            <Avatar
              src="https://i.pravatar.cc/150?img=1"
              alt="User 1"
              size="xs"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=2"
              alt="User 2"
              size="sm"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=3"
              alt="User 3"
              size="md"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=4"
              alt="User 4"
              size="lg"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=5"
              alt="User 5"
              size="xl"
            />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">With Status</h3>
          <div class="flex items-center gap-4">
            <Avatar
              src="https://i.pravatar.cc/150?img=6"
              alt="Online"
              size="lg"
              status="online"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=7"
              alt="Offline"
              size="lg"
              status="offline"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=8"
              alt="Busy"
              size="lg"
              status="busy"
            />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Fallback (Initials)</h3>
          <div class="flex items-center gap-4">
            <Avatar alt="John Doe" size="lg" />
            <Avatar alt="Jane Smith" size="lg" />
            <Avatar alt="Bob Wilson" size="lg" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Avatar Group</h3>
          <AvatarGroup :max="3">
            <Avatar src="https://i.pravatar.cc/150?img=10" alt="User 1" />
            <Avatar src="https://i.pravatar.cc/150?img=11" alt="User 2" />
            <Avatar src="https://i.pravatar.cc/150?img=12" alt="User 3" />
            <Avatar src="https://i.pravatar.cc/150?img=13" alt="User 4" />
            <Avatar src="https://i.pravatar.cc/150?img=14" alt="User 5" />
          </AvatarGroup>
        </div>
      </div>
    </section>

    <!-- Card -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Card</h2>
      <p class="text-gray-600 mb-4">Card components with header and footer</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <template #header>
            <h3 class="text-lg font-semibold">Basic Card</h3>
          </template>
          <p class="text-gray-600">
            This is a basic card component with header and content.
          </p>
          <template #footer>
            <button class="px-4 py-2 bg-nxGreen-500 text-white rounded-lg hover:bg-nxGreen-600">
              Action
            </button>
          </template>
        </Card>
        
        <Card>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">Card with Actions</h3>
              <button class="text-gray-500 hover:text-gray-700">
                <UIcon name="i-heroicons-ellipsis-vertical" class="w-5 h-5" />
              </button>
            </div>
          </template>
          <div class="space-y-2">
            <p class="text-gray-600">Card content goes here</p>
            <ul class="list-disc list-inside text-sm text-gray-500">
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
          </div>
        </Card>
      </div>
    </section>

    <!-- CardStats -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">CardStats</h2>
      <p class="text-gray-600 mb-4">Statistics cards with trends</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardStats
          title="Total Revenue"
          :value="125430"
          icon="i-heroicons-currency-dollar"
          trend="up"
          :trend-value="12.5"
          color="success"
        />
        
        <CardStats
          title="New Users"
          :value="1234"
          icon="i-heroicons-user-group"
          trend="up"
          :trend-value="8.2"
          color="primary"
        />
        
        <CardStats
          title="Transactions"
          :value="89"
          icon="i-heroicons-arrow-trending-up"
          trend="down"
          :trend-value="3.1"
          color="warning"
        />
        
        <CardStats
          title="Active Sessions"
          :value="432"
          icon="i-heroicons-signal"
          trend="up"
          :trend-value="5.7"
          color="info"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('profile')

const handleAction = (action: string) => {
  console.log('Action:', action)
}
</script>

