interface Props {
  acceptFormats?: string[]
  maxSize?: number
  multiple?: boolean
  placeholder?: string
  previewSize?: string
  showPreview?: boolean
}
type __VLS_Props = Props
type __VLS_PublicProps = __VLS_Props & {
  modelValue?: File | File[] | null
}
declare const _default: import('vue').DefineComponent<
  __VLS_PublicProps,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {
    'update:modelValue': (value: File | File[] | null | undefined) => any
  },
  string,
  import('vue').PublicProps,
  Readonly<__VLS_PublicProps> &
    Readonly<{
      'onUpdate:modelValue'?: ((value: File | File[] | null | undefined) => any) | undefined
    }>,
  {
    acceptFormats: string[]
    maxSize: number
    multiple: boolean
    placeholder: string
    previewSize: string
    showPreview: boolean
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
export default _default
