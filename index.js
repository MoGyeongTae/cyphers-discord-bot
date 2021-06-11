const Discord = require('discord.js');
const client = new Discord.Client(); 

client.on("ready", () => { 
    console.log(`${client.user.tag} 봇에 로그인 하였습니다!`); 
});

client.on("message", msg => {
    
    if (msg.content === "!테스트") {
        msg.reply("하이!"); 
    }
});

client.login("토큰"); 
