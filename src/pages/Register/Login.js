import React, {useState} from 'react'
import './register.css';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth, db } from '../../firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';

const Login = () => {

    const [data, setData] = useState({
        email: "",
        password: "",
        error: null,
        loading: false,
    });

    const history = useHistory();

    const {email,password,error,loading} = data;

    const handleChange = (e) =>{
        setData({...data, [e.target.name]: e.target.value });
    } 

    const handleSubmit = async e => {
        e.preventDefault();

        setData({...data, error: null , loading: true});

        try{
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            await updateDoc(doc(db, 'users', result.user.uid), {
                isOnline: true,
            });

            setData({ email: "", password: "", error: null, loading: false});
            history.replace('/');
        }catch(err){
            setData({...data, error: err.message, loading: false});
        }
    }

  return (
    <section>
        <h3>Let's RHYME</h3>
        <form className='form' onSubmit={handleSubmit}>
          {/* <input type="text" name="name" value={name} onChange={handleChange} placeholder="Your Full Name" required /> */}
          <input type="email" name="email" value={email} onChange={handleChange} placeholder="Your Email" required />
          <input type="password" name="password" value={password} onChange={handleChange} placeholder="Enter Your Password" required />
          {error ? <p className='error'>{error}</p> : null}
          <button disabled={loading} type='submit' className='btn btn__secondary'>{ loading ? 'Logging in...' : 'Login' }</button>
        </form>
    </section>
  )
}

export default Login;