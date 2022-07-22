import { ButtonHTMLAttributes } from 'react'

export type ButtonProps = {
  isOutline?: boolean
  isLoading?: boolean
  text?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  isLoading,
  isOutline,
  text = 'Button',
  ...props
}: ButtonProps) => {
  const css = []
  props.className && css.push(props.className)

  isLoading && (props.disabled = true)

  props.disabled && css.push('cursor-not-allowed opacity-50')

  !isOutline
    ? css.push('text-white bg-cyan-500')
    : css.push('text-black bg-white')

  const cssClass = css.join(' ')

  return (
    <button
      {...props}
      className={`${cssClass} text-sm p-2 min-w-80 border border-cyan-500 rounded-md`}
    >
      {text}
    </button>
  )
}
