import React, { useState, useEffect } from 'react'
import { db } from "../firebase";
import TrainingInput from './TrainingInput';
import Post from './Post';
import User from './User';
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
const Feed: React.FC = () => {
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
    <div className="grid grid-rows-3 grid-cols-5 grid-flow-col gap-6">
      <div className="row-span-1 col-span-2 bg-gray-800">
        <User
          profileUserName={profileUser.profileUserName}
          profileUserAvatar={profileUser.avatar}
        />
      </div>
      <div className="row-span-2 col-span-2 bg-gray-800 w-28rem">
        <TrainingInput />
      </div>
      <div className="row-span-3 col-span-3 bg-gray-800">
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
      </div>
    </div>
  );
}
export default Feed
