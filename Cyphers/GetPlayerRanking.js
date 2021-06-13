import axios from 'axios';
import config from '../config';

const getPlayerRanking = async (discordMessage) => {
  const offset = undefined;
  const limit = undefined;

  const getPlayerRankingUrl = `https://api.neople.co.kr/cy/ranking/ratingpoint?playerId=&offset=${offset}&limit=${limit}&apikey=${config.cyphersToken}`


  const res = await axios.get(getPlayerRankingUrl);

  if(res.data) {
    discordMessage.reply();
  }
}

export default getPlayerRanking;