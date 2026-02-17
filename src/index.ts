import { Client, Intents } from "discord.js"
import { config } from "dotenv"

config()

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.MESSAGE_CONTENT
    ],
})

client.login(process.env.TOKEN)

client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`)
})