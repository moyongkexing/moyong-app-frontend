import React, { useState } from "react";
import styles from "./PostInput.module.scss";
import { storage, db, auth } from "../firebase";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {
  Avatar,
  Button,
  IconButton,
  TextField,
  MenuItem,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";


let trainingRecords = [{}];
const weightList = [
  {value: 'none', label: 'none'},
  {value: '10', label: '10lbs | 4.5kg'},
  {value: '20', label: '20lbs | 4.5kg'},
  {value: '30', label: '30lbs | 4.5kg'},
  {value: '40', label: '40lbs | 4.5kg'},
  {value: '50', label: '50lbs | 4.5kg'},
  {value: '60', label: '60lbs | 4.5kg'},
  {value: '70', label: '70lbs | 4.5kg'},
  {value: '80', label: '80lbs | 4.5kg'},
  {value: '90', label: '90lbs | 4.5kg'},
  {value: '100', label: '100lbs | 4.5kg'},
  {value: '110', label: '110lbs | 4.5kg'},
  {value: '120', label: '120lbs | 4.5kg'},
  {value: '130', label: '130lbs | 4.5kg'},
  {value: '140', label: '140lbs | 4.5kg'},
  {value: '150', label: '150lbs | 4.5kg'},
  {value: '160', label: '160lbs | 4.5kg'},
  {value: '170', label: '170lbs | 4.5kg'},
  {value: '180', label: '180lbs | 4.5kg'},
  {value: '190', label: '190lbs | 4.5kg'},
  {value: '200', label: '200lbs | 4.5kg'},
];

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     trainingNameInput: {
//       '& > *': {
//         margin: theme.spacing(1),
//         width: '25ch',
//       },
//     },
//     trainingWeightSelect: {
//       '& .MuiTextField-root': {
//         margin: theme.spacing(1),
//         width: '25ch',
//       },
//     },
//   }),
// );
const TweetInput: React.FC = () => {
  const user = useSelector(selectUser);
  // const classes = useStyles();
  const [ image, setImage] = useState<File | null>(null);
  const [ trainingRecord, setTrainingRecord ] = useState({
    trainingName: "",
    trainingWeight: "none",
    trainingReps: "0",
  })
  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setImage(e.target.files![0]);
      e.target.value = "";
    }
  };
  const saveTrainingRecord = () => {
    if (!trainingRecords) {
      trainingRecords = [{trainingRecord}];
    } else {
      trainingRecords.push(trainingRecord);
    }
    setTrainingRecord({
      trainingName: "",
      trainingWeight: "none",
      trainingReps: "0",
    });
    console.log(trainingRecords);
  };
  // const sendTrainingPost = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (image) {
  //     const S =
  //       "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  //     const N = 16;
  //     const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
  //       .map((n) => S[n % S.length])
  //       .join("");
  //     const fileName = randomChar + "_" + image.name;
  //     const uploadImg = storage.ref(`images/${fileName}`).put(image);
  //     uploadImg.on(
  //       firebase.storage.TaskEvent.STATE_CHANGED,
  //       () => {},
  //       (err) => {
  //         alert(err.message);
  //       },
  //       async () => {
  //         await storage
  //           .ref("images")
  //           .child(fileName)
  //           .getDownloadURL()
  //           .then(async (url) => {
  //             await db.collection('training_posts').add({
  //               avatar: user.photoUrl,
  //               image: url,
  //               training_name: trainingName,
  //               training_weight: trainingWeight,
  //               training_reps: trainingReps,
  //               timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //               username: user.displayName,
  //               uid: user.uid
  //             });
  //           });
  //       }
  //     );
  //   } else {
  //     db.collection('training_posts').add({
  //       avatar: user.photoUrl,
  //       image: "",
  //       training_name: trainingName,
  //       training_weight: trainingWeight,
  //       training_reps: trainingReps,
  //       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //       username: user.displayName,
  //       uid: user.uid
  //     });
  //   }
  //   setImage(null);
  //   setTrainingName("");
  //   setTrainingWeight("none");
  //   setTrainingReps("0");
  // };
  return (
    <>
      <form>
        <div className={styles.tweet_form}>
          <Avatar
            className={styles.tweet_avatar}
            src={user.photoUrl}
          />
          <input
            className={styles.trainingName}
            placeholder="What kind of training?"
            type="text"
            value={trainingRecord.trainingName}
            onChange={(e) => setTrainingRecord({...trainingRecord, trainingName: e.target.value})}
          />
          <select
            className={styles.trainingWeight}
            value={trainingRecord.trainingWeight}
            onChange={(e) => setTrainingRecord({...trainingRecord, trainingWeight: e.target.value})}
          >
            {weightList.map((weight) => (
              <option key={weight.value} value={weight.value}>
                {weight.label}
              </option>
            ))}
          </select>
          <input
            min="0"
            className={styles.trainingReps}
            placeholder="reps"
            type="number"
            value={trainingRecord.trainingReps}
            onChange={(e) => setTrainingRecord({...trainingRecord, trainingReps: e.target.value})}
          />
          <AddCircleIcon
            className={styles.saveTrainingRecord}
            onClick={() => saveTrainingRecord()}
          />
          <IconButton>
            <label>
              <AddPhotoAlternateIcon
                className={
                  image ? styles.tweet_addIconLoaded : styles.tweet_addIcon
                }
              />
              <input
                className={styles.tweet_hiddenIcon}
                type="file"
                onChange={onChangeImageHandler}
              />
            </label>
          </IconButton>
        </div>
        {/* <Button
          type="submit"
          disabled={!trainingName}
          className={
            trainingName ? styles.tweet_sendBtn : styles.tweet_sendDisableBtn
          }
        >
          Tweet
        </Button> */}
      </form>
      
    </>
  );
}

export default TweetInput;
