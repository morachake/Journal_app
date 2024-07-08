import { useAuth } from '@/src/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ToastAndroid } from 'react-native';

export default function Register() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signup } = useAuth();
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      await signup(username, email, password);
      console.log("Registration successful");
      if (Platform.OS === 'android') {
        ToastAndroid.show("Registration successful", ToastAndroid.LONG);
      } else {
        Alert.alert("Registration Successful", "You can now log in.");
      }
      navigation.navigate("Login");
    } catch (error) {
      console.error("Registration failed", error);
      if (Platform.OS === 'android') {
        ToastAndroid.show("Registration failed", ToastAndroid.LONG);
      } else {
        Alert.alert("Registration Failed", error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View>
        <TouchableOpacity onPress={() => Alert.alert('Reset Password')}>
          <Text style={{ color: '#FF5987', marginTop: 10 }}>Reset Password</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signup} onPress={() => navigation.navigate("Login")}>
        <Text style={{color:'#111'}}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF5F8',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF5987',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FF5987',
    borderRadius: 10,
    alignItems: 'center',
  },
  signup: {
    width: '100%',
    padding: 15,
    color: '#FF5987',
    borderWidth: 1,
    borderColor: '#FF5987',
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
