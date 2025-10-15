import { type ButtonColor, type ButtonShadowType } from '../../utils/constants/buttonStyles.js'
interface ButtonProps {
  label: string
  icon?: string
  type?: 'button' | 'submit' | 'reset'
  color?: ButtonColor
  variant?: 'outline' | 'solid'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  onClick?: () => void
  shadowType?: ButtonShadowType
}
declare const _default: import('vue').DefineComponent<
  ButtonProps,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {},
  string,
  import('vue').PublicProps,
  Readonly<ButtonProps> & Readonly<{}>,
  {},
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
