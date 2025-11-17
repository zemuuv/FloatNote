import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../Styles";
import { useTheme } from "../Services/ThemeContext";
import { db } from "../Services/Conexion_BD";
import { ref, push, set } from "firebase/database";

export default function AddNoteScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { themeColor } = useTheme();

  const handleSave = async () => {
    if (!title || !description) {
      alert("Completa todos los campos");
      return;
    }

    try {
      // 👇 referencia al nodo "notes"
      const notesRef = ref(db, "notes");

      // 👇 genera ID automático y agrega la nota
      const newNoteRef = push(notesRef);

      await set(newNoteRef, {
        title: title,
        description: description,
        createdAt: new Date().toISOString(),
      });

      alert("Nota guardada correctamente");

      // regresar a la lista
      navigation.navigate("NotesList");

    } catch (error) {
      console.error("Error guardando nota:", error);
      alert("Hubo un error al guardar");
    }
  };

  return (
    <View style={styles.addEntryContainer}>
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

      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: themeColor }]}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Guardar Nota</Text>
      </TouchableOpacity>
    </View>
  );
}
