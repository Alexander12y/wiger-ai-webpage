import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

// Seed uses the direct connection (not the pooler) so DIRECT_URL is preferred
const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? ''
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  const username = process.env.SEED_ADMIN_USERNAME ?? 'admin'
  const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@wiger.ai'
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'Wiger2025!'

  const existing = await prisma.adminUser.findUnique({ where: { username } })
  if (existing) {
    console.log(`Admin user "${username}" already exists — skipping seed.`)
    return
  }

  const passwordHash = await bcrypt.hash(password, 12)

  const user = await prisma.adminUser.create({
    data: {
      username,
      email,
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  })

  console.log(`Created SUPER_ADMIN: ${user.username} (${user.email})`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
