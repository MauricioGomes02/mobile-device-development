import { View, StyleSheet, Text, useWindowDimensions } from 'react-native'
import createCards from "../../business-logic/createCards";
import { useState, useEffect } from 'react'
import Card from '../Card/Card';
import difficultyEnum from '../../enums/difficultyEnum'

export default function MemoryGame({ difficulty }) {
  //#region States
  const [cards, setCards] = useState(createCards(difficulty))
  const [attempts, setAttempts] = useState(0)
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [score, setScore] = useState(30)
  const [lost, setLost] = useState(false)
  const [win, setWin] = useState(false)
  const [gamesPlayed, setGamesPlayed] = useState(0)
  const [wins, setWins] = useState(0)
  const [defeats, setDefeats] = useState(0)
  const [matches, setMatches] = useState(0)
  const [totalMatches, setTotalMatches] = useState(cards.length / 2)
  const [bestScore, setBestScore] = useState(0)
  //#endregion

  //#region Collateral Effects
  useEffect(() => {
    if (!(firstChoice && secondChoice)) {
      return
    }

    setDisabled(true)

    if (firstChoice.uriImage === secondChoice.uriImage) {
      setScore(previousScore => previousScore + 20)
      setMatches(previousMatches => previousMatches + 1)
      setCards(previousCard => {
        return previousCard.map(card => {
          if (card.uriImage === firstChoice.uriImage) {            
            return { ...card, matched: true }
          }
          return card
        })
      })
      resetChoices()
      increaseAttempts()
      setDisabled(false)
      return
    }

    if (score === 0) {
      setLost(true)
      return
    }    

    setTimeout(() => {
      resetChoices()
      increaseAttempts()
      setScore(previousScore => previousScore - 5)
      setDisabled(false)
    }, 500)
  }, [firstChoice, secondChoice])

  useEffect(() => {
    if (lost || win) {
      setCards(createCards(difficulty))
      setDisabled(false)
      setAttempts(0)
      setFirstChoice(null)
      setSecondChoice(null)      
      setGamesPlayed(previousGamesPlayed => previousGamesPlayed + 1)
      setMatches(0)
      setTotalMatches(cards.length / 2)

      if (win && (score > bestScore)) {
        setBestScore(score)
      }
      setScore(30)
    }

    if (lost) {
      setLost(false)
      setDefeats(defeats => defeats + 1)
    }
    if (win) {
      setWin(false)
      setWins(wins => wins + 1)
    }
  }, [lost, win])

  useEffect(() => {
    if (matches === totalMatches) {
      setWin(true)
    }
  }, [matches])

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
    setFirstChoice(null)
    setSecondChoice(null)
  }

  const increaseAttempts = () => {
    setAttempts(previousAttempt => previousAttempt + 1)
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
      flexWrap: 'no-wrap'
    },
    cardContainer: {
      flex: 9,
      flexDirection: 'column',
      flexWrap: 'nowrap',
      backgroundColor: '#DB7741',
      borderRadius: 5,
      margin: 5
    },
    rowCardContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    statusGameContainer: {
      flex: 2,
      flexDirection: 'column',
      flexWrap: 'no-wrap',
      backgroundColor: '#EDB45E',
      borderRadius: 5,
      margin: 5
    },
    statusMainContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    statusBestPlaysContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    statusGeneralInformations: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 15,
      margin: 5
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
        <View style={styles.statusMainContainer}>          
          <Text style={styles.text}>Tentativas: {attempts}</Text>
          <Text style={styles.text}>Pontuação: {score}</Text>
        </View>
        <View style={styles.statusBestPlaysContainer}>          
          <Text style={styles.text}>Melhor Pontuação: {bestScore}</Text>
        </View>
        <View style={styles.statusGeneralInformations}>          
          <Text style={styles.text}>Partidas Jogadas: {gamesPlayed}</Text>
          <Text style={styles.text}>Vitórias: {wins}</Text>
          <Text style={styles.text}>Derrotas: {defeats}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        {rowComponents}
      </View>
    </View>
  )
}