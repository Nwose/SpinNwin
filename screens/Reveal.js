import { View, Text } from "react-native";
import React from "react";

export default function Reveal() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00224F",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 18 }}>
        This screen displays the users balance.
      </Text>
    </View>
  );
}
