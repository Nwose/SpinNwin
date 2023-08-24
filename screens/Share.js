import { View, Text } from "react-native";
import React from "react";

export default function Share() {
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
        This will let the user share the app via whatsapp.
      </Text>
      <Text style={{ color: "#fff", fontSize: 18 }}>#Still in Progress...</Text>
    </View>
  );
}
