import Discord from 'discord.js'
import config from './config';
import getPlayer from './Cyphers/GetPlayer';
import getPlayerRanking from './Cyphers/GetPlayerRanking';
const client = new Discord.Client(); 

client.on("ready", () => { 
    console.log(`${client.user.tag} 봇에 로그인 하였습니다!`); 
});

client.on("message", async (msg) => {

    const commandList = msg.content.split(' ');
    
    if (commandList[0] === "!정보") {
        if(!commandList[1]) {
            msg.reply("닉네임을 제대로 입력해주세요!");
        }
        getPlayer(commandList[1], msg);
    }

    if(commandList[0] === "!통랭") {
        getPlayerRanking(msg);
    }
});

client.login(config.botToken); 
