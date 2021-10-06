import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from 'firebase/firestore';

const Home = () => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
    const dbNweets = await getDocs(collection(dbService, 'nweets'));
    dbNweets.forEach((documnet) => {
      const nweetObject = { ...documnet.data(), id: documnet.id };
    });
  };
  useEffect(() => {
    getNweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, 'nweets'), {
      nweet,
      createdAt: serverTimestamp(),
    });
    setNweet('');
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  console.log(nweets);
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
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
};
export default Home;
