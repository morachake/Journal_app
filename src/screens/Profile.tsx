import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EvilIcons } from '@expo/vector-icons';
import EditProfileModal from '../components/home/EditProfile';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const { user, editProfile, logout } = useAuth();
  const [profile, setProfile] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });

  const handleEditPress = () => {
    setEditModalVisible(true);
  };

  const handleSaveProfile = async (updatedProfile: { username: string; email: string; currentPassword: string; newPassword: string }) => {
    try {
      await editProfile(updatedProfile.username, updatedProfile.email, updatedProfile.newPassword);
      setProfile(prevProfile => ({ ...prevProfile, username: updatedProfile.username, email: updatedProfile.email }));
      setEditModalVisible(false);
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.user}>
          <EvilIcons name="user" size={100} color="#FF5987" />
          <TouchableOpacity onPress={handleEditPress} style={styles.editIcon}>
            <EvilIcons name="pencil" size={24} color="#FF5987" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{profile.username}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{profile.email}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <EditProfileModal
        isVisible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSave={handleSaveProfile}
        currentUsername={profile.username}
        currentEmail={profile.email}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userContainer: {
    marginBottom: 20,
  },
  user: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },
  info: {
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#FF5987',
    borderRadius: 10,
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 13,
  },
});
