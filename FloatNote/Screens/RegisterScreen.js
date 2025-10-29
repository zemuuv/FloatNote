import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ref, set } from "firebase/database";
import { db } from "../Services/Conexion_BD";
import { Image } from "react-native";
import logo from "../assets/Logo.png";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !username || !password) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      // Generar un ID de usuario (usamos email reemplazando caracteres no válidos)
      const userId = email.replace(/[.@]/g, "_");

      // Guardar en la base de datos
      await set(ref(db, "users/" + userId), {
        email: email,
        username: username,
        password: password, // ⚠️ Solo para pruebas (no se debe guardar así en producción)
      });

      alert("Usuario registrado correctamente");
      navigation.navigate("Login");
    } catch (error) {
      alert("Error al registrar: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Crear Cuenta</Text>

      <TextInput
        placeholder="Correo Electrónico"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Nombre de usuario"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <Text style={styles.linkText}>
        ¿Ya tienes una cuenta?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Login")}
        >
          Inicia sesión
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 25,
  },
  logo: {
  width: 120,
  height: 120,
  marginBottom: 20,
  resizeMode: "contain",
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
