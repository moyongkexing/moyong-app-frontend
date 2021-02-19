import React from 'react'
import styles from './User.module.scss'
import { Avatar, createStyles, makeStyles, Theme } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import { Grid } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
      <Grid container alignItems="center">
        <Grid
          item xs
        >
          <Avatar className={classes.large} src={user.photoUrl} />
        </Grid>
        <Grid item xs={10}>
          <span className={styles.name}>{user.displayName}</span>
          <button
            className={styles.logout_button}
            onClick={() => {
              auth.signOut();
            }}
          >
              <ExitToAppIcon/>
          </button>
        </Grid>
      </Grid>
    </div>
  )
}

export default User
