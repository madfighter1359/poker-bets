import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";
import GameDetails from "./components/GameDetails";
import PrimaryButton from "./components/PrimaryButton";

export default function App() {
  const [play, setPlay] = useState(false);
  const [playerCount, setPlayerCount] = useState("");
  const [startMoney, setStartMoney] = useState("");
  const [minBet, setMinBet] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      {play ? (
        <View style={styles.gameContainer}>
          <GameDetails
            playerCount={parseInt(playerCount)}
            startMoney={parseInt(startMoney)}
            minBet={parseInt(minBet)}
          ></GameDetails>
        </View>
      ) : (
        <View style={styles.gameContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Player count"
            onChangeText={(text) => setPlayerCount(text)}
            value={playerCount}
          ></TextInput>
          <TextInput
            style={styles.textInput}
            placeholder="Starting money"
            onChangeText={(text) => setStartMoney(text)}
            value={startMoney}
          ></TextInput>
          <TextInput
            style={styles.textInput}
            placeholder="Minimum bet"
            onChangeText={(text) => setMinBet(text)}
            value={minBet}
          ></TextInput>
          <PrimaryButton size="large" onPress={() => setPlay(true)}>
            Start game
          </PrimaryButton>
        </View>
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2FFE9",
    alignItems: "center",
    justifyContent: "center",
  },
  gameContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    fontSize: 30,
    padding: 10,
  },
});
