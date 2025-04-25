import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router'; // นำเข้า useRouter
import { useNavigation } from '@react-navigation/native'; // ใช้ useNavigation
import { auth } from '../config/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterScreen() {
  const router = useRouter(); 
  const navigation = useNavigation(); // เพิ่มการใช้งาน navigation
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('รหัสผ่านไม่ตรงกัน');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('สมัครสมาชิกสำเร็จ!');
      // ใช้ navigation เพื่อไปหน้า contract
      navigation.replace('contract'); // ใช้ navigation.replace แทน router.replace
    } catch (error) {
      Alert.alert('เกิดข้อผิดพลาด', error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
      imageStyle={{ backgroundColor: '#BDF21D' }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image source={require('../assets/logo2.png')} style={styles.logo} />
          <View style={styles.whiteBox}>
            <Text style={styles.header}>สมัครสมาชิก</Text>

            <View style={styles.inputContainer}>
              <Image source={require('../assets/user.png')} style={styles.icon} />
              <TextInput
                placeholder="ชื่อ"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Image source={require('../assets/email.png')} style={styles.icon} />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Image source={require('../assets/lock.png')} style={styles.icon} />
              <TextInput
                placeholder="รหัสผ่าน"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image source={require('../assets/eye.png')} style={styles.eyeIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Image source={require('../assets/lock.png')} style={styles.icon} />
              <TextInput
                placeholder="ยืนยันรหัสผ่าน"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image source={require('../assets/eye.png')} style={styles.eyeIcon} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>ยืนยัน</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
    alignSelf: 'center',
  },
  whiteBox: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#a3cc01',
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '100%',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: '#a3cc01',
    borderRadius: 10,
    paddingVertical: 12,
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
