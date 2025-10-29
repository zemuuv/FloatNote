import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import NotesListScreen from "./Screens/NoteListScreen";
import AddNoteScreen from "./Screens/AddNoteScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NotesList">
        <Stack.Screen
          name="NotesList"
          component={NotesListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddNote"
          component={AddNoteScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
