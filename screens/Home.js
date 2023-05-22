import { View } from "react-native";
import React from "react";
import WheelsSpinner from "../screens/WheelsSpinner";

export default function () {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00224F",
      }}
    >
      <WheelsSpinner />
    </View>
  );
}
