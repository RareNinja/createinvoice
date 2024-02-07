import { signInWithEmailAndPassword } from 'firebase/auth';
import react, { useState } from 'react';
import { auth } from '../firebase';

type UserProps = {
  email: string,
  password: string
}

const PageLogin = () => {

  const [user, setUser] = useState<UserProps>({ email: '', password: '' })

  const handleUser = (key: string, value: string) => {
    setUser((oldValues: any) => ({ ...oldValues, [key]: value }))
  }

  const onSubmit = async () => {
    await signInWithEmailAndPassword(auth, user.email, user.password)
      .then(() => { })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-login-credentials") {
          // setErrorMessage("Email ou senha inválidos, por favor verifique e tente novamente!");
        } else if (error.code === "auth/invalid-credential") {
          // setErrorMessage("Email ou senha inválidos, por favor verifique e tente novamente!");
        }
      });
  }

  return (
    <div >
      <div className=' flex  gap-4'>
        teste
        <input type="text" onChange={(e: any) => { handleUser("email", e.target.value) }} />
        <input type="text" onChange={(e: any) => { handleUser("password", e.target.value) }} />
        <button className=' bg-green-500 px-4 py-2 rounded' onClick={onSubmit}>Login</button>
      </div>
    </div>
  );
}

export default PageLogin; 