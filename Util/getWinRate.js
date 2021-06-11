const getWinRate = (play, win) => {
  if(!play || !win) return 0;
  return Math.round(win / play * 100);
}

export default getWinRate;