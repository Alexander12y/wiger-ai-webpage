'use client'

export function VideoBackground() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover z-10"
    >
      <source src="/videos/hero-background.mp4" type="video/mp4" />
    </video>
  )
}