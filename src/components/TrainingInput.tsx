import React, { useState } from "react";
import styles from "./TrainingInput.module.css";
import { storage, db, auth } from "../firebase";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import SaveIcon from '@material-ui/icons/Save';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {
  Avatar,
  Button,
  IconButton,
  TextField,
  MenuItem,
  createStyles,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  Theme,
  Grid,
  Box,
  Icon,
  Typography,
  Slider,
} from "@material-ui/core";

interface TrainingRecord {
  trainingName: string;
  trainingWeight: string;
  trainingReps: string;
}
function valuetext(value: number) {
  return `${value}`;
}
const weightList = [
  {value: 'none', label: 'none'},
  {value: '10', label: '10lbs | 4.5kg'},
  {value: '20', label: '20lbs | 9kg'},
  {value: '30', label: '30lbs | 14kg'},
  {value: '40', label: '40lbs | 18kg'},
  {value: '50', label: '50lbs | 23kg'},
  {value: '60', label: '60lbs | 27kg'},
  {value: '70', label: '70lbs | 32kg'},
  {value: '80', label: '80lbs | 36kg'},
  {value: '90', label: '90lbs | 41kg'},
  {value: '100', label: '100lbs | 45kg'},
  {value: '110', label: '110lbs | 50kg'},
  {value: '120', label: '120lbs | 54kg'},
  {value: '130', label: '130lbs | 59kg'},
  {value: '140', label: '140lbs | 64kg'},
  {value: '150', label: '150lbs | 68kg'},
  {value: '160', label: '160lbs | 73kg'},
  {value: '170', label: '170lbs | 77kg'},
  {value: '180', label: '180lbs | 82kg'},
  {value: '190', label: '190lbs | 86kg'},
  {value: '200', label: '200lbs | 91kg'},
];
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);
const TrainingInput: React.FC = () => {
  const user = useSelector(selectUser);
  const classes = useStyles();
  const [ image, setImage] = useState<File | null>(null);
  const [ trainingRecord, setTrainingRecord ] = useState<TrainingRecord>({
    trainingName: "",
    trainingWeight: "none",
    trainingReps: "",
  })
  const [ trainingRecords, setTrainingRecords ] = useState<TrainingRecord[]>([]);
  const saveTrainingRecord = () => {
    setTrainingRecords([...trainingRecords, trainingRecord]);
    setTrainingRecord({
      trainingName: "",
      trainingWeight: "none",
      trainingReps: "",
    })
    console.log(trainingRecords);
  };
  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setImage(e.target.files![0]);
      e.target.value = "";
    }
  };
  const postTrainingRecords = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + image.name;
      const uploadImg = storage.ref(`images/${fileName}`).put(image);
      uploadImg.on(
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
              await db.collection('training_posts').add({
                avatar: user.photoUrl,
                image: url,
                training_array: trainingRecords,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                username: user.displayName,
                uid: user.uid
              });
            });
        }
      );
    } else {
      db.collection('training_posts').add({
        avatar: user.photoUrl,
        image: "",
        training_array: trainingRecords,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: user.displayName,
        uid: user.uid
      });
    }
    setImage(null);
    setTrainingRecords([]);
  };
  const getValue = (e: React.ChangeEvent<{}>, value: number | number[]) => {
    // setTrainingRecord({...trainingRecord, trainingReps: e.target.value})
    console.log(value);
  }
  return (
    <form onSubmit={postTrainingRecords}>
      <Grid container className="mt-7">
        <Grid container item xs={12} className="flex items-center">
          <Grid xs>
            <Avatar
              className={styles.tweet_avatar}
              src={user.photoUrl}
            />
          </Grid>
          <input
            className="ml-10 bg-inputBg text-inputText p-3.5 rounded-3xl outline-none border-none text-lg"
            placeholder="What kind of training?"
            type="text"
            value={trainingRecord.trainingName}
            onChange={(e) => setTrainingRecord({...trainingRecord, trainingName: e.target.value})}
          />
          <select
            className="ml-3 bg-inputBg text-inputText p-3.5 rounded-3xl outline-none border-none text-lg "
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
            className="relative ml-3 w-1/12 bg-inputBg text-inputText p-3.5 rounded-3xl outline-none border-none text-lg appearance-none no-spin::-webkit-inner-spin-button o-spin::-webkit-outer-spin-button"
            min="0"
            placeholder="reps"
            type="number"
            value={trainingRecord.trainingReps}
            onChange={(e) => setTrainingRecord({...trainingRecord, trainingReps: e.target.value})}
          />
          {/* <Typography id="discrete-slider" gutterBottom>
            Temperature
          </Typography>
          <Slider
            defaultValue={0}
            // getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            step={1}
            marks
            min={0}
            max={110}
            // onChange={(e, value) => setTrainingRecord({...trainingRecord, trainingReps: e.target.value})}
            onDragStop={getValue}
          /> */}
          <IconButton
            disabled={!trainingRecord.trainingName}
          >
            <label>
              <SaveIcon
                onClick={() => saveTrainingRecord()}
                className={
                  trainingRecord.trainingName
                  ? "text-enableSave cursor-pointer"
                  : "text-disableSave cursor-pointer"
                }
              />
            </label>
          </IconButton>
        </Grid>


        <Grid item xs={12}>
          
          <table className="table-auto text-center whitespace-no-wrap my-7 mx-8">
            <tbody>
              {trainingRecords.map((record) => (
                <tr>
                  <td className="text-white font-bold px-4 py-3 w-5/12">{record.trainingName}</td>
                  <td className="text-white font-bold px-4 py-3">{record.trainingWeight}</td>
                  <td className="text-white font-bold px-4 py-3 w-1/12">{record.trainingReps}回</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Grid>






        <Grid item xs={12} className="flex justify-end">
        <IconButton>
          <label>
            <AddPhotoAlternateIcon
              className={
                image
                ? "text-white cursor-pointer outline-none"
                : "text-disablePhoto cursor-pointer outline-none"
              }
            />
            <input
              className="hidden"
              type="file"
              onChange={onChangeImageHandler}
            />
          </label>
        </IconButton>
        <Button
          type="submit"
          disabled={!trainingRecords.length}
          className={
            trainingRecords.length ? styles.tweet_sendBtn : styles.tweet_sendDisableBtn
          }
        >
          Tweet
        </Button>
        </Grid>
      </Grid>
    </form>
  );
}
export default TrainingInput;
