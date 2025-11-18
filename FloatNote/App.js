import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotesListScreen from "./Screens/NoteListScreen";
import AddNoteScreen from "./Screens/AddNoteScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import LoginScreen from "./Screens/LoginScreen";
import PerfilScreen from "./Screens/PerfilScreen";
import RemindersScreen from "./Screens/RemindersScreen";
import { Ionicons } from "@expo/vector-icons";
import { ThemeProvider, useTheme } from "./Services/ThemeContext";
import JournalScreen from "./Screens/JournalScreen";
import AddEntryScreen from "./Screens/AddEntryScreen";
import AddReminderScreen from "./Screens/AddReminderScreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* 📘 Subnavegador para la sección de Notas */
function NotesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NotesList" component={NotesListScreen} />
      <Stack.Screen name="AddNote" component={AddNoteScreen} />
    </Stack.Navigator>
  );
}

/*📘 Subnavegador para la sección de recordatorios */ 
function RemindersStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RemindersMain" component={RemindersScreen} />
      <Stack.Screen name="AddReminder" component={AddReminderScreen} />
    </Stack.Navigator>
  );
}


/* 📘 Subnavegador para la sección de Diario / Calendario */
function JournalStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="JournalMain" component={JournalScreen} />
      <Stack.Screen name="AddEntry" component={AddEntryScreen} />
    </Stack.Navigator>
  );
}

/* 🧭 Tabs principales */
function Tabs() {
  const { themeColor } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Notas") iconName = "checkmark-circle";
          else if (route.name === "Reminders") iconName = "alert-circle";
          else if (route.name === "Journal") iconName = "calendar";
          else if (route.name === "Perfil") iconName = "person";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: themeColor,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Notas" component={NotesStack} />
      <Tab.Screen name="Reminders" component={RemindersStack} />
      <Tab.Screen name="Journal" component={JournalStack} />      
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

/* 🚀 Navegador principal */
export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Login y Registro no muestran barra */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />

          {/* Aquí entran las Tabs una vez el usuario inicia sesión */}
          <Stack.Screen name="MainTabs" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}