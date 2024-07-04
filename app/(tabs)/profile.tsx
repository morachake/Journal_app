import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EvilIcons } from '@expo/vector-icons';
import EditProfileModal from '@/components/home/EditProfile';


interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [profile, setProfile] = useState({
    username: 'Jacob Moracha',
    email: 'jacobmoracha@gmail.com',
  });

  const handleEditPress = () => {
    setEditModalVisible(true);
  };

  const handleSaveProfile = (updatedProfile: { username: string; currentPassword: string; newPassword: string }) => {
    console.log("Profile updated:", updatedProfile);
    setProfile(prevProfile => ({ ...prevProfile, username: updatedProfile.username }));
    setEditModalVisible(false);
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
      <EditProfileModal
        isVisible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSave={handleSaveProfile}
        currentUsername={profile.username}
      />
    </SafeAreaView>
  );
}

export default Profile;

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
});
