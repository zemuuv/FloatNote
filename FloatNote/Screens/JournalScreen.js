import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../Styles";
import { useTheme } from "../Services/ThemeContext";

// 🔥 Firebase
import { db } from "../Services/Conexion_BD";
import { ref, onValue, remove } from "firebase/database";

export default function JournalScreen({ navigation }) {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { themeColor } = useTheme();

  // 🔥 LEER ENTRADAS DE FIREBASE EN TIEMPO REAL
  useEffect(() => {
    const entriesRef = ref(db, "journalEntries");

    const unsubscribe = onValue(entriesRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const parsed = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        parsed.sort((a, b) => b.timestamp - a.timestamp);

        setEntries(parsed);
      } else {
        setEntries([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // 👁 ABRIR MODAL
  const openEntryModal = (entry) => {
    setSelectedEntry(entry);
    setModalVisible(true);
  };

  // 🗑 ELIMINAR ENTRADA
  const handleDeleteEntry = async () => {
    if (!selectedEntry?.id) return;

    try {
      await remove(ref(db, `journalEntries/${selectedEntry.id}`));
      setModalVisible(false);
      setSelectedEntry(null);
    } catch (error) {
      console.log("Error eliminando entry:", error);
    }
  };

  // 🎨 Tarjeta individual
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.entryCard, { borderColor: themeColor, borderWidth: 1.5 }]}
      onPress={() => openEntryModal(item)}
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

        <TouchableOpacity onPress={() => navigation.navigate("AddEntry")}>
          <Ionicons name="create-outline" size={26} color={themeColor} />
        </TouchableOpacity>
      </View>

      {/* GRID */}
      {entries.length === 0 ? (
        <Text style={[styles.noEntriesText, { color: "#777" }]}>
          No hay entradas aún.
        </Text>
      ) : (
        <FlatList
          data={entries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* ⭐ MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, { borderColor: themeColor }]}>
                <Text style={[styles.modalTitle, { color: themeColor }]}>
                  {selectedEntry?.title}
                </Text>

                <Text style={[styles.modalDate, { color: themeColor }]}>
                  {selectedEntry?.date}
                </Text>

                <Text style={styles.modalText}>{selectedEntry?.content}</Text>

                {/* BOTONES */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 25,
                  }}
                >
                  {/* ❌ Eliminar */}
                  <TouchableOpacity
                    onPress={handleDeleteEntry}
                    style={{
                      backgroundColor: "red",
                      paddingVertical: 8,
                      paddingHorizontal: 20,
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Eliminar
                    </Text>
                  </TouchableOpacity>

                  {/* Cerrar */}
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{
                      backgroundColor: themeColor,
                      paddingVertical: 8,
                      paddingHorizontal: 20,
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Cerrar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
