import React, { useState, useEffect } from "react";
import "./style.css";
import { db } from "./firebase";
import Post from "./Post";
import TweetInput from "./TweetInput";
import Delete from "./Delete";
import OpenItem from "./OpenItem";



const Feed = () => {
// firebaseに作成した項目を受け取るための変数＝useState
const [posts, setPosts] = useState([
    {
      id: "",
      image: "",
      text: "",
      timestamp: null,
    },
  ]);
//useEffectの処理を書きます
useEffect(() => {
    const firebaseData = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            image: doc.data().image,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
          }))
        )
      );
    return () => {
      firebaseData();
    };
  }, []);

  console.log(posts);

  const openItem =()=>{
   alert("ここに画像の拡大版が出る予定："&"'"&posts.id&"'");

  }


  return (
    <>
        {/*TweetInput読み込み*/}
        <TweetInput/>

      {/* 記述3. Postコンポーネントを表示するロジックを書きます */}
      {/*postsにデータがあったら、表示しますよという書き方　&&　で書く。*/ }
     
        {posts &&(
          <div id="box">
              {posts.map((postItem) => (
                  
                   <tr onClick={openItem}>
                    <td>
                        <Post
                        key={postItem.id}
                        image={postItem.image}
                        text={postItem.text}
                        timestamp={postItem.timestamp}
                        />
                        <Delete id={postItem.id} title={postItem.title} />
                        {/*<OpenItem id={postItem.id}/>*/}
                  </td>
                  </tr>
                  
              ))}
          </div>    
        )}
    </>
  );

}

export default Feed
