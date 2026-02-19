import { pool } from "../database/pgClient.ts";

export async function autoBanUser(userId: string, reason: string) {
    try {
        const query = `
            INSERT INTO banned_users (userId, reason, banned_at)
            VALUES ($1, $2, NOW())
            ON CONFLICT (userId) DO UPDATE SET reason = EXCLUDED.reason, banned_at = EXCLUDED.banned_at
        `;
        await pool.query(query, [userId, reason]);

        const query1 = `
            DELETE FROM users WHERE userId = $1
        `;
        await pool.query(query1, [userId]);
        console.log(`User ${userId} banned successfully for reason: ${reason}`);
    }
    catch (err) {
        console.error(`Error banning user ${userId}:`, err);
    }
}