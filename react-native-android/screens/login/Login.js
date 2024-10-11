import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { loginUser } from "../../utils/api";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Por favor ingresa tu nombre de usuario y contraseña.');
      return;
    }

    try {
      const response = await loginUser(username, password);

      if (response.ok) {
        const data = await response.json();
        console.log('Login exitoso, token:', data.token);
        navigation.navigate('Home');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.error || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en la solicitud de login:', error);
      Alert.alert('Error', 'Hubo un problema al iniciar sesión. Intenta de nuevo.');
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
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
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // Texto del botón claro
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;