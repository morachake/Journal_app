import { Category } from '@/src/types/types';
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';


interface CategoryFilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  categories: Category[];
  onSelectCategory: (categoryId: number | null) => void;
}

const CategoryFilterModal: React.FC<CategoryFilterModalProps> = ({ isVisible, onClose, categories, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleSelectCategory = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId);
    onClose();
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
          <Text style={styles.modalTitle}>Select Category</Text>
          <TouchableOpacity onPress={() => handleSelectCategory(null)} style={styles.categoryButton}>
            <Text style={styles.categoryText}>All</Text>
          </TouchableOpacity>
          {categories?.map(category => (
            <TouchableOpacity key={category.id} onPress={() => handleSelectCategory(category.id)} style={styles.categoryButton}>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default CategoryFilterModal;

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
  categoryButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  categoryText: {
    fontSize: 16,
  },
});
