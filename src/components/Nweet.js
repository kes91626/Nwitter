import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from '@firebase/storage';

const Nweet = ({ nweetObj, isOwner }) => {
  console.log('nweetObj : ', nweetObj);
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const NweetDoc = doc(dbService, 'nweets', `${nweetObj.id}`);
  const Nweetref = ref(storageService, nweetObj.attachmentUrl);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?');
    if (ok) {
      await deleteDoc(NweetDoc);
      await deleteObject(Nweetref);
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(NweetDoc, {
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="nweet"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.nweet}</h4>
          {nweetObj.attachmentUrl && (
            <img
              src={nweetObj.attachmentUrl}
              width="50px"
              height="50px"
              alt="img"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
