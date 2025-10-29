import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../Styles";
import { useTheme } from "../Services/ThemeContext";

export default function AddNoteScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { themeColor } = useTheme(); // 👈 color del tema

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
      {/* 👇 título usa color del tema */}
      <Text style={[styles.addEntryTitle, { color: themeColor }]}>Nueva Nota</Text>

      <Text style={{ color: themeColor }}>Título:</Text>
      <TextInput
        style={[styles.input, { borderColor: themeColor, borderWidth: 1 }]}
        placeholder="Escribe un título"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={{ color: themeColor }}>Descripción:</Text>
      <TextInput
        style={[styles.contentInput, { borderColor: themeColor, borderWidth: 1 }]}
        placeholder="Escribe la descripción"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      {/* 👇 botón principal usa color dinámico */}
      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: themeColor }]}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Guardar Nota</Text>
      </TouchableOpacity>
    </View>
  );
}