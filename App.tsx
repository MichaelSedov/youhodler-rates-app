import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CryptoList from "./components/CryptoList";
import DetailsScreen from "./screens/DetailsScreen";
import { RootStackParamList } from "./components/navigation/types";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={CryptoList} options={{ title: "Crypto" }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: "Details" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
