import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { styles } from "../Styles";
import { useTheme } from "../Services/ThemeContext";

// Firebase
import { db } from "../Services/Conexion_BD";
import { push, ref } from "firebase/database";

export default function AddReminderScreen({ navigation }) {
  const { themeColor } = useTheme();

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false);
    setDate(selectedDate || date);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      return alert("Agrega un título");
    }

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const fullDate = date.toISOString().split("T")[0]; // YYYY-MM-DD

    try {
      await push(ref(db, "reminders"), {
        title,
        note,
        day,
        month,
        year,
        fullDate,
        completed: false
      });

      alert("Recordatorio guardado");
      navigation.navigate("RemindersMain");

    } catch (e) {
      console.error("Error guardando:", e);
      alert("Error al guardar el recordatorio.");
    }
  };

  return (
    <View style={[styles.addEntryContainer, { paddingTop: 40 }]}>

      <Text style={[styles.addEntryTitle, { color: themeColor }]}>
        Nuevo recordatorio
      </Text>

      {/* FECHA */}
      <Text style={{ color: themeColor, marginTop: 10 }}>Fecha:</Text>

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

      {/* TÍTULO */}
      <Text style={{ color: themeColor, marginTop: 15 }}>Título:</Text>
      <TextInput
        placeholder="Escribe un título"
        value={title}
        onChangeText={setTitle}
        style={[styles.input, { borderColor: themeColor, borderWidth: 1 }]}
      />

      {/* NOTA / DESCRIPCIÓN */}
      <Text style={{ color: themeColor, marginTop: 15 }}>Descripción:</Text>
      <TextInput
        placeholder="Escribe una nota..."
        multiline
        value={note}
        onChangeText={setNote}
        style={[
          styles.contentInput,
          { borderColor: themeColor, borderWidth: 1, height: 100 }
        ]}
      />

      {/* BOTÓN GUARDAR */}
      <TouchableOpacity
        onPress={handleSave}
        style={[
          styles.saveButton,
          { backgroundColor: themeColor, marginTop: 25 }
        ]}
      >
        <Text style={styles.saveButtonText}>Guardar recordatorio</Text>
      </TouchableOpacity>

    </View>
  );
}
