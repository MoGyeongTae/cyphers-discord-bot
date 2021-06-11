import axios from 'axios';
import config from '../config';

const getPlayer = async (nickname, discordMessage) => {
  const encodedNickname = encodeURI(nickname);

  const getPlayerBasicInfoUrl = `https://api.neople.co.kr/cy/players?nickname=${encodedNickname}&wordType=match&apikey=${config.cyphersToken}`;

  const basicInfoRes = await axios.get(getPlayerBasicInfoUrl)

  console.log(basicInfoRes.data.rows[0]);

  if(basicInfoRes.data.rows && basicInfoRes.data.rows[0]) {
    const playerInfo = basicInfoRes.data.rows[0];

    const getPlayerMoreInfoUrl = `https://api.neople.co.kr/cy/players/${playerInfo.playerId}?apikey=${config.cyphersToken}`;

    const moreInfoRes = await axios.get(getPlayerMoreInfoUrl);

    // More Info Structure
    // {
    //   "playerId" : "",
    //   "nickname" : "",
    //   "grade" : ,
    //   "clanName" : "",
    //   "ratingPoint" : ,
    //   "maxRatingPoint" : ,
    //   "tierName" : "",
    //   "records" : [ {
    //     "gameTypeId" : "",
    //     "winCount" : ,
    //     "loseCount" : ,
    //     "stopCount" : 
    //   }, {
    //     "gameTypeId" : "",
    //     "winCount" : ,
    //     "loseCount" : ,
    //     "stopCount" : 
    //   } ]
    // }

    console.log(moreInfoRes.data);

    if(moreInfoRes.data) {
      const playerData = moreInfoRes.data;

      discordMessage.reply(`
        > 닉네임
        **${playerData.nickname}**
        > 급수
        **${playerData.grade}급**
        > 클랜
        **${playerData.clanName}**
        > 티어
        **${playerData.tierName}(현 : ${playerData.ratingPoint}점) (탑레 : ${playerData.maxRatingPoint}점)**
      `);
    }
  }
}

export default getPlayer;