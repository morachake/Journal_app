import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import JournalItem from './JournalItem';
import { useJournal } from '@/src/context/JournalContext';
import { JournalEntry } from '@/src/types/types';


interface JournalProps {
  onPressItem: (journal: JournalEntry) => void;
  filterPeriod: string;
  selectedCategory: number | null;
}

const Journal: React.FC<JournalProps> = ({ onPressItem, filterPeriod, selectedCategory }) => {
  const { journalEntries, fetchJournals, categories, fetchCategories, updateJournal, addJournal, deleteJournal } = useJournal() as JournalContextType;
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filteredJournals, setFilteredJournals] = useState<JournalEntry[]>([]);

  useEffect(() => {
    fetchJournals();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterJournals();
  }, [journalEntries, filterPeriod, selectedCategory]);

  const filterJournals = () => {
    let filtered = journalEntries;
    const now = new Date();

    if (filterPeriod === 'today') {
      filtered = journalEntries.filter(entry => new Date(entry.date).toDateString() === now.toDateString());
    } else if (filterPeriod === 'week') {
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      filtered = journalEntries.filter(entry => new Date(entry.date) >= startOfWeek);
    } else if (filterPeriod === 'month') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      filtered = journalEntries.filter(entry => new Date(entry.date) >= startOfMonth);
    }

    if (selectedCategory !== null) {
      filtered = filtered.filter(entry => entry.category === selectedCategory);
    }

    setFilteredJournals(filtered);
  };

  const handlePress = (id: number) => {
    setExpandedId(prevId => (prevId === id ? null : id));
  };

  const handleEdit = (journal: JournalEntry) => {
    onPressItem(journal);
  };

  const handleDeleteJournal = async (id: number) => {
    try {
      await deleteJournal(id);
      fetchJournals();
    } catch (error) {
      console.error("Failed to delete journal:", error);
    }
  };

  return (
    <>
      {filteredJournals.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No journals found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredJournals}
          renderItem={({ item }) => (
            <JournalItem
              id={item.id}
              title={item.title}
              content={item.content}
              category_name={item.category_name}
              date={item.date}
              expanded={expandedId === item.id}
              onToggleExpand={handlePress}
              onEdit={() => handleEdit(item)}
              onDelete={handleDeleteJournal}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </>
  );
};

export default Journal;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});
