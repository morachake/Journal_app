import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { EvilIcons, Ionicons } from '@expo/vector-icons';

interface JournalItemProps {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  expanded: boolean;
  onToggleExpand: (id: number) => void;
}

const JournalItem: React.FC<JournalItemProps> = ({ id, title, content, category, date, expanded, onToggleExpand }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <EvilIcons name="calendar" size={24} color="#FF5987" style={styles.icon} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.dayText}>{category}</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <TouchableOpacity onPress={() => onToggleExpand(id)} style={styles.expandButton}>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={24}
            color="#FF5987"
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.body}>
        <Text style={styles.journalTitle}>{title}</Text>
        <Text
          style={styles.journalContent}
          numberOfLines={expanded ? undefined : 2}
        >
          {content}
        </Text>
      </View>
    </View>
  );
};

const Journal: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handlePress = (id: number) => {
    setExpandedId(prevId => (prevId === id ? null : id));
  };

  const journalEntries = [
    { id: 1, title: 'First Entry', content: 'Make food available for others to eat. This is an extended description to show how the text will look when the arrow is clicked and the content is expanded to reveal more details. The full content can be quite long, providing a comprehensive view of the journal entry.', category: 'Personal', date: 'Monday, July 15, 2023' },
    { id: 2, title: 'Second Entry', content: 'Another journal entry content. This can also be very long and detailed to show the expanded functionality.', category: 'Work', date: 'Tuesday, July 16, 2023' },
    { id: 3, title: 'First Entry', content: 'Make food available for others to eat. This is an extended description to show how the text will look when the arrow is clicked and the content is expanded to reveal more details. The full content can be quite long, providing a comprehensive view of the journal entry.', category: 'Personal', date: 'Monday, July 15, 2023' },
    { id: 4, title: 'First Entry', content: 'Make food available for others to eat. This is an extended description to show how the text will look when the arrow is clicked and the content is expanded to reveal more details. The full content can be quite long, providing a comprehensive view of the journal entry.', category: 'Personal', date: 'Monday, July 15, 2023' },
    { id: 5, title: 'First Entry', content: 'Make food available for others to eat. This is an extended description to show how the text will look when the arrow is clicked and the content is expanded to reveal more details. The full content can be quite long, providing a comprehensive view of the journal entry.', category: 'Personal', date: 'Monday, July 15, 2023' },
    { id: 6, title: 'First Entry', content: 'Make food available for others to eat. This is an extended description to show how the text will look when the arrow is clicked and the content is expanded to reveal more details. The full content can be quite long, providing a comprehensive view of the journal entry.', category: 'Personal', date: 'Monday, July 15, 2023' },
    { id: 7, title: 'First Entry', content: 'Make food available for others to eat. This is an extended description to show how the text will look when the arrow is clicked and the content is expanded to reveal more details. The full content can be quite long, providing a comprehensive view of the journal entry.', category: 'Personal', date: 'Monday, July 15, 2023' },
    { id: 8, title: 'First Entry', content: 'Make food available for others to eat. This is an extended description to show how the text will look when the arrow is clicked and the content is expanded to reveal more details. The full content can be quite long, providing a comprehensive view of the journal entry.', category: 'Personal', date: 'Monday, July 15, 2023' },
    { id: 9, title: 'First Entry', content: 'Make food available for others to eat. This is an extended description to show how the text will look when the arrow is clicked and the content is expanded to reveal more details. The full content can be quite long, providing a comprehensive view of the journal entry.', category: 'Personal', date: 'Monday, July 15, 2023' },
    { id: 10, title: 'First Entry', content: 'Make food available for others to eat. This is an extended description to show how the text will look when the arrow is clicked and the content is expanded to reveal more details. The full content can be quite long, providing a comprehensive view of the journal entry.', category: 'Personal', date: 'Monday, July 15, 2023' },
    { id: 11, title: 'First Entry', content: 'Make food available for others to eat. This is an extended description to show how the text will look when the arrow is clicked and the content is expanded to reveal more details. The full content can be quite long, providing a comprehensive view of the journal entry.', category: 'Personal', date: 'Monday, July 15, 2023' },
    { id: 12, title: 'First Entry', content: 'Make food available for others to eat. This is an extended description to show how the text will look when the arrow is clicked and the content is expanded to reveal more details. The full content can be quite long, providing a comprehensive view of the journal entry.', category: 'Personal', date: 'Monday, July 15, 2023' },
];

  return (
    <FlatList
      data={journalEntries}
      renderItem={({ item }) => (
        <JournalItem
          id={item.id}
          title={item.title}
          content={item.content}
          category={item.category}
          date={item.date}
          expanded={expandedId === item.id}
          onToggleExpand={handlePress}
        />
      )}
      keyExtractor={item => item.id.toString()}
    />
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
