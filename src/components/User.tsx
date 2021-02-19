import React from 'react'
import styles from './User.module.scss'
import { Avatar, createStyles, makeStyles, Theme } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
  }),
);
const User = () => {
  const user = useSelector(selectUser);
  const classes = useStyles();

  return (
    <div className={styles.user_profile}>
      <Grid container>
        <Grid
          item xs={4}
          className={styles.user_bio}
        >
          <Avatar className={classes.large} src={user.photoUrl} />
          <span>{user.displayName}</span>
        </Grid>
        <Grid item xs>
          <button
              onClick={() => {
                auth.signOut();
              }}
            >
              SignOut
          </button>
        </Grid>
      </Grid>
    </div>
  )
}

export default User
