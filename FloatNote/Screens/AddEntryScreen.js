import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../Styles";

export default function AddEntryScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
      <Text style={styles.addEntryTitle}>Nueva entrada</Text>

      <Text>Fecha:</Text>

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
            style={styles.input}
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

      <Text>Título:</Text>
      <TextInput
        placeholder="Escribe un título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Text>Contenido:</Text>
      <TextInput
        placeholder="Escribe tu nota..."
        multiline
        value={content}
        onChangeText={setContent}
        style={styles.contentInput}
      />

      <TouchableOpacity onPress={handleAdd} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Guardar entrada</Text>
      </TouchableOpacity>
    </View>
  );
}
