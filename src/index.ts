import { Client, GatewayIntentBits } from "discord.js"
import "dotenv/config"
import { handleAutoRegisterUser } from "./events/auto-register-users.js"

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ],
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`)
})

client.on("guildMemberAdd", async (member) => {
    const user = member.user
    const createdAt = user.createdAt
    const isBot = user.bot
    const iconUrl = user.displayAvatarURL()
    const userId = user.id
    const discriminator = user.discriminator

    await handleAutoRegisterUser(userId, user.username, discriminator, iconUrl, isBot, createdAt)
})

client.login(process.env.TOKEN).catch((err) => {
    console.error("Error logging in:", err)
})
