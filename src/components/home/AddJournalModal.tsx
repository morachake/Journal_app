import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Dropdown } from 'react-native-element-dropdown';

interface JournalEntry {
  id?: number;
  title: string;
  content: string;
  category: number;
  date: string;
}

interface AddJournalModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (journal: JournalEntry) => void;
  journalToEdit?: JournalEntry | null;
  categories: { id: number; name: string }[];
}

export default function AddJournalModal({ isVisible, onClose, onSave, journalToEdit, categories }: AddJournalModalProps) {
  const [journal, setJournal] = useState<JournalEntry>({ title: '', content: '', category: categories[0]?.id || 0, date: '' });
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  useEffect(() => {
    console.log('Categories:', categories);
    if (journalToEdit) {
      setJournal(journalToEdit);
      console.log('Editing journal:', journalToEdit);
    } else {
      setJournal({ title: '', content: '', category: categories[0]?.id || 0, date: '' });
      console.log('Creating new journal');
    }
  }, [journalToEdit, categories]);

  const handleJournalChange = (key: keyof JournalEntry, value: any) => {
    setJournal(prevState => ({ ...prevState, [key]: value }));
  };

  const handleSave = () => {
    console.log('Saving journal:', journal);
    onSave(journal);
    setJournal({ title: '', content: '', category: categories[0]?.id || 0, date: '' });
  };

  const handleDateSelect = (day: { dateString: string }) => {
    handleJournalChange('date', day.dateString);
    setCalendarVisible(false);
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
          <Text style={styles.modalTitle}>{journal.id ? "Edit Journal" : "Add Journal"}</Text>
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
          <Dropdown
            data={categories}
            labelField="name"
            valueField="id"
            placeholder="Select Category"
            value={journal.category}
            onChange={item => {
              console.log('Selected category:', item);
              handleJournalChange('category', item.id);
            }}
            style={styles.input}
          />
          <TextInput
            style={styles.input}
            placeholder="Date (YYYY-MM-DD)"
            value={journal.date}
            onFocus={() => setCalendarVisible(true)}
          />
          {isCalendarVisible && (
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={{ [journal.date]: { selected: true } }}
            />
          )}
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
