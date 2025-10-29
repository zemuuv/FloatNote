import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../Styles";

export default function AddNoteScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (!title || !description) {
      alert("Completa todos los campos");
      return;
    }
    const newNote = { title, description };
    navigation.navigate("NotesList", { newNote });
  };

  return (
    <View style={styles.addEntryContainer}>
      <Text style={styles.addEntryTitle}>Nueva Nota</Text>

      <Text>Título:</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe un título"
        value={title}
        onChangeText={setTitle}
      />

      <Text>Descripción:</Text>
      <TextInput
        style={styles.contentInput}
        placeholder="Escribe la descripción"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar Nota</Text>
      </TouchableOpacity>
    </View>
  );
}
