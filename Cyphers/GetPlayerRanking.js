import axios from 'axios';
import config from '../config';

const getPlayerRanking = async (discordMessage) => {
  const offset = undefined;
  const limit = undefined;

  const getPlayerRankingUrl = `https://api.neople.co.kr/cy/ranking/ratingpoint?playerId=&offset=${offset}&limit=${limit}&apikey=${config.cyphersToken}`


  const res = await axios.get(getPlayerRankingUrl);

  let replyText = `
  `

  if(res.data) {
    console.log(res.data);
    res.data.rows.forEach((data) => {
      replyText += `
        > ${data.rank}등
        **${data.nickname}** / **${data.ratingPoint}점** / **${data.grade}급** / **${data.clanName}**
      `
    })
    discordMessage.reply(replyText);
  }
}

export default getPlayerRanking;