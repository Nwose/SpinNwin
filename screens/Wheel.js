import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";
import * as d3Shape from "d3-shape";

import Svg, { G, Text, TSpan, Path } from "react-native-svg";
import { ImageRender } from "./imageReward";
import _ from "underscore";
import { useFonts, Nunito_900Black } from "@expo-google-fonts/nunito";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const { width, height } = Dimensions.get("screen");

class Wheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: false,
      started: false,
      finished: false,
      winner: null,
      gameScreen: new Animated.Value(width - 100),
      wheelOpacity: new Animated.Value(1),
      imageLeft: new Animated.Value(width / 2 - 30),
      imageTop: new Animated.Value(height / 2 - 70),
    };
    this.angle = 0;

    this.prepareWheel();
  }

  prepareWheel = () => {
    this.Rewards = this.props.options.rewards;
    this.RewardCount = this.Rewards.length;

    this.numberOfSegments = this.RewardCount;
    this.fontSize = 28;
    this.verticalFontSize = 24;
    this.oneTurn = 360;
    this.angleBySegment = this.oneTurn / this.numberOfSegments;
    this.angleOffset = this.angleBySegment / 2;
    this.winner =
      this.props.options.winner !== undefined ||
      this.props.options.winner !== null
        ? this.props.options.winner
        : Math.floor(Math.random() * this.numberOfSegments);

    this._wheelPaths = this.makeWheel();
    this._angle = new Animated.Value(0);

    this.props.options.onRef(this);
  };

  resetWheelState = () => {
    this.setState({
      enabled: false,
      started: false,
      finished: false,
      winner: null,
      gameScreen: new Animated.Value(width - 100),
      wheelOpacity: new Animated.Value(1),
      imageLeft: new Animated.Value(width / 2 - 30),
      imageTop: new Animated.Value(height / 2 - 70),
    });
  };

  _tryAgain = () => {
    this.prepareWheel();
    this.resetWheelState();
    this.angleListener();
    this._onPress();
  };

  angleListener = () => {
    this._angle.addListener((event) => {
      if (this.state.enabled) {
        this.setState({
          enabled: false,
          finished: false,
        });
      }

      this.angle = event.value;
    });
  };

  componentWillUnmount() {
    this.props.options.onRef(undefined);
  }

  componentDidMount() {
    this.angleListener();
  }

  makeWheel = () => {
    const data = Array.from({ length: this.numberOfSegments }).fill(1);
    const arcs = _.sortBy(d3Shape.pie()(data), (a) => a.index);
    var colors = this.props.options.colors
      ? this.props.options.colors
      : [
          "#E07026",
          "#E8C22E",
          "#ABC937",
          "#4F991D",
          "#22AFD3",
          "#5858D0",
          "#7B48C8",
          "#D843B9",
          "#E23B80",
          "#D82B2B",
        ];

    return arcs.map((arc, index) => {
      const instance = d3Shape
        .arc()
        .outerRadius(width / 2)
        .innerRadius(this.props.options.innerRadius || 100);
      return {
        path: instance(arc),
        color: colors[index % colors.length],
        value: this.Rewards[index],
        centroid: instance.centroid(arc),
      };
    });
  };

  _getWinnerIndex = () => {
    const deg = Math.abs(Math.round(this.angle % this.oneTurn));
    // wheel turning counterclockwise
    if (this.angle < 0) return Math.floor(deg / this.angleBySegment);

    // wheel turning clockwise
    return (
      (this.numberOfSegments - Math.floor(deg / this.angleBySegment)) %
      this.numberOfSegments
    );
  };

  _onPress = () => {
    const duration = this.props.options.duration || 10000;
    this.setState({ started: true });

    Animated.timing(this._angle, {
      toValue:
        365 -
        this.winner * (this.oneTurn / this.numberOfSegments) +
        360 * (duration / 1000),
      duration: duration,
      useNativeDriver: true,
    }).start(() => {
      const winnerIndex = this._getWinnerIndex();
      this.setState({
        finished: true,
        winner: this._wheelPaths[winnerIndex].value,
      });
      this.props.getWinner(this._wheelPaths[winnerIndex].value, winnerIndex);
    });
  };

  _splitLabel = (string, lineLength) => {
    const words = string.split(" ");
    const lines = [];
    const line = { current: "" };
    for (let i = 0; i < words.length; i++) {
      const currentWord = words[i];
      if (line.current.length + currentWord.length <= lineLength) {
        line.current += currentWord + " ";
      } else {
        lines.push(line.current);
        line.current = currentWord + " ";
      }
    }
    lines.push(line.current);
    return lines;
  };

  _textRender = (x, y, label, i) => {
    if (!label) return null;

    const COMMON_MULTIPLE = 48;
    const LINES_MAX_LENGTH = COMMON_MULTIPLE / this.numberOfSegments;
    const OFFSET_POSITION_Y = this.numberOfSegments === 4 ? 10 : 40;

    return (
      <Text
        x={x - label.length * 5}
        y={label.length > 4 ? y - 60 : y - 90}
        fill={
          this.props.options.textColor ? this.props.options.textColor : "#fff"
        }
        textAnchor="middle"
        fontSize={label.length > 4 ? this.verticalFontSize : this.fontSize}
        fontWeight="900"
        fontFamily="Nunito_900Black"
      >
        {this.props.options.textAngle === "vertical" ? (
          <TSpan x={x} dy={20} key={`arc-${i}-slice`}>
            {label}
          </TSpan>
        ) : label.length > LINES_MAX_LENGTH && label.indexOf(" ") >= 0 ? (
          this._splitLabel(label, LINES_MAX_LENGTH).map((word, index) => (
            <TSpan
              x={x}
              y={y - OFFSET_POSITION_Y + index * 30}
              key={`arc-${i}-slice-${index}`}
            >
              {word}
            </TSpan>
          ))
        ) : (
          <TSpan x={x} y={y - 10} key={`arc-${i}-slice}`}>
            {label}
          </TSpan>
        )}
        <ImageRender x={x} y={y + 10} i={i} options={this.props.options} />
      </Text>
    );
  };

  _renderSvgWheel = () => {
    return (
      <View style={styles.container}>
        {this._renderKnob()}
        <Animated.View
          style={{
            alignItems: "center",
            justifyContent: "center",
            transform: [
              {
                rotate: this._angle.interpolate({
                  inputRange: [-this.oneTurn, 0, this.oneTurn],
                  outputRange: [
                    `-${this.oneTurn}deg`,
                    `0deg`,
                    `${this.oneTurn}deg`,
                  ],
                }),
              },
            ],
            backgroundColor: this.props.options.backgroundColor
              ? this.props.options.backgroundColor
              : "#fff",
            width: width - 90,
            height: width - 90,
            borderRadius: (width - 20) / 2,
            borderWidth: this.props.options.borderWidth
              ? this.props.options.borderWidth
              : 2,
            borderColor: this.props.options.borderColor
              ? this.props.options.borderColor
              : "#fff",
            opacity: this.state.wheelOpacity,
          }}
        >
          <AnimatedSvg
            width={this.state.gameScreen}
            height={this.state.gameScreen}
            viewBox={`0 0 ${width} ${width}`}
            style={{
              transform: [{ rotate: `-${this.angleOffset}deg` }],
              margin: 10,
            }}
          >
            <G y={width / 2} x={width / 2}>
              {this._wheelPaths.map((arc, i) => {
                const [x, y] = arc.centroid;
                const label = arc.value?.toString();

                return (
                  <G key={`arc-${i}`}>
                    <Path d={arc.path} strokeWidth={2} fill={arc.color} />
                    <G
                      rotation={
                        (i * this.oneTurn) / this.numberOfSegments +
                        this.angleOffset
                      }
                      origin={`${x}, ${y}`}
                    >
                      {this._textRender(x, y, label, i)}
                    </G>
                  </G>
                );
              })}
            </G>
          </AnimatedSvg>
        </Animated.View>
      </View>
    );
  };

  _renderKnob = () => {
    const knobSize = this.props.options.knobSize
      ? this.props.options.knobSize
      : 20;
    const YOLO = Animated.modulo(
      Animated.divide(
        Animated.modulo(
          Animated.subtract(this._angle, this.angleOffset),
          this.oneTurn
        ),
        new Animated.Value(this.angleBySegment)
      ),
      1
    );

    return (
      <Animated.View
        style={{
          top: 16,
          position: "relative",
          width: knobSize,
          height: knobSize * 2,
          justifyContent: "flex-end",
          zIndex: 1,
          opacity: this.state.wheelOpacity,
          transform: [
            {
              rotate: YOLO.interpolate({
                inputRange: [-1, -0.5, -0.0001, 0.0001, 0.5, 1],
                outputRange: [
                  "0deg",
                  "0deg",
                  "35deg",
                  "-35deg",
                  "0deg",
                  "0deg",
                ],
              }),
            },
          ],
        }}
      >
        <Svg
          width={knobSize}
          height={knobSize}
          style={{
            transform: [{ translateY: 0 }],
          }}
        >
          <Image
            source={
              this.props.options.knobSource
                ? this.props.options.knobSource
                : require("../assets/images/knob.png")
            }
            style={{ width: knobSize, height: knobSize }}
          />
        </Svg>
      </Animated.View>
    );
  };

  _renderTopToPlay() {
    if (this.state.started == false) {
      return (
        <TouchableOpacity onPress={() => this._onPress()}>
          {this.props.options.playButton()}
        </TouchableOpacity>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={styles.content}>
          {this._renderSvgWheel()}
        </Animated.View>
        {this.props.options.playButton ? this._renderTopToPlay() : null}
      </View>
    );
  }
}

export default Wheel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 10,
  },
});
