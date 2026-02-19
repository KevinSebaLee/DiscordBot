import { autoRegisterUser } from "../repositories/auto-register-users.js";

export async function handleAutoRegisterUser(userId: string, username: string, discriminator: string, iconUrl: string, is_bot: boolean, created_at: Date) {
    await autoRegisterUser(userId, username, discriminator, iconUrl, is_bot, created_at);
}
