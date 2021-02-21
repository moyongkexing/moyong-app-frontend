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
    // <Box className={styles.user_profile}>
    //   <Grid container alignItems="center">
    //     <Grid
    //       item xs
    //     >
    //       <Avatar className={classes.large} src={props.profileUserAvatar} />
    //     </Grid>
    //     <Grid item xs={10}>
    //       <span className={styles.name}>{props.profileUserName}</span>
    //       <button
    //         className={styles.logout_button}
    //         onClick={async () => {
    //           await auth.signOut();
    //         }}
    //       >
    //           <ExitToAppIcon/>
    //       </button>
    //     </Grid>
    //   </Grid>
    // </Box>
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
