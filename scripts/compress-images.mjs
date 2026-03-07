/**
 * One-time image compression script.
 * Converts large JPG/PNG section images to WebP and outputs to /public/optimized/.
 * Run with: node scripts/compress-images.mjs
 */

import sharp from 'sharp'
import { mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const inputDir = join(root, 'public')
const outputDir = join(root, 'public', 'optimized')

const images = [
  { file: 'manufactura_industria.jpg',  quality: 62, maxWidth: 1920 },
  { file: 'transportation.jpg',         quality: 62, maxWidth: 1920 },
  { file: 'AI_automation_image.png',    quality: 65, maxWidth: 1920 },
  { file: 'shaking_hands.png',          quality: 65, maxWidth: 1920 },
  { file: 'distribucion_industria.jpg', quality: 62, maxWidth: 1920 },
  { file: 'field_service.jpg',          quality: 62, maxWidth: 1920 },
  { file: 'retial_industria.jpg',       quality: 62, maxWidth: 1920 },
  { file: 'manufactura.jpg',            quality: 62, maxWidth: 1920 },
  { file: 'redes_fisicas.jpg',          quality: 62, maxWidth: 1920 },
  { file: 'construccion_industria.jpg', quality: 62, maxWidth: 1920 },
]

if (!existsSync(outputDir)) {
  await mkdir(outputDir, { recursive: true })
}

for (const { file, quality, maxWidth } of images) {
  const inputPath = join(inputDir, file)
  const outputName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  const outputPath = join(outputDir, outputName)

  if (!existsSync(inputPath)) {
    console.warn(`  SKIP  ${file} (not found)`)
    continue
  }

  try {
    const info = await sharp(inputPath)
      .resize(maxWidth, undefined, { withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(outputPath)

    const inputStat = (await import('fs')).statSync(inputPath)
    const savings = ((1 - info.size / inputStat.size) * 100).toFixed(1)
    console.log(`  OK    ${file} → optimized/${outputName}  (${(inputStat.size / 1024 / 1024).toFixed(1)}MB → ${(info.size / 1024).toFixed(0)}KB, -${savings}%)`)
  } catch (err) {
    console.error(`  ERROR ${file}:`, err.message)
  }
}

console.log('\nDone. Update component image paths to /optimized/*.webp')
