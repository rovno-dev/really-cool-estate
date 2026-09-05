import * as React from "react"
import { Icon, type IconProps } from "./icon"

const RealisticMapIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = 24, ...props }, ref) => {
    const clipId = React.useId()

    return (
      <Icon
        ref={ref}
        size={size}
        viewBox="0 0 24 24"
        className={className}
        {...props}
      >
        <defs>
          <clipPath id={clipId}>
            <circle cx="12" cy="12" r="11" />
          </clipPath>

          <filter id="softShadow">
            <feDropShadow
              dx="0"
              dy="0.3"
              stdDeviation="0.3"
              floodOpacity="0.12"
            />
          </filter>
        </defs>

        <circle cx="12" cy="12" r="11" fill="#F8F8F8" />

        <g clipPath={`url(#${clipId})`}>

          {/* Land */}
          <rect width="24" height="24" fill="#F4F1EA" />

          {/* Parks */}
          <path
            d="M-2 5C3 2 8 2 12 6C9 8 5 8 -2 9Z"
            fill="#B8DD82"
          />

          <path
            d="M13 13C18 10 22 11 26 15V26H12Z"
            fill="#B4DB79"
          />

          {/* Water */}
          <path
            d="M18 -2L24 -2V26H15C16 18 17 8 18 -2Z"
            fill="#A9D8FF"
          />

          {/* Major road */}
          <g filter="url(#softShadow)">
            <path
              d="M-2 15C5 15 10 12 18 6C21 4 23 3 26 2"
              stroke="#FFF8C9"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </g>

          {/* Road outline */}
          <path
            d="M-2 15C5 15 10 12 18 6C21 4 23 3 26 2"
            stroke="#E9E2A3"
            strokeWidth="0.4"
            fill="none"
          />

          {/* Secondary roads */}
          <path
            d="M8 -2L10 26"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          <path
            d="M3 4L22 20"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="round"
          />

          <path
            d="M15 -2L7 26"
            stroke="#FFFFFF"
            strokeWidth="0.8"
            strokeLinecap="round"
          />

          {/* Buildings */}
          <g opacity="0.45">
            <rect x="5" y="10" width="1.2" height="1.2" rx="0.2" fill="#D7D3CB" />
            <rect x="7" y="12" width="1.4" height="1.4" rx="0.2" fill="#D7D3CB" />
            <rect x="11" y="8" width="1.2" height="1.2" rx="0.2" fill="#D7D3CB" />
            <rect x="14" y="11" width="1.4" height="1.4" rx="0.2" fill="#D7D3CB" />
          </g>

          {/* Subtle pan animation */}
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; -0.6 -0.3; 0 0"
              dur="8s"
              repeatCount="indefinite"
            />
          </g>
        </g>

        <circle
          cx="12"
          cy="12"
          r="11"
          fill="none"
          stroke="#E8E8E8"
          strokeWidth="0.5"
        />
      </Icon>
    )
  }
)

export default RealisticMapIcon;