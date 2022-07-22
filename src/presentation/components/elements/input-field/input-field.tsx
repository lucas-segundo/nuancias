import { InputHTMLAttributes } from 'react'

export type InputFieldProps = {
  label: string
  isBorderOnlyBottom?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export const InputField = ({
  label = 'Input Field',
  isBorderOnlyBottom,
  ...props
}: InputFieldProps) => {
  const css = Array<string>()
  props.className && css.push(props.className)
  isBorderOnlyBottom
    ? css.push('border-b border-cyan-500')
    : css.push('mt-2 border border-cyan-500 rounded')

  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="font-medium">
        {label}
      </label>
      <input
        id={label}
        {...props}
        className={`${css.join(' ')} h-10 px-1 bg-white`}
      />
    </div>
  )
}
