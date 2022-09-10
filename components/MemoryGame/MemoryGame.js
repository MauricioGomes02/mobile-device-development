import { View, StyleSheet, useWindowDimensions } from 'react-native'
import createCards from "../../business-logic/createCards";
import { useState, useEffect } from 'react'
import Card from '../Card/Card';
import difficultyEnum from '../../enums/difficultyEnum'

export default function MemoryGame({ difficulty }) {
  //#region States
  const createdCards = createCards(difficulty)
  const [cards, setCards] = useState(createdCards)
  const [attempts, setAttempts] = useState(0)
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [disabled, setDisabled] = useState(false)
  //#endregion

  //#region Collateral Effects
  useEffect(() => {
    if (!(firstChoice && secondChoice)) {
      return
    }

    setDisabled(true)

    if (firstChoice.pathCardImage === secondChoice.pathCardImage) {
      setCards(previousCard => {
        return previousCard.map(card => {
          if (card.pathCardImage === firstChoice.pathCardImage) {
            return { ...card, matched: true }
          }
          return card
        })
      })
    }

    resetChoices()
    increaseAttempts()
    setDisabled(false)
  }, [firstChoice, secondChoice])
  //#endregion

  //#region Logic
  const handleChoice = (card) => {
    if (firstChoice === null) {
      setFirstChoice(card)
    }
    else {
      setSecondChoice(card)
    }
  }

  const resetChoices = () => {
    setTimeout(() => {
      setFirstChoice(null)
      setSecondChoice(null)
    }, 1500)
  }

  const increaseAttempts = () => {
    setAttempts(previousAttempt => previousAttempt++)
  }
  //#endregion

  //#region Styles
  const { width, height } = useWindowDimensions()
  const multiplicationFactor = height / width

  let sizeOfCard

  switch(difficulty) {
    case difficultyEnum.easy:
      sizeOfCard = width * 0.15 * multiplicationFactor
      break
    case difficultyEnum.medium:
      sizeOfCard = width * 0.125 * multiplicationFactor
      break
    case difficultyEnum.hard:
      sizeOfCard = width * 0.095 * multiplicationFactor
      break
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      flexWrap: 'no-wrap',
      backgroundColor: 'yellow'
    },
    cardContainer: {
      flex: 8,
      flexDirection: 'column',
      flexWrap: 'nowrap',
      backgroundColor: 'black'
    },
    rowCardContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    },
    statusGameContainer: {
      flex: 2,
      flexDirection: 'row',
      flexWrap: 'no-wrap',
      backgroundColor: 'red'
    }
  })
  //#endregion

  let count = 0
  const rowComponents = []
  let cardComponents = []

  const createRowComponent = (row) => {
    return (
      <View style={styles.rowCardContainer}>
        {row}
      </View>
    )
  }

  cards.map((card, index) => {
    if (difficulty === difficultyEnum.easy) {
      if (count === 3) {
        rowComponents.push(createRowComponent(cardComponents))
        cardComponents = []
        count = 0
      }
    }

    if (difficulty === difficultyEnum.medium) {
      if (count === 4) {
        rowComponents.push(createRowComponent(cardComponents))
        cardComponents = []
        count = 0
      }
    }

    if (difficulty === difficultyEnum.hard) {
      if (count === 5) {
        rowComponents.push(createRowComponent(cardComponents))
        cardComponents = []
        count = 0
      }
    }

    cardComponents.push(
      <Card 
          card={card}
          handleChoice={handleChoice}
          visible={card === firstChoice || card === secondChoice || card.matched}
          disabled={disabled}
          size={sizeOfCard}
      />
    )

    count++

    if (index === cards.length - 1) {
      rowComponents.push(createRowComponent(cardComponents))
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.statusGameContainer}>
      </View>
      <View style={styles.cardContainer}>
        {rowComponents}
      </View>
    </View>
  )
}