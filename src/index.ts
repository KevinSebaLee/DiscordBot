import { Client, Intents } from "discord.js"
import 'dotenv/config';
import { handleAutoRegisterUser } from "./events/auto-register-users.js";

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.MESSAGE_CONTENT
    ],
})

async function main() {
    try{
         client.login(process.env.TOKEN)   

         client.on('guildMemberAdd', async (member) => {
            const user = member.user;
            const createdAt = user.createdAt;
            const isBot = user.bot;
            const iconUrl = user.displayAvatarURL();
            const userId = user.id;
            const discriminator = user.discriminator;

            await handleAutoRegisterUser(userId, user.username, discriminator, iconUrl, isBot, createdAt);
        });
    }
    catch(err){
        console.error('Error logging in:', err);
    }
}

main()