import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import JournalScreen from "./Screens/JournalScreen";
import AddEntryScreen from "./Screens/AddEntryScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="JournalMain"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="JournalMain" component={JournalScreen} />
        <Stack.Screen name="AddEntry" component={AddEntryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
