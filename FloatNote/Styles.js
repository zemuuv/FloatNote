// styles.js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // 📄 Estilos de AddEntryScreen
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

  // 📘 Estilos de JournalScreen
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
  },
  noEntriesText: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDate: {
    color: "#888",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalClose: {
    alignSelf: "center",
    backgroundColor: "#A94437",
    padding: 10,
    borderRadius: 8,
  },
  modalCloseText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
