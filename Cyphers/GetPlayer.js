import axios from 'axios';
import config from '../config';
import getWinRate from '../Util/getWinRate';

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

      const rankInfo = playerData.records.find((record) => record.gameTypeId === "rating");
      const rankWinRate = getWinRate((rankInfo.winCount + rankInfo.loseCount), rankInfo.winCount);

      const normalInfo = playerData.records.find((record) => record.gameTypeId === "normal");
      const normalWinRate = getWinRate((normalInfo.winCount + normalInfo.loseCount), normalInfo.winCount);

      discordMessage.reply(`
        > 닉네임
        **${playerData.nickname}**
        > 급수
        **${playerData.grade}급**
        > 클랜
        **${playerData.clanName || '클랜 없음'}**
        > 티어
        **${playerData.tierName || "언랭딱"}(현 : ${playerData.ratingPoint || 0}점) (탑레 : ${playerData.maxRatingPoint || 0}점)**

        > 공식전 전적
        **${rankInfo.winCount}승 ${rankInfo.loseCount}패 ${rankInfo.stopCount}중단 승률 ${rankWinRate}%**
        > 일반전 전적
        **${normalInfo.winCount}승 ${normalInfo.loseCount}패 ${normalInfo.stopCount}중단 승률 ${normalWinRate}%**
      `);
    }
  }
}

export default getPlayer;