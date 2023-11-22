import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";

interface Props {
  size: "xs" | "small" | "medium" | "large" | "xl";
  children: string;
  onPress?: () => void;
}

export default function SecondaryButton({ onPress, size, children }: Props) {
  let style,
    textStyle = null;
  switch (size) {
    case "xs":
      style = styles.btnXS;
      textStyle = styles.btnXSText;
      break;
    case "small":
      style = styles.btnSM;
      textStyle = styles.btnSMText;
      break;
    case "medium":
      style = styles.btnMD;
      textStyle = styles.btnMDText;
      break;
    case "large":
      style = styles.btnLG;
      textStyle = styles.btnLGText;
      break;
    case "xl":
      style = styles.btnXL;
      textStyle = styles.btnXLText;
      break;
    default:
      style = styles.btnMD;
      textStyle = styles.btnMDText;
  }

  return (
    <View style={styles.buttons}>
      <TouchableOpacity onPress={onPress}>
        <View style={style}>
          <Text style={textStyle}>{children}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    height: 100,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  btnXS: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    backgroundColor: "#efefef",
    borderColor: "#efefef",
  },
  btnXSText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: "#0d57b2",
  },
  btnSM: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "#efefef",
    borderColor: "#efefef",
  },
  btnSMText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#0d57b2",
  },
  btnMD: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "#efefef",
    borderColor: "#efefef",
  },
  btnMDText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#0d57b2",
  },
  btnLG: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#efefef",
    borderColor: "#efefef",
  },
  btnLGText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#0d57b2",
  },
  btnXL: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    backgroundColor: "#efefef",
    borderColor: "#efefef",
  },
  btnXLText: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600",
    color: "#0d57b2",
  },
});
