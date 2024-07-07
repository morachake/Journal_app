import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';

interface JournalItemProps {
  id: number;
  title: string;
  content: string;
  category_name: string;
  date: string;
  expanded: boolean;
  onToggleExpand: (id: number) => void;
  onEdit: () => void;
}

const JournalItem: React.FC<JournalItemProps> = ({ id, title, content, category_name, date, expanded, onToggleExpand, onEdit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onEdit}>
          <Entypo name="pencil" size={24} color="#FF5987" style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.dayText}>{category_name}</Text>
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

export default JournalItem;

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
