import { useAuth } from '@/src/context/AuthContext';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(username, password);
      console.log("Login successful");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View>
        <Text style={{ color: '#FF5987', marginTop: 10 }}>
          
        </Text>
        <TouchableOpacity onPress={() => Alert.alert('Reset Password')}>
          <Text style={{ color: '#FF5987', marginTop: 10 }}>Reset Password</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signup} onPress={handleLogin}>
        <Text style={{color:'#111'}}>SignUp</Text>
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
