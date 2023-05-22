import { Platform, Text, View } from "react-native";
import { Home, Reveal, Share, Spin, Redeem } from "./screens";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShow: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    width: 380,
    background: "#00224F",
  },
};
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Entypo name="home" size={24} color="#00224F" />
                  <Text style={{ fontSize: 12, color: "#00224F" }}>Home</Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Share"
          component={Share}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <FontAwesome name="share" size={24} color="#00224F" />
                  <Text style={{ fontSize: 12, color: "#00224F" }}>Share</Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Spin N Win"
          component={Spin}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    top: Platform.OS == "ios" ? -1 : -20,
                    width: Platform.OS == "ios" ? 50 : 60,
                    height: Platform.OS == "ios" ? 50 : 60,
                    borderRadius: Platform.OS == "ios" ? 25 : 30,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#00224F",
                  }}
                >
                  <MaterialCommunityIcons
                    name="ship-wheel"
                    size={24}
                    color="#fff"
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Reveal"
          component={Reveal}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <MaterialCommunityIcons
                    name="seed"
                    size={24}
                    color="#00224F"
                  />
                  <Text style={{ fontSize: 12, color: "#00224F" }}>Reveal</Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Redeem"
          component={Redeem}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <MaterialIcons name="get-app" size={24} color="#00224F" />
                  <Text style={{ fontSize: 12, color: "#00224F" }}>Redeem</Text>
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
