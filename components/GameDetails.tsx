import { useEffect, useState } from "react";
import { Button } from "react-native";
import { SafeAreaView, View, StyleSheet, Text, Pressable } from "react-native";
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
  const [curPlayer, setCurPlayer] = useState(1);
  const [dealer, setDealer] = useState(0);

  const [pot, setPot] = useState(0);
  const [curBet, setCurBet] = useState(0);

  const [lastRaiser, setLastRaiser] = useState(0);

  const [roundNr, setRoundNr] = useState(1);

  const [started, setStarted] = useState(false);
  const [partStarted, setPartStarted] = useState(false);

  const [folded, setFolded] = useState([]);

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
    let count = 0;
    let lastActive = 0;
    setActive(curPlayer, false);
    players[curPlayer].active = false; //useState workaround?
    console.log("folded");
    console.log(players);
    for (let i = 0; i < playerCount; i++) {
      if (players[i].active) {
        lastActive = i;
        count++;
      }
    }
    if (count < 2) {
      console.log("1 left");
      addMoney(lastActive, pot);
      handEnd();
      return;
    }
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

  const nextActive = (id: number) => {
    let i = id;
    i = upcomingPlayer(i);
    while (i != id) {
      if (players[i].active) {
        return i;
      }
      i = upcomingPlayer(i);
    }
    return 0;
  };

  const roundEnd = () => {
    setCurBet(0);
    setRoundNr(roundNr + 1);
    setLastRaiser(1);
    setCurPlayer(nextActive(0));
    console.log("round finished");
  };

  const handEnd = () => {
    setCurBet(0);
    setPot(0);
    setRoundNr(1);
    console.log('hand finished');
  }

  const upcomingPlayer = (id: number) => {
    return id === playerCount - 1 ? 0 : id + 1;
  };

  const initGame = () => {
    raise(minBet / 2);
    raise(minBet);
  };

  useEffect(() => {
    if (roundNr === 1) {
      console.log("effected");
    } else if (roundNr === 5) {
      console.log("hand end");
    } else {
      setCurBet(0);
      setCurPicker(0);
    }
  }, [roundNr]);

  const nextPlayer = () => {
    let upcoming = upcomingPlayer(curPlayer);
    let arePlayers = true;
    if (upcoming === lastRaiser) {
      roundEnd();
    } else if (!players[upcoming].active) {
      upcoming = upcomingPlayer(upcoming);
      while (arePlayers) {
        if (players[upcoming].active) {
          setCurPlayer(upcoming);
          console.log("skipped");
          return;
        } else if (upcoming === curPlayer) {
          arePlayers = false;
        } else {
          upcoming = upcomingPlayer(upcoming);
        }
      }
      console.log("hand over");
    } else {
      setCurPlayer(upcoming);
    }
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

  const [curPicker, setCurPicker] = useState(minBet);

  if (!started) {
    raise(minBet / 2);
    setPartStarted(true);
    if (partStarted) {
      raise(minBet);
      setStarted(true);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.gameView}>
        <Text>Game</Text>
        <Pressable
          onPress={() => {
            console.log(players);
            console.log(nextActive(0));
          }}
        >
          <Text>View</Text>
        </Pressable>
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
          value={curPicker}
          minValue={curBet}
          onConfirm={(val) => handleConfirm(val)}
          onNumberChange={(num) => setCurPicker(num)}
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
