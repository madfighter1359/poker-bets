import { useEffect, useState } from "react";
import { Button } from "react-native";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import SecondaryButton from "./SecondaryButton";

interface Props {
  playerCount: number;
  startMoney: number;
  minBet: number;
}

export default function GameDetails({
  playerCount,
  startMoney,
  minBet,
}: Props) {
  const [curPlayer, setCurPlayer] = useState(0);
  const [dealer, setDealer] = useState(0);

  const [pot, setPot] = useState(0);
  const [curBet, setCurBet] = useState(minBet);

  let roundNr = 1;

  const [players, setPlayers] = useState(
    Array.from({ length: playerCount }, (_, i) => ({
      id: i,
      username: `Player ${i}`,
      money: startMoney,
    }))
  );

  const addMoney = (id: number, amount: number) => {
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player, index) => {
        if (index === id) {
          return {
            ...player,
            money: player.money + amount,
          };
        }
        return player;
      });
    });
  };

  const fold = () => {
    setCurPlayer(curPlayer === playerCount - 1 ? 0 : curPlayer + 1);
  };

  const call = () => {
    setPot(pot + curBet);
    addMoney(curPlayer, -curBet);
    setCurPlayer(curPlayer === playerCount - 1 ? 0 : curPlayer + 1);
  };

  const raise = () => {
    setCurPlayer(curPlayer === playerCount - 1 ? 0 : curPlayer + 1);
  };

  useEffect(() => {
    if (roundNr === 1) {
      addMoney(dealer + 1, -minBet / 2);
      addMoney(dealer + 2, -minBet);
      setPot(1.5 * minBet);
      setCurPlayer(3);
    }
  }, [roundNr]);

  //console.log(players);

  return (
    <View style={styles.container}>
      <View style={styles.gameView}>
        <Text>Game</Text>
        <Text style={styles.currentText}>{players[curPlayer].username}</Text>
        <Text style={styles.currentText}>Bet: {curBet}</Text>
        <Text style={styles.currentText}>Pot: {pot}</Text>
      </View>
      <View style={styles.buttonView}>
        <SecondaryButton size="medium" onPress={fold}>
          Fold
        </SecondaryButton>
        <SecondaryButton size="medium" onPress={call}>
          Call
        </SecondaryButton>
        <SecondaryButton size="medium" onPress={raise}>
          Raise
        </SecondaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gameView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    height: 100,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  currentText: {
    fontSize: 38,
    padding: 10,
  },
});
