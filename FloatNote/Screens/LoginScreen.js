import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { db } from "../Services/Conexion_BD";
import { ref, get, child } from "firebase/database";
import { Image } from "react-native";
import logo from "../assets/Logo.png";
import { useTheme } from "../Services/ThemeContext";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { themeColor } = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Completa todos los campos");
      return;
    }

    try {
      const dbRef = ref(db);
      const userId = email.replace(/[.@]/g, "_");

      const snapshot = await get(child(dbRef, `users/${userId}`));

      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.password === password) {
          alert(`Bienvenido ${userData.username}`);
          navigation.navigate("MainTabs");
        } else {
          alert("Contraseña incorrecta");
        }
      } else {
        alert("Usuario no encontrado");
      }
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Correo Electrónico"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.linkText}>
        ¿No tienes cuenta?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
          Regístrate aquí
        </Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 25,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
  width: 120,
  height: 120,
  marginBottom: 20,
  resizeMode: "contain",
},
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#E97451",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  checkMark: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  appName: {
    fontSize: 30,
    fontWeight: "700",
    color: "#333",
  },
  note: {
    color: "#E97451",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 25,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#A85636",
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
    textAlign: "center",
  },
  link: {
    color: "#E97451",
    fontWeight: "bold",
  },
});