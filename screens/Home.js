import { Text, View } from "react-native";
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
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 30 }}>
          FAROUS DAILY SPINNER
        </Text>
        <Text style={{ color: "#fff", fontSize: 20 }}>
          Spin Daily to win AirTime!
        </Text>
        <Text
          style={{
            color: "#fff",
            backgroundColor: "gray",
            padding: 10,
            marginTop: 20,
            fontSize: 15,
            fontWeight: "900",
          }}
        >
          Click on the wheel icon!
        </Text>
      </View>
    </View>
  );
}
