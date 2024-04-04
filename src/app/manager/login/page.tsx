'use client'
import styles from './login.module.css';
import { fireAuth } from "@/Firebase/base";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginManager = () => {
    signInWithEmailAndPassword(fireAuth, username, password)
      .then((res) => {
        if (res) {
          if (res.user.email === 'admin@manager.com') {
            router.push('/manager');
          } else {
            signOut(fireAuth)
              .then(() => window.location.reload());
          }
        } else {
          signOut(fireAuth)
            .then(() => window.location.reload());
        }
      })
  }

  return (
    <section className={styles.formBox}>
      Logged In
      <form onSubmit={(e) => { e.preventDefault(); loginManager() }}>
        <div>
          <span>Username</span>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <span>Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div>
          <button>Login</button>
        </div>
      </form>
    </section>
  );
}

export default Login;