import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RemindersScreen() {
  const [search, setSearch] = useState("");

  // 📌 Datos de ejemplo (puedes reemplazar con Firebase)
  const reminders = [
    { id: "1", day: 4, month: "June", title: "Mari's Birthday", subtitle: "18" },
    { id: "2", day: 8, month: "June", title: "Superbowl", subtitle: "18" },
    { id: "3", day: 17, month: "June", title: "Concert", subtitle: "18" },
    { id: "4", day: 25, month: "June", title: "Aniversary", subtitle: "18" },
  ];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.editText}>Edit</Text>
        <Text style={styles.headerTitle}>Reminders</Text>
        <Ionicons name="pencil-outline" size={22} color="#5A2010" />
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={{ marginLeft: 10 }} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* MONTH TITLE */}
      <Text style={styles.monthText}>June</Text>

      {/* LISTA */}
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            {/* CÍRCULO DÍA */}
            <View style={styles.dayCircle}>
              <Text style={styles.dayText}>{item.day}</Text>
            </View>

            {/* CARD */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>

            {/* BOTÓN COMPLETE */}
            <TouchableOpacity style={styles.completeButton}>
              <Text style={styles.completeButtonText}>Complete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* BOTÓN FLOTANTE */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={40} color="#A54230" />
      </TouchableOpacity>
    </View>
  );
}

// 🎨 ESTILOS COPIANDO EL LOOK DE TU IMAGEN
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 18,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  editText: {
    color: "#A54230",
    fontSize: 16,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#5A2010",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingVertical: 8,
    marginBottom: 10,
  },

  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },

  monthText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5A2010",
    marginVertical: 8,
    alignSelf: "center",
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  dayCircle: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#5A2010",
    justifyContent: "center",
    alignItems: "center",
  },

  dayText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 22,
  },

  card: {
    backgroundColor: "#F8F2EF",
    flex: 1,
    padding: 12,
    marginHorizontal: 10,
    borderRadius: 12,
  },

  cardTitle: {
    fontSize: 16,
    color: "#5A2010",
    fontWeight: "600",
  },

  cardSubtitle: {
    fontSize: 12,
    color: "#A54230",
    marginTop: 2,
  },

  completeButton: {
    borderWidth: 1,
    borderColor: "#A54230",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },

  completeButtonText: {
    color: "#A54230",
    fontWeight: "600",
  },

  fab: {
    position: "absolute",
    bottom: 25,
    alignSelf: "center",
  },
});
