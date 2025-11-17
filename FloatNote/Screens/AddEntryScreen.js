import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../Styles";
import { useTheme } from "../Services/ThemeContext";

import { db } from "../Services/Conexion_BD";
import { push, ref } from "firebase/database";

export default function AddEntryScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { themeColor } = useTheme();

  const handleAdd = async () => {
    if (!title || !content) {
      return alert("Completa todos los campos");
    }

    const formattedDate = date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    try {
      await push(ref(db, "journalEntries"), {
        date: formattedDate,
        timestamp: Date.now(),
        title: title,
        content: content,
      });

      alert("Entrada guardada correctamente");
      navigation.navigate("JournalMain");
    } catch (error) {
      console.error("❌ Error guardando:", error);
      alert("Hubo un error al guardar la entrada.");
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false);
    setDate(selectedDate || date);
  };

  return (
    <View style={styles.addEntryContainer}>
      <Text style={[styles.addEntryTitle, { color: themeColor }]}>
        Nueva entrada
      </Text>

      <Text style={{ color: themeColor }}>Fecha:</Text>

      {Platform.OS === "web" ? (
        <input
          type="date"
          value={date.toISOString().split("T")[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
          style={styles.input}
        />
      ) : (
        <>
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={[styles.input, { borderColor: themeColor, borderWidth: 1 }]}
          >
            <Text>{date.toDateString()}</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="calendar"
              onChange={onChangeDate}
            />
          )}
        </>
      )}

      <Text style={{ color: themeColor }}>Título:</Text>
      <TextInput
        placeholder="Escribe un título"
        value={title}
        onChangeText={setTitle}
        style={[styles.input, { borderColor: themeColor, borderWidth: 1 }]}
      />

      <Text style={{ color: themeColor }}>Contenido:</Text>
      <TextInput
        placeholder="Escribe tu nota..."
        multiline
        value={content}
        onChangeText={setContent}
        style={[styles.contentInput, { borderColor: themeColor, borderWidth: 1 }]}
      />

      <TouchableOpacity
        onPress={handleAdd}
        style={[styles.saveButton, { backgroundColor: themeColor }]}
      >
        <Text style={styles.saveButtonText}>Guardar entrada</Text>
      </TouchableOpacity>
    </View>
  );
}
