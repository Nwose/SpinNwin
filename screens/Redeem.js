import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Redeem() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Here users can claim their airtime.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00224F",
  },
  texto: {
    color: "#fff",
    backgroundColor: "gray",
    padding: 20,
    fontSize: 20,
    // borderRadius: 50,
  },
});
