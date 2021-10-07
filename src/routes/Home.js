import { collection, onSnapshot, query, addDoc } from 'firebase/firestore';
import { dbService, storageService } from 'fbase';
import React, { useEffect, useState } from 'react';
import Nweet from 'components/Nweet';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
  console.log(userObj);
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState('');
  useEffect(() => {
    const q = query(collection(dbService, 'nweets'));
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
      console.log('nweetArr : ', nweetArr);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = '';
    if (attachment !== '') {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const uploadFile = await uploadString(fileRef, attachment, 'data_url');
      console.log(uploadFile);
      attachmentUrl = await getDownloadURL(uploadFile.ref);
    }
    const nweetPosting = {
      nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await addDoc(collection(dbService, 'nweets'), nweetPosting);
    setNweet('');
    setAttachment('');
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => {
    setAttachment('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="img" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
