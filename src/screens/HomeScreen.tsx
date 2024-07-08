import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FloatingAction } from 'react-native-floating-action';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/home/NavBar';
import AddJournalModal from '../components/home/AddJournalModal';
import Journal from '../components/home/Journal';
import AddCategoryModal from '../components/home/AddCategoryModal';
import { useJournal } from '../context/JournalContext';
import { JournalEntry } from '../types/types';
import CategoryFilterModal from '../components/home/CategoryFilterModal';

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
  const [isCategoryFilterModalVisible, setCategoryFilterModalVisible] = useState<boolean>(false);
  const [journalToEdit, setJournalToEdit] = useState<JournalEntry | null>(null);
  const [filterPeriod, setFilterPeriod] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { addJournal, addCategory, updateJournal, categories } = useJournal();
  
  const handleActionPress = (name: string) => {
    if (name === "bt_add_journal") {
      setJournalToEdit(null);
      setJournalModalVisible(true);
    } else if (name === "bt_add_category") {
      setCategoryModalVisible(true);
    }
  };

  const handleSaveJournal = async (journal: JournalEntry) => {
    if (journal.id) {
      await updateJournal(journal);
    } else {
      await addJournal(journal);
    }
    setJournalModalVisible(false);
  };

  const handleSaveCategory = async (category: string) => {
    await addCategory(category);
    setCategoryModalVisible(false);
  };

  const handleEditJournal = (journal: JournalEntry) => {
    setJournalToEdit(journal);
    setJournalModalVisible(true);
  };

  const handleFilterPeriod = (period: string) => {
    setFilterPeriod(period);
  };

  const handleSelectCategory = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavBar />
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => handleFilterPeriod('today')} style={styles.filterButton}>
          <Text style={styles.filterText}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterPeriod('week')} style={styles.filterButton}>
          <Text style={styles.filterText}>This Week</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterPeriod('month')} style={styles.filterButton}>
          <Text style={styles.filterText}>This Month</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterPeriod('all')} style={styles.filterButton}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategoryFilterModalVisible(true)} style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Journal onPressItem={handleEditJournal} filterPeriod={filterPeriod} selectedCategory={selectedCategory} />
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
        categories={categories}
      />
      <AddCategoryModal
        isVisible={isCategoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
        onSave={handleSaveCategory}
      />
      <CategoryFilterModal
        isVisible={isCategoryFilterModalVisible}
        onClose={() => setCategoryFilterModalVisible(false)}
        categories={categories}
        onSelectCategory={handleSelectCategory}
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF5F8',
  },
  filterButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FF5987',
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
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
