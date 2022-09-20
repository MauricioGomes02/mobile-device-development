import { View, StyleSheet } from 'react-native'
import MemoryGame from './components/MemoryGame/MemoryGame'
import difficultyEnum from './enums/difficultyEnum'

export default function App() {
  const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  })

  return (
    <View style={styles.container}>
      <MemoryGame difficulty={difficultyEnum.easy} />
    </View>
  )
}