import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../Styles"; // ajusta la ruta si es necesario

export default function JournalScreen({ navigation }) {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  // Recibir nueva entrada desde AddEntryScreen
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const route = navigation.getState().routes.find((r) => r.params?.newEntry);
      if (route?.params?.newEntry) {
        setEntries((prev) => [...prev, route.params.newEntry]);
        route.params.newEntry = null; // limpiar
      }
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.entryCard}
      onPress={() => setSelectedEntry(item)} // ✅ abre modal al tocar
    >
      <Text style={styles.entryCardDate}>{item.date}</Text>
      <Text style={styles.entryCardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.journalContainer}>
      {/* HEADER */}
      <View style={styles.journalHeader}>
        <Ionicons name="options-outline" size={24} color="black" />
        <Text style={styles.journalHeaderTitle}>Journal</Text>

        {/* BOTÓN PARA AGREGAR ENTRADA */}
        <TouchableOpacity onPress={() => navigation.navigate("AddEntry")}>
          <Ionicons name="create-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* GRID DE ENTRADAS */}
      {entries.length === 0 ? (
        <Text style={styles.noEntriesText}>No hay entradas aún.</Text>
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
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedEntry?.title}</Text>
            <Text style={styles.modalDate}>{selectedEntry?.date}</Text>
            <Text style={styles.modalText}>{selectedEntry?.content}</Text>

            <TouchableOpacity
              onPress={() => setSelectedEntry(null)}
              style={styles.modalClose}
            >
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
