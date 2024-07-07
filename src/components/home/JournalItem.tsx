import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ActivityIndicator, Button } from 'react-native';
import { Entypo, Ionicons, AntDesign } from '@expo/vector-icons';
import { JournalItemProps } from '@/src/types/types';



const JournalItem: React.FC<JournalItemProps> = ({ id, title, content, category_name, date, expanded, onToggleExpand, onEdit, onDelete }) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {
    setIsLoading(true);
    onDelete(id);
    setIsLoading(false);
    setDeleteModalVisible(false);
  };

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
      <TouchableOpacity onPress={() => setDeleteModalVisible(true)} style={styles.deleteButton}>
        <AntDesign name="delete" size={24} color="#FF5987" />
      </TouchableOpacity>

      {/* Confirm Delete Modal */}
      <Modal
        visible={isDeleteModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Delete</Text>
            <Text style={styles.modalMessage}>Are you sure you want to delete this journal entry?</Text>
            {isLoading ? (
              <ActivityIndicator size="large" color="#FF5987" />
            ) : (
              <View style={styles.modalActions}>
                <Button title="Cancel" onPress={() => setDeleteModalVisible(false)} />
                <Button title="Delete" onPress={handleDelete} />
              </View>
            )}
          </View>
        </View>
      </Modal>
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
  deleteButton: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
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
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
