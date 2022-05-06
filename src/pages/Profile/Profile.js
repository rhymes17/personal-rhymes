import React, {useEffect, useState } from 'react'
import './profile.css';
import { storage, db, auth } from '../../firebase';
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { getDoc, doc, updateDoc } from 'firebase/firestore';

const Profile = () => {

  const [img, setImg] = useState('');
  const [user, setUser] = useState();
  useEffect(() => {

    getDoc(doc(db, 'users', auth.currentUser.uid)).then(docSnap => {
      if(docSnap.exists){
        setUser(docSnap.data());
      }
    });

      if(img){
        
        const uploadImg = async () => {
          const imgRef = ref(storage, `avatar/${new Date().getTime()} - ${img.name}`);
        
          try{
            if(user.avatarPath){
              await deleteObject(ref(storage, user.avatarPath));
            }

            const snap = await uploadBytes(imgRef, img);
            const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
  
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
              avatar: url,
              avatarPath: snap.ref.fullPath,
            });
            setImg("");
            
          }catch(err){
            console.log(err.message);
          }
          
        };
        uploadImg();
      }
  }, [img, user])

  return user ? (
    <section>
      <div className='profile__section'>
        <div className='profile__image'>
          <label htmlFor="imgUpload">
          <img src={user.avatar} alt="dp" />
          </label>
          <input type='file' accept='image/' style={{ display: 'none'}} id="imgUpload" onChange={e => setImg(e.target.files[0])}/>
          {/* { user.avatar ? <MdOutlineDeleteOutline className="icons"/> : null } */}
        </div>


        <div className='profile__info'>
          <div className='text__container'>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <div className='line'></div>
          <small className='joined'>Joined on: {user.createAt.toDate().toDateString()}</small>
        </div>

      </div>
      
    </section>
  ) : null;
}

export default Profile