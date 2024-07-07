import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import JournalItem from './JournalItem';
import AddJournalModal from './AddJournalModal';
import { useJournal } from '@/src/context/JournalContext';

const Journal: React.FC = () => {
  const { journalEntries, fetchJournals, categories, fetchCategories, updateJournal, addJournal } = useJournal();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [journalToEdit, setJournalToEdit] = useState<any>(null);

  useEffect(() => {
    fetchJournals();
    fetchCategories();
  }, []);

  const handlePress = (id: number) => {
    setExpandedId(prevId => (prevId === id ? null : id));
  };

  const handleEdit = (journal: any) => {
    setJournalToEdit({
      id: journal.id,
      title: journal.title,
      content: journal.content,
      category: journal.category,
      date: journal.date
    });
    setEditModalVisible(true);
  };

  const handleSaveJournal = async (journal: any) => {
    try {
      if (journal.id) {
        await updateJournal(journal);
      } else {
        await addJournal(journal);
      }
      setEditModalVisible(false);
      fetchJournals();
    } catch (error) {
      console.error("Failed to save journal:", error);
    }
  };

  return (
    <>
      <FlatList
        data={journalEntries}
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
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
      {isEditModalVisible && (
        <AddJournalModal
          isVisible={isEditModalVisible}
          onClose={() => setEditModalVisible(false)}
          onSave={handleSaveJournal}
          journalToEdit={journalToEdit}
          categories={categories}
        />
      )}
    </>
  );
};

export default Journal;

const styles = StyleSheet.create({
  container: {
    borderColor: '#FF5987',
    borderWidth: 1,
    borderRadius: 19,
    marginTop: 10,
    width: '100%',
    padding: 15,
    backgroundColor: '#FFF5F8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  dayText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  body: {
    marginTop: 10,
  },
  journalTitle: {
    fontSize: 16,
    color: '#FF5987',
    fontWeight: '700',
    marginBottom: 5,
  },
  journalContent: {
    fontSize: 14,
    color: '#333',
  },
  expandButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
