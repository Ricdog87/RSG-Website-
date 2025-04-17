"use client"

import Image from "next/image"
import { useState } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 90,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  // Check if the image is from Cloudinary
  const isCloudinaryImage = src.includes("res.cloudinary.com")

  // For non-Cloudinary images, convert PNG/JPG URLs to WebP if not already WebP
  const webpSrc = !isCloudinaryImage && !src.endsWith(".webp") ? src.replace(/\.(png|jpe?g)$/i, ".webp") : src

  return (
    <div className={`relative ${className || ""} ${isLoading ? "animate-pulse bg-white/5" : ""}`}>
      <Image
        src={webpSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={`transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
        onLoadingComplete={() => setIsLoading(false)}
        loading={priority ? "eager" : "lazy"}
        fill={!width || !height}
        quality={quality}
      />
    </div>
  )
}
