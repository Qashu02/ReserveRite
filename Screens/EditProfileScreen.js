import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import colors from '../config/colors';
import updateProfileApi from '../api/updateprofile';
import Toast from 'react-native-toast-message';
import {UserContext} from "../Utils/userContext"

export default function EditProfileScreen({ navigation }) {
const { user, authToken } = useContext(UserContext);
const token = authToken;

console.log('Loaded token:', token)
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0]);
    }
  };

  const handleSave = async () => {
    setLoading(true);

    if (!token) {
      Toast.show({
        type: 'error',
        text1: 'Authentication error',
        text2: 'No valid token found. Please login again.',
      });
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);

   if (profilePic) {
  const filename = profilePic.uri.split('/').pop() || 'profile.jpg';
  const match = /\.(\w+)$/.exec(filename?.toLowerCase() || '');
  const ext = match ? match[1] : 'jpg';
  const type = `image/${ext}`;

  console.log('Uploading:', {
    uri: profilePic.uri,
    name: filename,
    type,
  });

  formData.append('profilePic', {
    uri: profilePic.uri,
    name: filename,
    type,
  });
}




      const response = await updateProfileApi.updateProfile(formData, token);

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Profile Updated!',
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to update profile.',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Something went wrong!',
      });
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
        {profilePic ? (
          <Image source={{ uri: profilePic.uri }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <AntDesign name="user" size={40} color="#999" />
            <Text style={{ color: '#999' }}>Tap to upload</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity
        onPress={handleSave}
        style={styles.saveBtn}
        disabled={loading}
      >
        <Text style={styles.saveText}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Text>
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
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
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
