import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../Styles";

export default function NotesListScreen({ navigation }) {
  const [notes, setNotes] = useState([]);

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
    <View style={styles.noteItem}>
      <View style={styles.noteDot} />
      <Text style={styles.noteTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.listContainer}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>To-Do List</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddNote")}>
          <Ionicons name="create-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {notes.length === 0 ? (
        <Text style={styles.noEntriesText}>No hay notas aún.</Text>
      ) : (
        <FlatList
          data={notes}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}
