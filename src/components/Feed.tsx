import React, { useState, useEffect } from 'react'
import styles from './Feed.module.css';
import { db } from "../firebase";
import TrainingInput from './TrainingInput';
import Post from './Post';
import User from './User';
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
interface User {
  profileUserName: string;
  avatar: string;
}
interface Post {
  id: string;
  avatar: string;
  image: string;
  trainingArray: [];
  timestamp: any;
  username: string;
  uid: string;
}
const Feed: React.FC = () => {
  const user = useSelector(selectUser);
  const [ posts, setPosts] = useState<Post[]>([]);
  const [profileUser, setProfileUser ] = useState<User>({
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
    setProfileUser({
      profileUserName: name,
      avatar: avatar,
    })
  }
  return (
    <div className="grid grid-rows-3 grid-cols-9 grid-flow-col">
      <div className="row-span-1 col-span-4">
        <User
          profileUserName={profileUser.profileUserName}
          profileUserAvatar={profileUser.avatar}
        />
      </div>
      <div className="row-span-2 col-span-4">
        <TrainingInput />
      </div>
      <div className="row-span-3 col-span-5">
        <div className={styles.scroll}>
          {posts.length
          ? <>
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
        </div>
      </div>
    </div>
  );
}
export default Feed
