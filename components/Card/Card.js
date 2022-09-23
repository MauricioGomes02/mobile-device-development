import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function Card({ 
  card, 
  handleChoice, 
  visible, 
  disabled, 
  size }) {
  
  const model = {
    hundlePress: () => {
      if (!disabled && !visible) {
        handleChoice(card)
      }
    }
  }

  const styles = StyleSheet.create({
    card: {
      width: size,
      height: size,
      borderRadius: 5,
      backgroundColor: 'white',
    },
    button: {
      flex: 1,
    },
    image: {
      position: "absolute",
      width: size,
      height: size,
      borderRadius: 5,
      resizeMode: "stretch"
    },
    imageNotVisibled: {
      display: "none"
    }
  })

  const defaultUriImage = "https://www.educlub.com.br/wp-content/uploads/2019/06/silhuetas-de-animais-mamiferos-para-imprimir-leao.png"

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.button} onPress={model.hundlePress}>
        <Image
          style={visible ? styles.image : styles.imageNotVisibled}
          source={{ uri : card.uriImage }}/>
        <Image   
          style={visible ? styles.imageNotVisibled : styles.image}
          source={{ uri : defaultUriImage }}/>
      </TouchableOpacity>
    </View>
  )
}