import { SelectHTMLAttributes, ReactNode, forwardRef } from "react";

interface TextSelectPropsType extends SelectHTMLAttributes<HTMLSelectElement> {
  isInvalid ?: boolean
  icon ?: ReactNode
}

const Select = forwardRef<HTMLSelectElement, TextSelectPropsType>(({isInvalid = false , icon = null,...props},ref) => {
  return (
    <div className={`border-solid flex items-center justify-between border ${isInvalid ? 'border-red-500' : 'border-zinc-200 '} rounded-lg p-3`}>
      <select {...props}  ref={ref} className="bg-transparent border-none w-full text-md text-zinc-700 font-normal outline-none" />
      { icon && icon }
    </div>
  )
})

export { Select }