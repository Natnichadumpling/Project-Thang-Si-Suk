import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase-config';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // สถานะในการเปิด/ปิดการแสดงรหัสผ่าน

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('เข้าสู่ระบบสำเร็จ!', `Welcome ${userCredential.user.email}`);
      // ลบการเด้งไปหน้า /contract ออก
      // router.replace('/contract');
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
            <Text style={styles.title}>เข้าสู่ระบบ</Text>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Image source={require('../assets/user.png')} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="ชื่อผู้ใช้หรืออีเมล"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Image source={require('../assets/lock.png')} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="รหัสผ่าน"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword} // ใช้สถานะในการควบคุมการแสดงรหัสผ่าน
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image
                  source={require('../assets/eye.png')}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>

            {/* ลิงก์ลืมรหัสผ่าน */}
            <TouchableOpacity onPress={() => router.push('/forgotpassword')}>
              <Text style={styles.forgotText}>เปลี่ยนรหัสผ่าน</Text>
            </TouchableOpacity>

            {/* เข้าสู่ระบบ */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginText}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>

            {/* สมัครสมาชิก */}
            <TouchableOpacity style={styles.signupButton} onPress={() => router.push('/register')}>
              <Text style={styles.signupText}>สมัครสมาชิก</Text>
            </TouchableOpacity>

            {/* ช่องทางอื่น ๆ */}
            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>ช่องทางอื่นๆ</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.socialContainer}>
              <Image source={require('../assets/facebook.png')} style={styles.socialIcon} />
              <Image source={require('../assets/google.png')} style={styles.socialIcon} />
              <Image source={require('../assets/line.png')} style={styles.socialIcon} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  logo: { width: 120, height: 120, marginBottom: 10, alignSelf: 'center' },
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
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#000' },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: '#a3cc01',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  icon: { width: 24, height: 24, marginRight: 8 },
  eyeIcon: { width: 20, height: 20, marginLeft: 8 },
  input: { flex: 1, fontSize: 16 },
  forgotText: {
    color: '#000',
    fontSize: 13,
    alignSelf: 'flex-end',
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#a3cc01',
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
    marginBottom: 12,
  },
  loginText: { color: '#000', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  signupButton: {
    backgroundColor: '#a3cc01',
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
  },
  signupText: { color: '#000', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
    width: '100%',
  },
  line: { flex: 1, height: 1, backgroundColor: '#000' },
  orText: { marginHorizontal: 10, fontSize: 14, color: '#000' },
  socialContainer: { flexDirection: 'row', justifyContent: 'center' },
  socialIcon: { width: 40, height: 40, marginHorizontal: 10 },
});
