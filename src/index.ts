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
    const { id, username, discriminator, bot, createdAt } = member.user
    await handleAutoRegisterUser(id, username, discriminator, member.user.displayAvatarURL(), bot, createdAt)
})

client.login(process.env.TOKEN).catch((err) => {
    console.error("Error logging in:", err)
})
