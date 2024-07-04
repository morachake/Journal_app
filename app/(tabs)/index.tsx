import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import Calendar from '@/components/home/Calendar';
import Journal from '@/components/home/Journal';
import NavBar from '@/components/home/NavBar';
import { FloatingAction } from 'react-native-floating-action';
import AddJournalModal from '@/components/AddJournalModal';
import AddCategoryModal from '@/components/AddCategoryModal';
import { Ionicons } from '@expo/vector-icons';
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
  const [isJournalModalVisible, setJournalModalVisible] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);

  const handleActionPress = (name: string) => {
    if (name === "bt_add_journal") {
      setJournalModalVisible(true);
    } else if (name === "bt_add_category") {
      setCategoryModalVisible(true);
    }
  };

  const handleSaveJournal = (journal: { title: string; content: string; category: string; date: string }) => {
    console.log("Journal saved:", journal);
    setJournalModalVisible(false);
  };

  const handleSaveCategory = (category: string) => {
    console.log("Category saved:", category);
    setCategoryModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavBar />
        {/* <Calendar /> */}
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  container: {
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