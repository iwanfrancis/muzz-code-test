import { cn } from '@/utils/cn'
import { forwardRef } from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'border-0  rounded-lg bg-pink text-white px-2.5 py-1.5 font-semibold cursor-pointer transition-colors duration-200 ease-in-out hover:bg-dark-pink',
          { 'opacity-50 cursor-not-allowed hover:bg-pink': disabled },
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)

export default Button
