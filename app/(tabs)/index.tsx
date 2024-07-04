import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FloatingAction } from 'react-native-floating-action';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '@/components/home/NavBar';
import AddJournalModal from '@/components/AddJournalModal';
import AddCategoryModal from '@/components/AddCategoryModal';
import Journal from '@/components/home/Journal';

interface JournalEntry {
  title: string;
  content: string;
  category: string;
  date: string;
}

const actions = [
  {
    text: "New Journal",
    icon: <Ionicons name="add" size={24} color="white" />,
    name: "bt_add_journal",
    position: 1
  },
  {
    text: "New Category",
    icon: <Ionicons name="add" size={24} color="white" />,
    name: "bt_add_category",
    position: 2
  }
];

export default function HomeScreen() {
  const [isJournalModalVisible, setJournalModalVisible] = useState<boolean>(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState<boolean>(false);
  const [journalToEdit, setJournalToEdit] = useState<JournalEntry | null>(null);

  const handleActionPress = (name: string) => {
    if (name === "bt_add_journal") {
      setJournalToEdit(null);
      setJournalModalVisible(true);
    } else if (name === "bt_add_category") {
      setCategoryModalVisible(true);
    }
  };

  const handleSaveJournal = (journal: JournalEntry) => {
    console.log("Journal saved:", journal);
    setJournalModalVisible(false);
  };

  const handleSaveCategory = (category: string) => {
    console.log("Category saved:", category);
    setCategoryModalVisible(false);
  };

  const handleEditJournal = (journal: JournalEntry) => {
    setJournalToEdit(journal);
    setJournalModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavBar />
      <View style={styles.container}>
        <Journal />
      </View>
      <FloatingAction
        actions={actions}
        onPressItem={handleActionPress}
        floatingIcon={<View style={styles.floatingIcon}><Text style={styles.iconText}>+</Text></View>}
      />
      <AddJournalModal
        isVisible={isJournalModalVisible}
        onClose={() => setJournalModalVisible(false)}
        onSave={handleSaveJournal}
        journalToEdit={journalToEdit}
      />
      <AddCategoryModal
        isVisible={isCategoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
        onSave={handleSaveCategory}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF5987',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
