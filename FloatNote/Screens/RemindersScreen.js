import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useTheme } from "../Services/ThemeContext"; // ⭐ IMPORTANTE

export default function RemindersScreen({ navigation }) {
  const [reminders, setReminders] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const { themeColor } = useTheme(); // ⭐ COLOR DEL TEMA

  useEffect(() => {
    const db = getDatabase();
    const remindersRef = ref(db, "reminders/");

    const unsubscribe = onValue(remindersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setReminders(parsed);
      } else {
        setReminders([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const filtered = reminders.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const groupByMonth = filtered.reduce((acc, item) => {
    acc[item.month] = acc[item.month] || [];
    acc[item.month].push(item);
    return acc;
  }, {});

  const handleComplete = async (id) => {
    try {
      const db = getDatabase();
      await remove(ref(db, `reminders/${id}`));
    } catch (error) {
      console.log("Error eliminando:", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: "#fff" }]}>
      
      {/* ---------- MODAL ---------- */}
      <Modal visible={!!selected} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            {selected && (
              <>
                <Text style={[styles.modalTitle, { color: themeColor }]}>
                  {selected.title}
                </Text>
                <Text style={styles.modalText}>{selected.note}</Text>
                <Text style={[styles.modalDate, { color: themeColor }]}>
                  {selected.day} / {selected.month} / {selected.year}
                </Text>

                <TouchableOpacity
                  style={[styles.closeBtn, { backgroundColor: themeColor }]}
                  onPress={() => setSelected(null)}
                >
                  <Text style={styles.closeText}>Cerrar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={[styles.editText, { color: themeColor }]}>Edit</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: themeColor }]}>Reminders</Text>

        <TouchableOpacity onPress={() => navigation.navigate("AddReminder")}>
          <Icon name="create-outline" size={28} color={themeColor} />
        </TouchableOpacity>
      </View>

      {/* ---------- SEARCH ---------- */}
      <View style={styles.searchContainer}>
        <Icon
          name="search-outline"
          size={20}
          color="#999"
          style={{ marginLeft: 10 }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* ---------- LISTA AGRUPADA ---------- */}
      <FlatList
        data={Object.keys(groupByMonth)}
        keyExtractor={(item) => item}
        renderItem={({ item: month }) => (
          <View>
            <Text style={[styles.monthTitle, { color: themeColor }]}>
              {month}
            </Text>

            {groupByMonth[month].map((reminder) => (
              <TouchableOpacity
                key={reminder.id}
                style={[
                  styles.card,
                  { backgroundColor: "#F7F2F0" },
                ]}
                onPress={() => setSelected(reminder)}
              >
                <View
                  style={[
                    styles.dayCircle,
                    { backgroundColor: themeColor },
                  ]}
                >
                  <Text style={styles.dayText}>{reminder.day}</Text>
                </View>

                <View style={styles.info}>
                  <Text style={[styles.cardTitle, { color: themeColor }]}>
                    {reminder.title}
                  </Text>
                  <Text style={[styles.cardSub, { color: themeColor + "88" }]}>
                    {reminder.note}
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.completeBtn,
                    { borderColor: themeColor },
                  ]}
                  onPress={() => handleComplete(reminder.id)}
                >
                  <Text style={[styles.completeText, { color: themeColor }]}>
                    Complete
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />

      {/* ---------- BOTÓN "+" ---------- */}
      <TouchableOpacity onPress={() => navigation.navigate("AddReminder")}>
        <Icon name="add" size={45} color={themeColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: 10,
  },

  editText: { fontSize: 16, fontWeight: "600" },

  title: { fontSize: 22, fontWeight: "700" },

  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F1F1",
    borderRadius: 15,
    paddingVertical: 8,
    alignItems: "center",
    marginBottom: 20,
  },

  searchInput: { marginLeft: 10, flex: 1, fontSize: 16 },

  monthTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10,
    marginTop: 10,
  },

  card: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
  },

  dayCircle: {
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  dayText: { fontSize: 22, color: "white", fontWeight: "700" },

  info: { flex: 1, marginLeft: 15 },

  cardTitle: { fontSize: 16, fontWeight: "700" },

  cardSub: { fontSize: 14 },

  completeBtn: {
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },

  completeText: { fontWeight: "600" },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 20,
    width: "80%",
    elevation: 10,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },

  modalText: { fontSize: 16, color: "#333", marginBottom: 10 },

  modalDate: { fontSize: 16, fontWeight: "600" },

  closeBtn: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },

  closeText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
});
