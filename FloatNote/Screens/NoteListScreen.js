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
import { db } from "../Services/Conexion_BD";
import { ref, onValue, remove } from "firebase/database";

export default function NotesListScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { themeColor } = useTheme();

  // 🔥 Cargar notas desde Firebase
  useEffect(() => {
    const notesRef = ref(db, "notes");

    const unsubscribe = onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setNotes(list);
      } else {
        setNotes([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🗑 Eliminar nota de Firebase
  const handleDeleteNote = async () => {
    if (!selectedNote?.id) return;

    try {
      await remove(ref(db, `notes/${selectedNote.id}`));
      setModalVisible(false);
      setSelectedNote(null);
    } catch (error) {
      console.log("Error eliminando la nota:", error);
    }
  };

  // 👁 Abrir modal
  const openNoteModal = (note) => {
    setSelectedNote(note);
    setModalVisible(true);
  };

  // 📝 Ítem
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openNoteModal(item)}>
      <View
        style={[
          styles.noteItem,
          {
            borderLeftColor: themeColor,
            borderLeftWidth: 4,
            backgroundColor: "#fff",
          },
        ]}
      >
        <View
          style={[
            styles.noteDot,
            {
              backgroundColor: themeColor,
              height: 10,
              width: 10,
              borderRadius: 5,
            },
          ]}
        />
        <Text style={[styles.noteTitle, { color: themeColor }]}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.listContainer, { backgroundColor: "#fff" }]}>
      {/* HEADER */}
      <View
        style={[
          styles.header,
          {
            borderBottomColor: themeColor,
            borderBottomWidth: 2,
            paddingVertical: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <Text
          style={[
            styles.headerTitle,
            { color: themeColor, fontSize: 22, fontWeight: "bold" },
          ]}
        >
          To-Do List
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddNote")}>
          <Ionicons name="create-outline" size={26} color={themeColor} />
        </TouchableOpacity>
      </View>

      {/* LISTA */}
      {notes.length === 0 ? (
        <Text style={[styles.noEntriesText, { color: "#999", marginTop: 20 }]}>
          No hay notas aún.
        </Text>
      ) : (
        <FlatList
          data={notes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 10 }}
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
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.4)",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  width: "85%",
                  backgroundColor: "#fff",
                  padding: 20,
                  borderRadius: 12,
                  elevation: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginBottom: 10,
                    color: themeColor,
                  }}
                >
                  {selectedNote?.title}
                </Text>

                <Text style={{ fontSize: 16, color: "#333" }}>
                  {selectedNote?.description}
                </Text>

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
                    onPress={handleDeleteNote}
                    style={{
                      backgroundColor: "red",
                      paddingVertical: 8,
                      paddingHorizontal: 18,
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Tarea hecha
                    </Text>
                  </TouchableOpacity>

                  {/* Cerrar */}
                  <TouchableOpacity
                    style={{
                      backgroundColor: themeColor,
                      paddingVertical: 8,
                      paddingHorizontal: 20,
                      borderRadius: 8,
                    }}
                    onPress={() => setModalVisible(false)}
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
