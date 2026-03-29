import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const connectionString = process.env.DATABASE_URL
const useSsl = process.env.DB_SSL === 'true' || connectionString?.includes('render.com')

export const pool = new Pool(
  connectionString
    ? {
        connectionString,
        ssl: useSsl ? { rejectUnauthorized: false } : false
      }
    : undefined
)
