import Discord from 'discord.js'
const client = new Discord.Client(); 

client.on("ready", () => { 
    console.log(`${client.user.tag} 봇에 로그인 하였습니다!`); 
});

client.on("message", msg => {
    if (msg.content === "핑") {
        msg.reply("퐁!"); 
    }
});

client.login("ODUyNTM1NzQ5OTQxMTMzMzE0.YMIPyg.HvVGrMlokrWrK-M0D2MX2_N2U2c"); 
