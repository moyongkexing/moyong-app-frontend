import React, { useState, useEffect } from 'react'
import { auth, db } from "../firebase";
import TweetInput from './TweetInput';
import styles from "./Feed.module.css";
import Post from './Post';
import { Grid } from "@material-ui/core";
import User from './User';
import { selectUser } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
const Feed: React.FC = () => {
  const dispatch = useDispatch();
  const [ posts, setPosts] = useState([{
      id: "",
      avatar: "",
      image: "",
      text: "",
      timestamp: null,
      username: "",
      uid: null,
    },
  ]);
  const user = useSelector(selectUser);
  const [profileUser, setProfileUser ] = useState({
    profileUserName: user.displayName,
    avatar: user.photoUrl
    }
  )
  // データベースから投稿一覧を取得してstateに入れる
  useEffect(() => {
    const unSub = db
    .collection("posts")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => setPosts(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        avatar: doc.data().avatar,
        image: doc.data().image,
        text: doc.data().text,
        timestamp: doc.data().timestamp,
        username: doc.data().username,
        uid: doc.data().uid
      }))
    ));
    return () => {
      unSub();
    };
  }, []);
  //ユーザープロフィール画面の表示をユーザーごとに切り替える
  const updateProfile = (name:string, avatar:string) => {
    console.log(`${name} + ${avatar}`);
    setProfileUser({
      profileUserName: name,
      avatar: avatar,
    })
  }
  return (
    <Grid container className={styles.feed}>
      <Grid item md={4}>
        <User
          profileUserName={profileUser.profileUserName}
          profileUserAvatar={profileUser.avatar}
        />
      </Grid>
      <Grid item md={8}>
        <TweetInput />
        {posts[0].id &&
          <>
            {posts.map((post) => (
              <Post
                key={post.id}
                postId={post.id}
                avatar={post.avatar}
                image={post.image}
                text={post.text}
                timestamp={post.timestamp}
                username={post.username}
                uid={post.uid}
                updateProfile={updateProfile}
              />
            ))}
          </>
        }
      </Grid>
    </Grid>
  );
}
export default Feed
