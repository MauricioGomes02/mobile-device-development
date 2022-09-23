import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MemoryGame from './components/MemoryGame/MemoryGame'
import difficultyEnum from './enums/difficultyEnum'

const Stack = createNativeStackNavigator()

const styles = {
  choiceDifficultyScreen: StyleSheet.create({
    container: {
      flex: 1
    },
    containerQuestion: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center'
    },
    containerButtons: {
      flex: 7,
      padding: '10%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignContent: 'center'
    },
    button: {
      width: 200,
      height: 50,
      backgroundColor: '#DB7741',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10
    },
    text: {
    }
  }),

  memoryGameScreen: StyleSheet.create({
    container: {
      flex: 1
    },
    containerButton: {
      flex: 1,
      justifyContent: 'center'
    },
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#7DB282',
      margin: 5,
      borderRadius: 5
    },
    containerGame: {
      flex: 9
    }
  })
}

const model = {
  choiceDifficultyScreen: {
    dispatch: (navigation, difficulty) => {
      navigation.dispatch(
        StackActions.push("Memory Game Screen", { difficulty: difficulty })
      )
    }
  },
  memoryGameScreen: {
    dispatch: (navigation) => {
      navigation.dispatch(
        StackActions.pop()
      )
    }
  }
}

function ChoiceDifficulty({navigation}) {
  return (
    <View style={styles.choiceDifficultyScreen.container}>
      <View style={styles.choiceDifficultyScreen.containerQuestion}>
        <Text>
          Escolha uma dificuldade
        </Text>
      </View>
      <View style={styles.choiceDifficultyScreen.containerButtons}>
        <TouchableOpacity 
          style={styles.choiceDifficultyScreen.button}
          onPress={
            () => model
              .choiceDifficultyScreen
              .dispatch(navigation, difficultyEnum.easy)
          }>
          <Text style={styles.choiceDifficultyScreen.text}>
            Fácil
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.choiceDifficultyScreen.button}
          onPress={
            () => model
              .choiceDifficultyScreen
              .dispatch(navigation, difficultyEnum.medium)
          }>
          <Text style={styles.choiceDifficultyScreen.text}>
            Médio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.choiceDifficultyScreen.button}
          onPress={
            () => model
              .choiceDifficultyScreen
              .dispatch(navigation, difficultyEnum.hard)
          }>
          <Text style={styles.choiceDifficultyScreen.text}>
            Difícil
          </Text>
        </TouchableOpacity>
      </View>      
    </View>
  )
}

function MemoryGameScreen({navigation, route}) {
  const difficulty = route.params.difficulty

  return(
    <View style={styles.memoryGameScreen.container}>
      <View style={styles.memoryGameScreen.containerButton}>
        <TouchableOpacity 
          style={styles.memoryGameScreen.button}
          onPress={
            () => model.memoryGameScreen.dispatch(navigation)
          }>
         <Text>
          VOLTAR AO MENU INICIAL
         </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.memoryGameScreen.containerGame}>
        <MemoryGame difficulty={difficulty}/>
      </View>
    </View>
  )
}

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={"Choice Difficulty"}
          component={ChoiceDifficulty}
          options={{headerShown: false}}>
        </Stack.Screen>
        <Stack.Screen
          name={"Memory Game Screen"}
          component={MemoryGameScreen}
          options={{headerShown: false}}>
        </Stack.Screen>       
      </Stack.Navigator>
    </NavigationContainer>
  )
}