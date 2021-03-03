import React, { useState } from 'react'
import { db } from "../firebase";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import SendIcon from "@material-ui/icons/Send";

interface PROPS {
  postId: string;
}
const CommentInput: React.FC<PROPS> = (props) => {
  const user = useSelector(selectUser);
  const [comment, setComment] = useState("");
  const newComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("training_posts").doc(props.postId).collection("comments").add({
      avatar: user.photoUrl,
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName,
    });
    setComment("");
  }
  return (
    <div>
      <form onSubmit={newComment}>
        <div className="m-10 relative flex">
        <input
          className="outline-none border-none p-3 rounded-lg mr-2"
          type="text"
          placeholder="Type new comment..."
          value={comment}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setComment(e.target.value)
          }}
        />
        <button 
          type="submit"
          disabled={!comment}
          className={
            comment
            ? "border-none text-whiteSmoke bg-transparent cursor-pointer"
            : "hidden"
          }
        >
          <SendIcon/>
        </button>
        </div>
      </form>
    </div>
  )
}

export default CommentInput;
