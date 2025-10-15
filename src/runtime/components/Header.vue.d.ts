interface Badge {
  label: string
  class?: string
}
interface StatusBadgeProps {
  status: string | number | boolean | null | undefined
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'soft' | 'outline'
  className?: string
}
interface Props {
  title: string
  subtitle?: string
  icon?: string
  badge?: Badge
  statusBadge?: StatusBadgeProps
  titleSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  subtitleSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}
declare var __VLS_1: {}, __VLS_7: {}, __VLS_17: {}
type __VLS_Slots = {} & {
  left?: (props: typeof __VLS_1) => any
} & {
  extra?: (props: typeof __VLS_7) => any
} & {
  right?: (props: typeof __VLS_17) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  Props,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {},
  string,
  import('vue').PublicProps,
  Readonly<Props> & Readonly<{}>,
  {
    titleSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
    subtitleSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  },
  {},
  {},
  {},
  string,
  import('vue').ComponentProvideOptions,
  false,
  {},
  any
>
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>
export default _default
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S
  }
}
