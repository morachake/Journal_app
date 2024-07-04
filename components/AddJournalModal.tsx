import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface AddJournalModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (journal: { title: string; content: string; category: string; date: string }) => void;
}

export default function AddJournalModal({ isVisible, onClose, onSave }: AddJournalModalProps) {
  const [journal, setJournal] = useState({ title: '', content: '', category: '', date: '' });

  const handleJournalChange = (key: string, value: string) => {
    setJournal(prevState => ({ ...prevState, [key]: value }));
  };

  const handleSave = () => {
    onSave(journal);
    setJournal({ title: '', content: '', category: '', date: '' });
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
          <Text style={styles.modalTitle}>Add Journal</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={journal.title}
            onChangeText={(text) => handleJournalChange('title', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Content"
            value={journal.content}
            onChangeText={(text) => handleJournalChange('content', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={journal.category}
            onChangeText={(text) => handleJournalChange('category', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={journal.date}
            onChangeText={(text) => handleJournalChange('date', text)}
          />
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

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
});
