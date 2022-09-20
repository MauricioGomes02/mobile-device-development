import difficultyEnum from "../enums/difficultyEnum";
import shuffle from '../helpers/shuffle'
import { CardModel } from "../models/CardModel";

const pathCardImagesEasyDifficulty = [
  "https://static8.depositphotos.com/1001599/839/v/600/depositphotos_8394729-stock-illustration-cartoon-character-turtle.jpg",
  "https://static4.depositphotos.com/1000410/303/v/600/depositphotos_3036055-stock-illustration-rabbit.jpg",
  "https://static6.depositphotos.com/1157310/657/v/600/depositphotos_6576818-stock-illustration-cute-ram-sheep-farm-animal.jpg",
  "https://static6.depositphotos.com/1000792/565/v/600/depositphotos_5655920-stock-illustration-funny-cartoon-raccoon.jpg",
  "https://static6.depositphotos.com/1157310/657/v/600/depositphotos_6576525-stock-illustration-cute-chameleon-vector-illustration.jpg",
  "https://static4.depositphotos.com/1001911/356/v/600/depositphotos_3565999-stock-illustration-presenting-parrot.jpg"
]

const pathCardImagesMediumDifficulty = [
  ...pathCardImagesEasyDifficulty,
  "https://static7.depositphotos.com/1008244/718/v/600/depositphotos_7180949-stock-illustration-hilarious-cartoon-giraffe.jpg",
  "https://static4.depositphotos.com/1000792/348/v/600/depositphotos_3487363-stock-illustration-baby-crocodile.jpg",
  "https://st3.depositphotos.com/1000410/14324/v/600/depositphotos_143249815-stock-illustration-cute-cat-cartoon-character.jpg",
  "https://static7.depositphotos.com/1001599/793/v/600/depositphotos_7932880-stock-illustration-cartoon-character-locust.jpg"
]

const pathCardImagesHardDifficulty = [
  ...pathCardImagesMediumDifficulty,
  "https://st2.depositphotos.com/1000410/5282/v/600/depositphotos_52824199-stock-illustration-happy-blue-cow.jpg",
  "https://st3.depositphotos.com/1000410/14324/v/600/depositphotos_143249957-stock-illustration-cute-cat-cartoon-character.jpg",
  "https://static8.depositphotos.com/1000410/901/v/600/depositphotos_9018235-stock-illustration-red-fox-cartoon.jpg",
  "https://static6.depositphotos.com/1157310/657/v/600/depositphotos_6576770-stock-illustration-cute-mouse-vector-illustration.jpg",
  "https://st.depositphotos.com/2400497/2988/v/600/depositphotos_29883819-stock-illustration-cartoon-fox.jpg"
]

export default function createCards(difficultyInput) {
  switch (difficultyInput) {
    case difficultyEnum.easy:
      return createCardsEasyDifficulty()
    case difficultyEnum.medium:
      return createCardsMediumDifficulty()
    case difficultyEnum.hard:
      return createCardsHardDifficulty()
    default:
      return createCardsEasyDifficulty()
  }
}

function createCardsEasyDifficulty() {
  let id = 0
  const cards = []

  pathCardImagesEasyDifficulty.forEach((uriImage) => {
    cards.push(new CardModel(id, uriImage))
    id++
    cards.push(new CardModel(id, uriImage))
    id++
  })

  return shuffle(cards)
}

function createCardsMediumDifficulty() {
  let id = 0
  const cards = []

  pathCardImagesMediumDifficulty.forEach((pathCardImage) => {
    cards.push(new CardModel(id, pathCardImage))
    id++
    cards.push(new CardModel(id, pathCardImage))
    id++
  })

  return shuffle(cards)
}

function createCardsHardDifficulty() {
  let id = 0
  const cards = []

  pathCardImagesHardDifficulty.forEach((pathCardImage) => {
    cards.push(new CardModel(id, pathCardImage))
    id++
    cards.push(new CardModel(id, pathCardImage))
    id++
  })

  return shuffle(cards)
}