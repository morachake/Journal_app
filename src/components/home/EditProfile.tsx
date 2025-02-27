import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';

interface EditProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (profile: { username?: string; email?: string; currentPassword?: string; newPassword?: string }) => Promise<void>;
  currentUsername: string;
  currentEmail: string;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isVisible, onClose, onSave, currentUsername, currentEmail }) => {
  const [username, setUsername] = useState(currentUsername);
  const [email, setEmail] = useState(currentEmail);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUsername(currentUsername);
    setEmail(currentEmail);
  }, [currentUsername, currentEmail]);

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await onSave({ username, email, currentPassword, newPassword });
      setCurrentPassword('');
      setNewPassword('');
      onClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Profile</Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
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
            placeholder="Current Password"
            value={currentPassword}
            secureTextEntry
            onChangeText={setCurrentPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={newPassword}
            secureTextEntry
            onChangeText={setNewPassword}
          />
          {isLoading ? (
            <ActivityIndicator size="large" color="#FF5987" />
          ) : (
            <>
              <Button title="Save" onPress={handleSave} />
              <Button title="Cancel" onPress={onClose} />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

export default EditProfileModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
