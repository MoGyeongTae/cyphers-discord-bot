import { Client, GuildEmoji, Intents } from 'discord.js'
import config from './config';
const client = new Client({
    intents : [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS]
})

client.on("ready", () => { 
    console.log(`${client.user.tag} 봇에 로그인 하였습니다!`); 
});

client.on('message', async (msg) => {
    console.log(msg);

    const mokokoEmoji = msg.guild.emojis.cache.find(emoji => emoji.name === 'mokokokick');

    const commandList = msg.content.split(' ');
    if (msg.content === `<:mokokokick:${mokokoEmoji.id}>`) {
        if(mokokoEmoji) {
            msg.react(mokokoEmoji)
        } else {
            msg.channel.send('해당 서버에 모코코킥 이모티콘이 없습니다.')
        }
    }
});

client.login(config.botToken); 
