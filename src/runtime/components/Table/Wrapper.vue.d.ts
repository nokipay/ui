declare var __VLS_1: {}, __VLS_19: {}
type __VLS_Slots = {} & {
  header?: (props: typeof __VLS_1) => any
} & {
  table?: (props: typeof __VLS_19) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    searchQuery: {
      type: StringConstructor
      default: string
    }
    page: {
      type: NumberConstructor
      default: number
    }
    pageCount: {
      type: NumberConstructor
      default: number
    }
    totalCount: {
      type: NumberConstructor
      default: number
    }
    totalLabel: {
      type: StringConstructor
      default: string
    }
    searchPlaceholder: {
      type: StringConstructor
      default: string
    }
  }>,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  any,
  string,
  import('vue').PublicProps,
  any,
  {
    pageCount: number
    page: number
    searchQuery: string
    totalCount: number
    totalLabel: string
    searchPlaceholder: string
  },
  {},
  {},
  {},
  string,
  import('vue').ComponentProvideOptions,
  true,
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
