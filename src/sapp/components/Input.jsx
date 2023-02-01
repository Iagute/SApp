import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc, } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase';
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import { MdAttachFile, MdImage, MdSend } from "react-icons/md";

export const Input = () => {

  const [text, setText] = useState("")
  const [img, setImg] = useState(null)
  const [err, setErr] = useState(false)

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const handleSend = async () => {

    if(img){
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          setErr(true);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]: serverTimestamp(),
    });

    setText("")
    setImg(null)
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  return (
    <div className='input'>

      <div className='inputIcons'>
        <input 
          type="file" 
          style={{display:"none"}} 
          id="file" 
          onChange={e=>setImg(e.target.files[0])}
        />
        <label htmlFor="file">
            <MdImage className='inputIcon'/>
        </label>
      </div>

      <input 
        onKeyDown={(text === "" && img === null) ? null : handleKey}
        type='text' 
        placeholder='Write your message here...' 
        onChange={e=>setText(e.target.value)}  
        value={text}
      />
      <MdSend onClick={ (text === "" && img === null) ? null : handleSend } className='inputIcon'/>

    </div>
  )
}
