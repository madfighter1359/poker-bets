import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

interface Props {
    defaultValue: number;
    mul1: number;
    mul2: number,
    mul3: number,
}

export default function NumberPicker({defaultValue, mul1, mul2, mul3}: Props) {

    const [number, setNumber] = useState(defaultValue);

    console.log('testing');

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {setNumber(number - mul3)}}><Text style={styles.addBox}>{-mul3}</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {setNumber(number - mul2)}}><Text style={styles.addBox}>{-mul2}</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {setNumber(number - mul1)}}><Text style={styles.addBox}>{-mul1}</Text></TouchableOpacity>
            <Text style={styles.numberBox}>{number}</Text>
            <TouchableOpacity onPress={() => {setNumber(number + mul1)}}><Text style={styles.addBox}>{mul1}</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {setNumber(number + mul2)}}><Text style={styles.addBox}>{mul2}</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {setNumber(number + mul3)}}><Text style={styles.addBox}>{mul3}</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
      },
      numberBox: {
        fontSize: 40,
        color: 'white',
        padding: 10,
      },
      addBox: {
        fontSize: 40,
        color: 'grey',
        padding: 5,
        borderColor: 'grey',
        borderWidth: 2,
        margin: 10
      }
})