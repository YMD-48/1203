import React, { useState } from "react";
import { storage, db } from "./firebase";
import firebase from "firebase/app";
import { Button, IconButton } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";



const TweetInput = () => {

    const [inputImage, setInputImage] = useState(null);
    const [message, setMessage] = useState("");

    const onChangeImageHandler = (e) => {
        if (e.target.files[0]) {
          setInputImage(e.target.files[0]);
          e.target.value = "";
        }
      };

      //送信処理
      const sendTweet = (e) =>{

        console.log(message,inputImage);
        e.preventDefault();
        
        if (inputImage) {

              // firebaseの仕様で同じファイル名の画像を複数回アップしてしまうと元々あったファイルが削除される
              // そのためにファイル名をランダムなファイル名を作る必要がある、それが下
            const S =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //ランダムな文字列を作るための候補、62文字
            const N = 16; //16文字の文字列を作るという意味　生成したい文字数が１６の文字列になる
            const randomMoji = Array.from(crypto.getRandomValues(new Uint32Array(N))) //乱数を生成してくれるもので0からランダムな数字が１６こ選ばれる
            .map((n) => S[n % S.length])
            .join("");
            const fileName = randomMoji + "_" + inputImage.name;

      // firebase storageに登録する処理
      const uploadTweetImg = storage.ref(`images/${fileName}`).put(inputImage);

      uploadTweetImg.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {},
        (err) => {
          alert(err.message);
        },
        async () => {
          await storage
            .ref("images")
            .child(fileName)
            .getDownloadURL()
            .then(async (url) => {
              await db.collection("posts").add({
                image: url,
                text: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
        }
      );
    } else {
        // テキストだけの処理
      db.collection("posts").add({
        image: "",
        text: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

        };
        setInputImage(null);
        setMessage("");
      };



    return (
        <div>
            <h1>登録フォーム</h1>
            <form onSubmit={sendTweet}>
                <input 
                className=""
                placeholder="文字を入力するスペースです"
                type="text"
                autoFocus
                value={message}
                // eventを書きます onChange
                onChange={(e) => setMessage(e.target.value)}
                />
            <IconButton>
                <label>
                <AddAPhotoIcon />
                <input
                    type="file"
                    onChange={onChangeImageHandler}
                />
                </label>
            </IconButton>

            <Button type="submit" disabled={!message}>
                送信
            </Button>
            </form>

        </div>
    );
};

export default TweetInput
