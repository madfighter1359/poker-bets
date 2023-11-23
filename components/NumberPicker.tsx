import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  defaultValue: number;
  mul1: number;
  mul2: number;
  mul3: number;
  onConfirm: (val: number) => void;
  onFold: () => void;
}

export default function NumberPicker({
  defaultValue,
  mul1,
  mul2,
  mul3,
  onConfirm,
  onFold,
}: Props) {
  const [number, setNumber] = useState(defaultValue);
  const [minNumber, setMinNumber] = useState(defaultValue);

  const handleSubmit = (valL: number) => {};

  const [textSize, setTextSize] = useState(40);

  return (
    <View style={styles.container}>
      <View style={styles.topButtons}>
        <TouchableOpacity
          onPress={() => {
            if (number + mul1 >= 1000) {
              setTextSize(30);
            }
            setNumber(number + mul1);
          }}
        >
          <Text style={styles.addBox}>{`+${mul1}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (number + mul2 >= 1000) {
              setTextSize(30);
            }
            setNumber(number + mul2);
          }}
        >
          <Text style={styles.addBox}>{`+${mul2}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (number + mul3 >= 1000) {
              setTextSize(30);
            }
            setNumber(number + mul3);
          }}
        >
          <Text style={styles.addBox}>{`+${mul3}`}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          onPress={() => {
            if (number >= 1000 && number - mul1 < 1000) {
              setTextSize(40);
            }
            setNumber(number - mul1 > minNumber ? number - mul1 : minNumber);
          }}
        >
          <Text style={styles.addBox}>{-mul1}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (number >= 1000 && number - mul2 < 1000) {
              setTextSize(40);
            }
            setNumber(number - mul2 > minNumber ? number - mul2 : minNumber);
          }}
        >
          <Text style={styles.addBox}>{-mul2}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (number >= 1000 && number - mul3 < 1000) {
              setTextSize(40);
            }
            setNumber(number - mul3 > minNumber ? number - mul3 : minNumber);
          }}
        >
          <Text style={styles.addBox}>{-mul3}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.numberContainer}>
        <TouchableOpacity onPress={onFold}>
          <Text style={styles.numberBox}>F</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onConfirm(number);
            setMinNumber(number);
          }}
        >
          <Text style={[styles.numberBox, { fontSize: textSize }]}>
            {number}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 230,
    backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  numberBox: {
    fontSize: 40,
    color: "black",
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  addBox: {
    fontSize: 33,
    color: "grey",
    padding: 3,
    borderColor: "grey",
    borderWidth: 2,
    margin: 10,
  },
  topButtons: {
    width: 280,
    height: 110,
    flexDirection: "row",
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomButtons: {
    width: 280,
    height: 110,
    flexDirection: "row",
    backgroundColor: "cyan",
    marginTop: "auto",
    marginLeft: -283,
    justifyContent: "center",
    alignItems: "center",
  },
  numberContainer: {
    width: 100,
    height: 230,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});
