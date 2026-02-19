import pool from "../database/pgClient.js";

export async function autoRegisterUser(userId: string, username: string, discriminator: string, iconUrl: string, is_bot: boolean, created_at: Date) {
    try {
        const query = `
            INSERT INTO users (username, discriminator, icon_url, is_bot, created_at, userId)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (userId) DO NOTHING
        `;
        await pool.query(query, [username, discriminator, iconUrl, is_bot, created_at, userId]);
        console.log(`User ${userId} registered successfully.`);
    } catch (err) {
        console.error(`Error registering user ${userId}:`, err);
    }
}