// src/app/auth/page.tsx

'use client';  // ระบุว่าเป็น Client Component

import { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";  // ใช้ next/navigation สำหรับ Next.js

import { auth } from "../../libs/firebase"; // ปรับ path ให้ถูกต้อง
import "./auth.css";  // ปรับ path ให้ถูกต้อง

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();  // ใช้ router จาก Next.js

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage("✅ ล็อกอินสำเร็จ! กำลังนำทางไปยังหน้า Home...");
      setTimeout(() => {
        router.push("/home"); // เปลี่ยนหน้าไป Home
      }, 2000);
    } catch (error) {
      setErrorMessage("❌ อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="login-container">
      <div className="background-bar"></div>

      <div className="form-wrapper">
        <img src="/logo2.png" alt="Thang Si Suk" className="logo" />
        <h2>เข้าสู่ระบบ</h2>

        <form onSubmit={handleLogin} className="form-container">
          <div className="container">
            <input type="email" name="email" placeholder="อีเมล" required ref={emailRef} />
            <input type="password" name="password" placeholder="รหัสผ่าน" required ref={passwordRef} />
            <button type="submit">ยืนยัน</button>

            <p className="register-text">หากยังไม่ได้สมัครสมาชิก?</p>
            <button className="register-btn" onClick={() => router.push("/register")}>
              สมัครสมาชิก
            </button>
          </div>

          {/* ข้อความแจ้งเตือน */}
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
