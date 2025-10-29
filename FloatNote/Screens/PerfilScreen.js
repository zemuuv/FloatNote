import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Picker,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../Services/ThemeContext"; 

export default function PerfilScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const { themeColor, setThemeColor } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle-outline" size={100} color={themeColor} /> {/* 👈 dinámico */}
          <TouchableOpacity style={[styles.editIcon, { backgroundColor: themeColor }]}>
            <Ionicons name="pencil" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={[styles.name, { color: themeColor }]}>Lucas Scott</Text> {/* 👈 dinámico */}
        <Text style={styles.username}>@lucasscott3</Text>
      </View>

      {/* --- Sección de tema --- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Theme</Text>
        <View style={styles.themeRow}>
          {["#A88FE8", "#7E6CCA", "#B36B5E", "#8D5A4F", "#5A3A29"].map(
            (color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.themeCircle,
                  {
                    backgroundColor: color,
                    borderWidth: color === themeColor ? 3 : 0,
                    borderColor: "#555",
                  },
                ]}
                onPress={() => setThemeColor(color)} // 👈 cambia globalmente
              />
            )
          )}
        </View>
      </View>

      {/* --- Sección de idioma --- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language</Text>
        <View style={styles.dropdown}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(value) => setSelectedLanguage(value)}
          >
            <Picker.Item label="Select One" value="" />
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Español" value="es" />
            <Picker.Item label="Français" value="fr" />
          </Picker>
        </View>
      </View>

      {/* --- Contacto --- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.socialRow}>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#DB4437" }]}>
            <Ionicons name="logo-google" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#000" }]}>
            <Ionicons name="logo-apple" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#1877F2" }]}>
            <Ionicons name="logo-facebook" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 40,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#b36b5e",
    borderRadius: 12,
    padding: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5A3A29",
    marginTop: 10,
  },
  username: {
    fontSize: 14,
    color: "#888",
  },
  section: {
    width: "85%",
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5A3A29",
    marginBottom: 10,
  },
  themeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  themeCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  socialButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
});