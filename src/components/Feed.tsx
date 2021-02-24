import React, { useState, useEffect } from 'react'
import { auth, db } from "../firebase";
import TrainingInput from './TrainingInput';
import styles from "./Feed.module.css";
import Post from './Post';
import { Grid, Box } from "@material-ui/core";
import User from './User';
import { selectUser } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
const Feed: React.FC = () => {
  const dispatch = useDispatch();
  const [ posts, setPosts] = useState([{
      id: "",
      avatar: "",
      image: "",
      trainingArray: [],
      timestamp: null,
      username: "",
      uid: "",
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
    .collection("training_posts")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => setPosts(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        avatar: doc.data().avatar,
        image: doc.data().image,
        trainingArray: doc.data().training_array,
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
        <Box display="flex" justifyContent="flex-start">
          <User
            profileUserName={profileUser.profileUserName}
            profileUserAvatar={profileUser.avatar}
          />
        </Box>
      </Grid>
      <Grid item md={8}>
        <TrainingInput />
        {posts.length 
          ?
          <>
            {posts.map((post) => (
              <Post
                key={post.id}
                postId={post.id}
                avatar={post.avatar}
                image={post.image}
                trainingArray={post.trainingArray}
                timestamp={post.timestamp}
                username={post.username}
                postUid={post.uid}
                updateProfile={updateProfile}
              />
            ))}
          </>
          : <p>no posts...</p>
        }
      </Grid>
    </Grid>
  );
}
export default Feed
