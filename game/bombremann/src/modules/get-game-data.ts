export default () => {
  const data = localStorage.getItem('game_data')
  if(data)
    return JSON.parse(data)
  return null
}