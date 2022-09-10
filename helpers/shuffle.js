export default function shuffle(array) {
  let index = array.length

  while (index) {
    const randomIndex = getRandomValue(index)
    index--
    [ array[index], array[randomIndex] ] = [ array[randomIndex], array[index] ]
  }

  return array
}

function getRandomValue(maxValue) {
  return Math.floor(Math.random() * maxValue)
}