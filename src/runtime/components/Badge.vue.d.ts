interface Props {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'soft' | 'outline'
  className?: string
  label?: string
  customSize?: string
  color?:
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'default'
    | 'purple'
    | 'pink'
    | 'orange'
    | 'teal'
    | 'gray'
    | 'red'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'indigo'
    | 'violet'
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
  fontStyle?: 'normal' | 'italic'
  showEmpty?: boolean
}
declare const _default: import('vue').DefineComponent<
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
    size: 'sm' | 'md' | 'lg'
    variant: 'solid' | 'soft' | 'outline'
    className: string
    label: string
    customSize: string
    color:
      | 'success'
      | 'warning'
      | 'error'
      | 'info'
      | 'default'
      | 'purple'
      | 'pink'
      | 'orange'
      | 'teal'
      | 'gray'
      | 'red'
      | 'yellow'
      | 'green'
      | 'blue'
      | 'indigo'
      | 'violet'
    fontWeight: 'normal' | 'medium' | 'semibold' | 'bold'
    fontStyle: 'normal' | 'italic'
    showEmpty: boolean
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
