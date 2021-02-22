import React from 'react'
import styles from './User.module.scss'
import { auth } from "../firebase";
import { Grid } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  Avatar,
  createStyles,
  makeStyles,
  Theme,
  Box,
} from "@material-ui/core";

interface PROPS {
  profileUserName: string;
  profileUserAvatar: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
  }),
);
const User:React.FC<PROPS> = (props) => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" className={styles.user_profile}>
      <Box mr={3}>
        <Avatar className={classes.large} src={props.profileUserAvatar} />
      </Box>
      <Box>
        <span className={styles.name}>{props.profileUserName}</span>
        <button
          className={styles.logout_button}
          onClick={async () => {
            await auth.signOut();
          }}
        >
            <ExitToAppIcon/>
        </button>
      </Box>
    </Box>
  )
}

export default User
