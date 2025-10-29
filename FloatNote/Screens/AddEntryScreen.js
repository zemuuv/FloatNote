import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../Styles";
import { useTheme } from "../Services/ThemeContext";

export default function AddEntryScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { themeColor } = useTheme(); // 👈 color dinámico

  const handleAdd = () => {
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
    if (!title) return alert("Completa todos los campos");
    const newEntry = { date: formattedDate, title, content };
    navigation.navigate("JournalMain", { newEntry });
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.addEntryContainer}>
      {/* 👇 el título ahora usa el color del tema */}
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

      {/* 👇 botón principal usa el color dinámico */}
      <TouchableOpacity
        onPress={handleAdd}
        style={[styles.saveButton, { backgroundColor: themeColor }]}
      >
        <Text style={styles.saveButtonText}>Guardar entrada</Text>
      </TouchableOpacity>
    </View>
  );
}