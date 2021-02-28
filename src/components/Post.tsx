import React, { useState, useEffect } from "react";
import styles from "./Post.module.css";
import { db } from "../firebase";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MessageIcon from "@material-ui/icons/Message";
import SendIcon from "@material-ui/icons/Send";
import DeleteIcon from '@material-ui/icons/Delete';
interface PROPS {
  postId: string;
  avatar: string;
  image: string;
  trainingArray: any;
  timestamp: any;
  username: string;
  postUid: string;
  updateProfile: any;
}
interface COMMENT {
  id: string;
  avatar: string;
  text: string;
  timestamp: any;
  username: string;
}
const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  }
}))
// -----------Postコンポーネント-----------
const Post: React.FC<PROPS> = (props) => {
  const user = useSelector(selectUser);
  const classes = useStyles();
  const [comment, setComment] = useState<string>("");
  const [openComments, setOpenComments] = useState<boolean>(false);
  const [comments, setComments] = useState<COMMENT[]>([]);
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
  // 投稿削除
  const deletePost = () => {
    if (user.uid === props.postUid) {
      db.collection("training_posts").doc(props.postId).delete();
    } else {
      console.log("failed to delete!")
    }
  };
  // データベースから投稿に紐づくコメント一覧を取得してstateに入れる
  useEffect(() => {
    const unSub = db
      .collection("training_posts")
      .doc(props.postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            text: doc.data().text,
            username: doc.data().username,
            timestamp: doc.data().timestamp,
          }))
        );
      });
    return () => {
      unSub();
    };
  }, [props.postId]);
  return (
    <div className={styles.post}>
      <div className={styles.post_avatar}>
        <Avatar
          src={props.avatar}
          className={styles.hoverAvatar}
          onClick={() => props.updateProfile(props.username, props.avatar)}/>
      </div>
      <div className={styles.post_body}>
        <div>
          <div className={styles.post_header}>
            <h3>
              <span
                className={styles.post_headerUser}
                onClick={() => props.updateProfile(props.username, props.avatar)}
              >@{props.username}</span>
              <span className={styles.post_headerTime}>
                {new Date(props.timestamp?.toDate()).toLocaleString()}
              </span>
            </h3>
          </div>
          <div className={styles.post_tweet}>
            {props.trainingArray.map((record: any, index: number) => (
              <p key={index} className="text-lg text-white font-bold">{record.trainingName} {record.trainingWeight}×{record.trainingReps}回</p>
            ))}
          </div>
        </div>
        {props.image && (
          <div className={styles.post_tweetImage}>
            <img src={props.image} alt="tweet" />
          </div>
        )}
        <MessageIcon
          className={styles.post_commentIcon}
          onClick={() => setOpenComments(!openComments)}
        />
        {
          user.uid === props.postUid &&
          <DeleteIcon
          className={styles.post_deleteIcon}
          onClick={deletePost}
        />
        }
        {openComments && (
          <>
            {
              comments.map((com) => (
                <div key={com.id} className={styles.post_comment}>
                  <Avatar src={com.avatar} className={classes.small}/>
                  <span className={styles.post_commentUser}>@{com.username}</span>
                  <span className={styles.post_commentText}>{com.text}</span>
                  <span className={styles.post_headerTime}>{new Date(com.timestamp?.toDate()).toLocaleString()}</span>
                </div>
              ))
            }
            <form onSubmit={newComment}>
              <div className={styles.post_form}>
              <input
                className={styles.post_input}
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
                  comment ? styles.post_button : styles.post_buttonDisable
                }
              >
                <SendIcon className={styles.post_sendIcon} />
              </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
export default Post
