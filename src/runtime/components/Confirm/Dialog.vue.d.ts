interface PopupAttributes {
  title: string
  message: string
  okButton: string
  cancelButton: any
}
declare const _default: import('vue').DefineComponent<
  {},
  {
    show: (opts: PopupAttributes) => Promise<unknown>
    _confirm: () => void
    _cancel: () => void
  },
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {},
  string,
  import('vue').PublicProps,
  Readonly<{}> & Readonly<{}>,
  {},
  {},
  {},
  {},
  string,
  import('vue').ComponentProvideOptions,
  true,
  {},
  any
>
export default _default
