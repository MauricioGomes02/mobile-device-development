import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function Card({ 
  card, 
  handleChoice, 
  visible, 
  disabled, 
  size }) {
  //#region Delegates
  const hundlePress = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }
  //#endregion

  //#region Constants
  const pathOfDefaultImage =  `${global._basedir}` + "/assets/card-images/"
  //#endregion

  //#region Styles
  const styles = StyleSheet.create({
    card: {
      width: size,
      height: size,
      borderRadius: '10%',
      backgroundColor: 'yellow',
    },
    button: {
      flex: 1,
    }
  })
  //#endregion

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.button} onPress={hundlePress}>
        <Image 
          // source={require(visible ? card.pathCardImage : pathOfDefaultImage)}
        >
        </Image>
      </TouchableOpacity>
    </View>
  )
}