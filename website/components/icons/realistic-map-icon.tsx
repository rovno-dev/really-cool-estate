import * as React from "react"
import { Icon, type IconProps } from "./icon"

const RealisticMapIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = 24, ...props }, ref) => {
    return (
      <Icon ref={ref} size={size} viewBox="0 0 24 24" className={className} {...props}>
        <defs>
          <clipPath id="mapCircleClip">
            <circle cx="12" cy="12" r="11" />
          </clipPath>
        </defs>

        <circle cx="12" cy="12" r="11" fill="#FFFFFF" />

        <g clipPath="url(#mapCircleClip)">
          <path d="M1 10.5C4.5 4.5, 9.5 3.5, 14 7L13 1L1 1Z" fill="#9CD852" />
          <path d="M13 1H23V8C19.5 9, 17 6, 14 1Z" fill="#8ACB45" />
          <path d="M1 10.5C4.5 11.5, 9.5 14, 10.5 23H1Z" fill="#8ACB45" />
          <path d="M10.5 23C14 17, 17.5 18, 23 15.5V23Z" fill="#9CD852" />
          <path d="M23 8C20.5 9, 19 11.5, 23 15.5Z" fill="#8ACB45" />

          <path d="M4.5 1V7" stroke="#F4F4F4" strokeWidth="0.5" />
          <path d="M19.5 1V6" stroke="#F4F4F4" strokeWidth="0.5" />
          <path d="M1 17L8 18" stroke="#F4F4F4" strokeWidth="0.5" />

          <path
            d="M15.5 23L20.5 13.5L18 1"
            stroke="#7BC3FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M1 12C8 12, 15.5 8.5, 20.5 3.5"
            stroke="#5CAEFF"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        <circle cx="12" cy="12" r="11" stroke="#E6E6E6" strokeWidth="0.5" />
      </Icon>
    )
  }
)

export default RealisticMapIcon;