import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  TouchableOpacity,
} from "react-native";

import WheelOfFortune from "react-native-wheel-of-fortune";

const participants = [
  "#100|Card",
  "No|Card",
  "#100|Card",
  "#100|Card",
  "#100|Card",
  "No|Card",
  "No|Card",
  "No|Card",
  "No|Card",
];
class WheelsSpinner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winnerValue: null,
      winnerIndex: null,
      totalValue: 0,
      started: false,
      spinCount: 0,
    };
    this.child = null;
  }

  buttonPress = () => {
    if (this.state.spinCount < 5) {
      this.setState((prevState) => ({
        started: true,
        spinCount: prevState.spinCount + 1,
      }));
      this.child._onPress();
    } else {
      // Display a message that no more spins are available
      alert("No more spins available.");
    }
  };

  render() {
    const { spinCount, winnerIndex, started, totalValue } = this.state;

    let remainingSpins = 5 - spinCount;

    if (remainingSpins <= 0) {
      remainingSpins = 0;
    }

    const wheelOptions = {
      rewards: participants,
      knobSize: 15,
      borderWidth: 10,
      borderColor: "orange",
      innerRadius: 30,
      duration: 6000,
      backgroundColor: "orange",
      textAngle: "horizontal",
      knobSource: require("../assets/images/knob.png"),
      enabled: remainingSpins > 0,
      onRef: (ref) => (this.child = ref),
      onFinish: () => {
        if (spinCount >= 5) {
          alert("No more spins available.");
        }
      },
    };

    return (
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"} />
        <WheelOfFortune
          options={wheelOptions}
          getWinner={(value, index) => {
            this.setState(
              (prevState) => {
                const newTotalValue =
                  value !== "No|Card"
                    ? prevState.totalValue + Number(value.slice(1, 4))
                    : prevState.totalValue;

                return {
                  winnerValue: value,
                  winnerIndex: index,
                  totalValue: newTotalValue,
                  spinCount: prevState.spinCount + 1,
                };
              },
              () => {
                if (spinCount + 1 >= 5) {
                  alert("No more spins available.");
                }
              }
            );
          }}
        />
        {!this.state.started && (
          <View style={styles.startButtonView}>
            <TouchableOpacity
              onPress={() => this.buttonPress()}
              style={[
                styles.startButton,
                this.state.spinCount >= 5 ? styles.disabledButton : null,
              ]}
              disabled={this.state.spinCount >= 5}
            >
              <Text style={styles.startButtonText}>Tap to Spin!</Text>
            </TouchableOpacity>
          </View>
        )}

        {winnerIndex != null && spinCount < 5 && (
          <View style={styles.winnerView}>
            <Text style={styles.winnerText}>
              You win {participants[this.state.winnerIndex]}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.setState(
                  (prevState) => ({
                    spinCount: prevState.spinCount + 1,
                  }),
                  () => {
                    if (spinCount + 1 >= 5) {
                      alert("No more spins available.");
                    }
                    this.child._tryAgain();
                  }
                );
              }}
              style={styles.tryAgainButton}
            >
              <Text style={styles.tryAgainText}>TRY AGAIN</Text>
            </TouchableOpacity>
          </View>
        )}

        {spinCount < 5 && (
          <View style={styles.remainingSpinsView}>
            <Text style={styles.remainingSpinsText}>
              Spins Left: {remainingSpins}
            </Text>
          </View>
        )}
        <View style={styles.totalRewardsView}>
          <Text style={styles.totalRewardsText}>
            Airtime Obtained: {totalValue}
          </Text>
        </View>
      </View>
    );
  }

  buttonPress = () => {
    if (this.state.spinCount < 5) {
      this.setState({
        started: true,
      });
      this.child._onPress();
    } else {
      alert("No more spins available.");
    }
  };
}
export default WheelsSpinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00224F",
    marginBottom: 80,
  },
  startButtonView: {
    position: "absolute",
  },
  startButton: {
    backgroundColor: "#348BDB",
    borderRadius: 30,
    marginTop: 470,
    padding: 15,
  },
  startButtonText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
  },
  winnerView: {
    backgroundColor: "#fff",
    borderRadius: 20,
    position: "absolute",
    top: 200,
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  tryAgainButton: {
    padding: 10,
  },
  winnerText: {
    fontSize: 30,
  },
  tryAgainButton: {
    padding: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  tryAgainText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  totalRewardsView: {
    position: "absolute",
    top: 30,
    padding: 10,
    color: "#fff",
    backgroundColor: "gray",
    borderRadius: 5,
  },
  totalRewardsText: {
    color: "#fff",
  },
  remainingSpinsText: {
    marginBottom: -10,
    color: "#fff",
  },
});
