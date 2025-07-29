import { cn } from '@/utils/cn'

type ButtonProps = {
  onClick?: (...args: any[]) => void
  children: string
  buttonType?: 'submit' | 'reset' | 'button'
  disabled?: boolean
}

const Button = ({ onClick, children, buttonType, disabled }: ButtonProps) => {
  return (
    <button
      type={buttonType}
      className={cn(
        'border-0 rounded-lg bg-pink text-white px-2.5 py-1.5 font-semibold cursor-pointer transition-colors duration-200 ease-in-out hover:bg-dark-pink',
        { 'opacity-50 cursor-not-allowed hover:bg-pink': disabled }
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
