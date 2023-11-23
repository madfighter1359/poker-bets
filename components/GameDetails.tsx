import { useEffect, useState } from "react";
import { Button } from "react-native";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import SecondaryButton from "./SecondaryButton";
import RaiseModal from "./RaiseModal";
import NumberPicker from "./NumberPicker";

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

  const [lastRaiser, setLastRaiser] = useState(2);

  const [roundNr, setRoundNr] = useState(1);

  const [players, setPlayers] = useState(
    Array.from({ length: playerCount }, (_, i) => ({
      id: i,
      username: `Player ${i}`,
      money: startMoney,
      active: true,
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

  const setActive = (id: number, active: boolean) => {
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player, index) => {
        if (index === id) {
          return {
            ...player,
            active: active,
          };
        }
        return player;
      });
    });
  };

  const fold = () => {
    setActive(curPlayer, false);
    nextPlayer();
  };

  const call = () => {
    console.log("called");
    setPot(pot + curBet);
    addMoney(curPlayer, -curBet);
    nextPlayer();
  };

  const raise = (val: number) => {
    console.log("raised");
    setPot(pot + val);
    setCurBet(val);
    addMoney(curPlayer, -val);
    setLastRaiser(curPlayer);
    nextPlayer();
  };

  useEffect(() => {
    if (roundNr === 1) {
      addMoney(dealer + 1, -minBet / 2);
      addMoney(dealer + 2, -minBet);
      setPot(1.5 * minBet);
      setCurPlayer(3);
      setCurBet(minBet);
    } else {
      setCurBet(0);
      console.log(curBet);
    }
  }, [roundNr]);

  const nextPlayer = () => {
    const upcoming = curPlayer === playerCount - 1 ? 0 : curPlayer + 1;
    if (upcoming === lastRaiser) {
      setRoundNr(roundNr + 1);
      console.log("round finished");
    }
    setCurPlayer(upcoming);
  };

  const handleConfirm = (val: number) => {
    //console.log(val);
    if (val > curBet) {
      raise(val);
    } else if (val === curBet) {
      call();
    } else {
      console.log("error");
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.gameView}>
        <Text>Game</Text>
        <Text style={styles.currentText}>{players[curPlayer].username}</Text>
        <Text
          style={styles.currentText}
        >{`Balance: ${players[curPlayer].money}`}</Text>
        <Text style={styles.currentText}>Bet: {curBet}</Text>
        <Text style={styles.currentText}>Pot: {pot}</Text>
      </View>
      <View style={styles.buttonView}>
        <NumberPicker
          onFold={fold}
          defaultValue={curBet}
          onConfirm={(val) => handleConfirm(val)}
          mul1={minBet / 2}
          mul2={minBet * 2}
          mul3={minBet * 10}
        ></NumberPicker>
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
    paddingHorizontal: 5,
    paddingTop: 5,
    height: 250,
    backgroundColor: "yellow",
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
