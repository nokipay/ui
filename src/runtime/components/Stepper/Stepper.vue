<script setup lang="ts">
import { computed } from 'vue'

export interface Step {
  label: string
  description?: string
  icon?: string
  status?: 'pending' | 'current' | 'completed' | 'error'
}

type Orientation = 'horizontal' | 'vertical'

interface Props {
  /** Étapes du stepper */
  steps: Step[]
  /** Étape active (0-based) */
  currentStep: number
  /** Orientation */
  orientation?: Orientation
  /** Clickable steps */
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
  clickable: false,
})

const emit = defineEmits<{
  'step-click': [index: number]
}>()

const stepsWithStatus = computed(() => {
  return props.steps.map((step, index) => {
    if (step.status) return step
    
    if (index < props.currentStep) {
      return { ...step, status: 'completed' as const }
    } else if (index === props.currentStep) {
      return { ...step, status: 'current' as const }
    } else {
      return { ...step, status: 'pending' as const }
    }
  })
})

const handleStepClick = (index: number) => {
  if (props.clickable) {
    emit('step-click', index)
  }
}
</script>

<template>
  <div
    :class="[
      'stepper',
      orientation === 'vertical' ? 'stepper-vertical' : 'stepper-horizontal'
    ]"
  >
    <div
      v-for="(step, index) in stepsWithStatus"
      :key="index"
      :class="[
        'stepper-step',
        {
          'stepper-step-clickable': clickable,
          'stepper-step-completed': step.status === 'completed',
          'stepper-step-current': step.status === 'current',
          'stepper-step-error': step.status === 'error',
        }
      ]"
      @click="handleStepClick(index)"
    >
      <!-- Step circle -->
      <div class="stepper-circle-container">
        <div
          :class="[
            'stepper-circle',
            {
              'stepper-circle-completed': step.status === 'completed',
              'stepper-circle-current': step.status === 'current',
              'stepper-circle-error': step.status === 'error',
              'stepper-circle-pending': step.status === 'pending',
            }
          ]"
        >
          <UIcon
            v-if="step.status === 'completed'"
            name="i-heroicons-check"
            class="w-5 h-5"
          />
          <UIcon
            v-else-if="step.status === 'error'"
            name="i-heroicons-x-mark"
            class="w-5 h-5"
          />
          <UIcon
            v-else-if="step.icon"
            :name="step.icon"
            class="w-5 h-5"
          />
          <span v-else>{{ index + 1 }}</span>
        </div>
        
        <!-- Connector line -->
        <div
          v-if="index < steps.length - 1"
          :class="[
            'stepper-line',
            orientation === 'vertical' ? 'stepper-line-vertical' : 'stepper-line-horizontal',
            {
              'stepper-line-completed': step.status === 'completed',
            }
          ]"
        />
      </div>
      
      <!-- Step content -->
      <div class="stepper-content">
        <div
          :class="[
            'stepper-label',
            {
              'stepper-label-current': step.status === 'current',
              'stepper-label-completed': step.status === 'completed',
            }
          ]"
        >
          {{ step.label }}
        </div>
        
        <div
          v-if="step.description"
          class="stepper-description"
        >
          {{ step.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stepper {
  display: flex;
  width: 100%;
}

.stepper-horizontal {
  flex-direction: row;
  align-items: flex-start;
}

.stepper-vertical {
  flex-direction: column;
}

.stepper-step {
  display: flex;
  flex: 1;
  position: relative;
}

.stepper-horizontal .stepper-step {
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stepper-vertical .stepper-step {
  flex-direction: row;
  align-items: flex-start;
  padding-bottom: 2rem;
}

.stepper-step-clickable {
  cursor: pointer;
}

.stepper-step-clickable:hover .stepper-circle {
  transform: scale(1.1);
}

.stepper-circle-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stepper-vertical .stepper-circle-container {
  flex-direction: column;
  margin-right: 1rem;
}

.stepper-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s;
  z-index: 1;
}

.stepper-circle-pending {
  background: #e5e7eb;
  color: #6b7280;
}

.stepper-circle-current {
  background: #77F07F;
  color: white;
  box-shadow: 0 0 0 4px rgba(119, 240, 127, 0.2);
}

.stepper-circle-completed {
  background: #77F07F;
  color: white;
}

.stepper-circle-error {
  background: #ef4444;
  color: white;
}

.stepper-line {
  position: absolute;
  background: #e5e7eb;
  transition: all 0.3s;
}

.stepper-line-horizontal {
  top: 1.25rem;
  left: calc(50% + 1.25rem);
  right: calc(-50% + 1.25rem);
  height: 2px;
  width: calc(100% - 2.5rem);
}

.stepper-line-vertical {
  top: 2.5rem;
  left: 1.25rem;
  width: 2px;
  height: calc(100% - 2.5rem);
}

.stepper-line-completed {
  background: #77F07F;
}

.stepper-content {
  margin-top: 0.75rem;
}

.stepper-vertical .stepper-content {
  margin-top: 0;
  padding-top: 0.375rem;
}

.stepper-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  transition: color 0.2s;
}

.stepper-label-current,
.stepper-label-completed {
  color: #111827;
  font-weight: 600;
}

.stepper-description {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #9ca3af;
}
</style>

