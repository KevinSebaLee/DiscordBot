import "dotenv/config"
import pg from "pg"

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
})

pool.connect()
    .then((client) => {
        console.log("PostgreSQL connection successful!")
        client.release()
    })
    .catch((err) => {
        console.error("PostgreSQL connection failed:", (err as Error).message)
    })

export default pool
