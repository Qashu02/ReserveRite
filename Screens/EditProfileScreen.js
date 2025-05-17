import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import colors from '../config/colors';

export default function EditProfileScreen() {
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('9876543210');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    // Submit updated info to backend or local state
    alert('Profile Updated!');
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <AntDesign name="user" size={40} color="#999" />
            <Text style={{ color: '#999' }}>Tap to upload</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Input Fields */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />


      {/* Save Button */}
      <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  avatarWrapper: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100, height: 100, borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center',
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  saveBtn: {
    backgroundColor: colors.secondary,
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
