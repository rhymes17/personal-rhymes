import React, {useState} from 'react'
import './register.css';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { auth, db } from '../../firebase';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';

const Register = () => {

    const [data, setData] = useState({
        name:"",
        email: "",
        password: "",
        error: null,
        loading: false,
    });

    const history = useHistory();

    const {name,email,password,error,loading} = data;

    const handleChange = (e) =>{
        setData({...data, [e.target.name]: e.target.value });
    } 

    const handleSubmit = async e => {
        e.preventDefault();

        setData({...data, error: null , loading: true});

        // if(!name || !email || !password){
        //     setData({...data, error: 'All fields are required'});
        // }

        try{
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await setDoc(doc(db, 'users', result.user.uid), {
                uid : result.user.uid,
                name,
                email,
                createAt: Timestamp.fromDate(new Date()),
                isOnline: true,
            });

            setData({name: "", email: "", password: "", error: null, loading: false});
            history.replace('/');
        }catch(err){
            setData({...data, error: err.message, loading: false});
        }
    }

  return (
    <section>
        <h3>Create An Account</h3>
        <form className='form' onSubmit={handleSubmit}>
          <input type="text" name="name" value={name} onChange={handleChange} placeholder="Your Full Name" required />
          <input type="email" name="email" value={email} onChange={handleChange} placeholder="Your Email" required />
          <input type="password" name="password" value={password} onChange={handleChange} placeholder="Create Password" required />
          {error ? <p className='error'>{error}</p> : null}
          <button disabled={loading} type='submit' className='btn btn__secondary'>{loading ? 'Creating....': 'Register'}</button>
        </form>
    </section>
  )
}

export default Register