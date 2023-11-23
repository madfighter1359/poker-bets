import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import NumberPicker from "./NumberPicker";

interface Props {
  isVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
  defaultValue: number;
  onConfirm: (val: number) => void;
}

export default function RaiseModal({
  isVisible,
  children,
  onClose,
  defaultValue,
  onConfirm,
}: Props) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>How much would you like to raise?</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        {children}
        <NumberPicker
          defaultValue={defaultValue}
          onConfirm={(val) => onConfirm(val)}
          mul1={defaultValue / 2}
          mul2={defaultValue * 2}
          mul3={defaultValue * 10}
        ></NumberPicker>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "35%",
    width: "100%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "16%",
    backgroundColor: "#464C55",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});
