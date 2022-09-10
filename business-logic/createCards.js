import difficultyEnum from "../enums/difficultyEnum";
import shuffle from '../helpers/shuffle'
import { CardModel } from "../models/CardModel";

const pathCardImagesEasyDifficulty = [
  `${global._basedir}` + "/assets/card-images/",
  `${global._basedir}` + "/assets/card-images/",
  `${global._basedir}` + "/assets/card-images/",
  `${global._basedir}` + "/assets/card-images/",
  `${global._basedir}` + "/assets/card-images/",
  `${global._basedir}` + "/assets/card-images/"
]

const pathCardImagesMediumDifficulty = [
  ...pathCardImagesEasyDifficulty,
  `${global._basedir}` + "/assets/card-images/",
  `${global._basedir}` + "/assets/card-images/",
  `${global._basedir}` + "/assets/card-images/",
  `${global._basedir}` + "/assets/card-images/"
]

const pathCardImagesHardDifficulty = [
  ...pathCardImagesMediumDifficulty,
  `${global._basedir}` + "/assets/card-images/",
  `${global._basedir}` + "/assets/card-images/",
  `${global._basedir}` + "/assets/card-images/",
  `${global._basedir}` + "/assets/card-images/",
  `${global._basedir}` + "/assets/card-images/"
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

  pathCardImagesEasyDifficulty.forEach((pathCardImage) => {
    cards.push(new CardModel(id, pathCardImage))
    id++
    cards.push(new CardModel(id, pathCardImage))
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