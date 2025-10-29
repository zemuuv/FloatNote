import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../Styles";
import { useTheme } from "../Services/ThemeContext";

export default function NotesListScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const { themeColor } = useTheme(); // 🎨 color del tema actual

  // Recibir la nueva nota desde AddNoteScreen
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const route = navigation.getState().routes.find((r) => r.params?.newNote);
      if (route?.params?.newNote) {
        setNotes((prev) => [...prev, route.params.newNote]);
        route.params.newNote = null; // limpiar después de usar
      }
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.noteItem,
        { borderLeftColor: themeColor, borderLeftWidth: 4, backgroundColor: "#fff" },
      ]}
    >
      <View
        style={[
          styles.noteDot,
          { backgroundColor: themeColor, height: 10, width: 10, borderRadius: 5 },
        ]}
      />
      <Text style={[styles.noteTitle, { color: themeColor }]}>{item.title}</Text>
    </View>
  );

  return (
    <View style={[styles.listContainer, { backgroundColor: "#fff" }]}>
      {/* HEADER */}
      <View
        style={[
          styles.header,
          {
            borderBottomColor: themeColor,
            borderBottomWidth: 2,
            paddingVertical: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <Text style={[styles.headerTitle, { color: themeColor, fontSize: 22, fontWeight: "bold" }]}>
          To-Do List
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddNote")}>
          <Ionicons name="create-outline" size={26} color={themeColor} />
        </TouchableOpacity>
      </View>

      {/* LISTA DE NOTAS */}
      {notes.length === 0 ? (
        <Text style={[styles.noEntriesText, { color: "#999", marginTop: 20 }]}>
          No hay notas aún.
        </Text>
      ) : (
        <FlatList
          data={notes}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingTop: 10 }}
        />
      )}
    </View>
  );
}