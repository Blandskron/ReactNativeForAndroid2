import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { registerUser } from "../../utils/api";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    if (!username || !password || !email) {
      Alert.alert('Error', 'Por favor llena todos los campos.');
      return;
    }

    try {
      const response = await registerUser(username, password, email); // Llamada a la API abstraída

      if (response.ok) {
        const data = await response.json();
        Alert.alert(
          'Éxito',
          data.message || 'Usuario registrado exitosamente',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login'),
            },
          ]
        );
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.error || 'Hubo un problema al registrar el usuario.');
      }
    } catch (error) {
      console.error('Error en la solicitud de registro:', error);
      Alert.alert('Error', 'Hubo un problema al registrar el usuario. Intenta de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Usuario</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        placeholder="Ingresa tu usuario"
        placeholderTextColor="#aaa"
      />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Ingresa tu contraseña"
        placeholderTextColor="#aaa"
      />
      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Ingresa tu correo"
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1a1a1a', // Fondo oscuro
  },
  label: {
    fontSize: 18,
    color: '#e0e0e0', // Texto claro
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#555', // Borde oscuro
    backgroundColor: '#2a2a2a', // Fondo de input más oscuro
    padding: 10,
    borderRadius: 8,
    color: '#fff', // Texto claro
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#444', // Botón oscuro
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // Texto del botón claro
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Register;