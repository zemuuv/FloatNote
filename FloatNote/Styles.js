// styles.js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // 🧩 --- ESTILOS GENERALES ---
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonPrimary: {
    backgroundColor: "#A94437",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  noEntriesText: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
  },

  // 📘 --- JOURNAL SCREEN ---
  journalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  journalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 10,
  },
  journalHeaderTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  entryCard: {
    backgroundColor: "#A94437",
    borderRadius: 12,
    width: "47%",
    height: 150,
    margin: 5,
    justifyContent: "flex-end",
    padding: 10,
  },
  entryCardDate: {
    color: "#fff",
    fontWeight: "bold",
  },
  entryCardTitle: {
    fontSize: 18,
    color: "#fff",
  },

  // 🗒️ --- ADD ENTRY SCREEN (para diario) ---
  addEntryContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 50,
  },
  addEntryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    height: 100,
    marginBottom: 25,
  },

  // 🧾 --- MODAL (usado por journal y notas) ---
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4b1e1e",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
  },

  // 🧠 --- NOTE LIST SCREEN ---
  taskItem: {
    backgroundColor: "#f5e6e0",
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
  },
  taskTitle: {
    fontSize: 18,
    color: "#4b1e1e",
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#a0522d",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 28,
  },
   // General
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
   addEntryContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 40,
  },
  addEntryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    height: 100,
    marginBottom: 25,
  },
  saveButton: {
    backgroundColor: "#A94437",
    padding: 15,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
   noteItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  noteDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#A94437",
    marginRight: 12,
  },
  noteTitle: {
    fontSize: 16,
    color: "#333",
  },
});
