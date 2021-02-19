import React, { useState, useEffect } from 'react'
import { auth, db } from "../firebase";
import TweetInput from './TweetInput';
import styles from "./Feed.module.css";
import Post from './Post';
import { Grid } from "@material-ui/core";
import User from './User';

const Feed: React.FC = () => {
  const [ posts, setPosts] = useState([
    {
      id: "",
      avatar: "",
      image: "",
      text: "",
      timestamp: null,
      username: ""
    },
  ]);
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
      }))
    ));
    return () => {
      unSub();
    };
  }, []);
  return (
    <Grid container className={styles.feed}>
      <Grid item md={4}>
        <User/>
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
              />
            ))}
          </>
        }
      </Grid>
    </Grid>
  );
}
export default Feed
