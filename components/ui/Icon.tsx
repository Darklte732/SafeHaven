import { cn } from "@/lib/utils"
import { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string
  className?: string
}

export const Icon = ({ name, className, ...props }: IconProps) => {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      {...props}
      aria-hidden="true"
    >
      <use href={`/images/icons/${name}.svg#icon`} />
    </svg>
  )
}

export default Icon 