import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  value: number;
  minValue: number;
  mul1: number;
  mul2: number;
  mul3: number;
  onConfirm: (val: number) => void;
  onFold: () => void;
  onNumberChange: (num: number) => void;
}

export default function NumberPicker({
  value,
  minValue,
  mul1,
  mul2,
  mul3,
  onConfirm,
  onFold,
  onNumberChange,
}: Props) {
  const [textSize, setTextSize] = useState(40);

  return (
    <View style={styles.container}>
      <View style={styles.topButtons}>
        <TouchableOpacity
          onPress={() => {
            if (value + mul1 >= 1000) {
              setTextSize(30);
            }
            onNumberChange(value + mul1);
          }}
        >
          <Text style={styles.addBox}>{`+${mul1}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (value + mul2 >= 1000) {
              setTextSize(30);
            }
            onNumberChange(value + mul2);
          }}
        >
          <Text style={styles.addBox}>{`+${mul2}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (value + mul3 >= 1000) {
              setTextSize(30);
            }
            onNumberChange(value + mul3);
          }}
        >
          <Text style={styles.addBox}>{`+${mul3}`}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          onPress={() => {
            if (value >= 1000 && value - mul1 < 1000) {
              setTextSize(40);
            }
            onNumberChange(value - mul1 > minValue ? value - mul1 : minValue);
          }}
        >
          <Text style={styles.addBox}>{-mul1}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (value >= 1000 && value - mul2 < 1000) {
              setTextSize(40);
            }
            onNumberChange(value - mul2 > minValue ? value - mul2 : minValue);
          }}
        >
          <Text style={styles.addBox}>{-mul2}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (value >= 1000 && value - mul3 < 1000) {
              setTextSize(40);
            }
            onNumberChange(value - mul3 > minValue ? value - mul3 : minValue);
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
            onConfirm(value);
            //setMinNumber(value);
          }}
        >
          <Text style={[styles.numberBox, { fontSize: textSize }]}>
            {value}
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
    marginTop: 14,
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
    marginBottom: 14,
  },
  numberContainer: {
    width: 100,
    height: 230,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});
