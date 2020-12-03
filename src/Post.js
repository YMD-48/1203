import React, { useState, useEffect } from "react";
import "./style.css";
// データが上から渡ってきますよ=props
const Post = ({text,image,timestamp}) => {
  return (

    <div>
      
     
            {/* 記述1.テキスト情報が渡ってくる */}
          <div>{text}</div>
 
          {/* 記述2.画像を表示 imgタグを使う */}

          {image ?(
              <div>
                  <img src={image} alt="画像"/>
              </div>
              ) : (
                <h1>画像がない時にはh1が表示される</h1>
          )}
 
  
          {/* 記述3.日付を表示 注意！jsの形式に変換が必要! */}
          <div>{new Date(timestamp?.toDate()).toLocaleString()}</div>
  
 
    </div>


  );
};
export default Post;