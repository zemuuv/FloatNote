import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../Styles";
import { useTheme } from "../Services/ThemeContext";

export default function JournalScreen({ navigation }) {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const { themeColor } = useTheme(); // 🎨 Tema activo

  // Recibir nueva entrada desde AddEntryScreen
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const route = navigation
        .getState()
        .routes.find((r) => r.params?.newEntry);
      if (route?.params?.newEntry) {
        setEntries((prev) => [...prev, route.params.newEntry]);
        route.params.newEntry = null; // limpiar
      }
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.entryCard, { borderColor: themeColor, borderWidth: 1.5 }]}
      onPress={() => setSelectedEntry(item)}
    >
      <Text style={[styles.entryCardDate, { color: themeColor }]}>
        {item.date}
      </Text>
      <Text style={styles.entryCardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.journalContainer, { backgroundColor: "#fff" }]}>
      {/* HEADER */}
      <View
        style={[
          styles.journalHeader,
          { borderBottomColor: themeColor, borderBottomWidth: 2 },
        ]}
      >
        <Ionicons name="options-outline" size={24} color={themeColor} />
        <Text style={[styles.journalHeaderTitle, { color: themeColor }]}>
          Journal
        </Text>

        {/* BOTÓN PARA AGREGAR ENTRADA */}
        <TouchableOpacity onPress={() => navigation.navigate("AddEntry")}>
          <Ionicons name="create-outline" size={26} color={themeColor} />
        </TouchableOpacity>
      </View>

      {/* GRID DE ENTRADAS */}
      {entries.length === 0 ? (
        <Text style={[styles.noEntriesText, { color: "#777" }]}>
          No hay entradas aún.
        </Text>
      ) : (
        <FlatList
          data={entries}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* MODAL PARA MOSTRAR EL CONTENIDO */}
      <Modal visible={!!selectedEntry} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { borderColor: themeColor }]}>
            <Text style={[styles.modalTitle, { color: themeColor }]}>
              {selectedEntry?.title}
            </Text>
            <Text style={[styles.modalDate, { color: themeColor }]}>
              {selectedEntry?.date}
            </Text>
            <Text style={styles.modalText}>{selectedEntry?.content}</Text>

            <TouchableOpacity
              onPress={() => setSelectedEntry(null)}
              style={[styles.modalClose, { backgroundColor: themeColor }]}
            >
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}