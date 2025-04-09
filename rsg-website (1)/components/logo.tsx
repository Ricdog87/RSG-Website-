import Image from "next/image"
import type React from "react"

export function Logo({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={className} {...props}>
      <Image
        src="/images/RSG-logo.jpeg"
        alt="RSG Recruiting Solutions Group Logo"
        width={120}
        height={60}
        className="h-auto w-auto"
      />
    </div>
  )
}
