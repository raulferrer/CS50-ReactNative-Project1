import * as React from 'react';
import { Text } from 'react-native';
import styles from "./assets/styles.js"


/* Timer view (shows time left) */
/* Timer view (shows time left) */
const TimerView = (props) => {
    return (
      <Text style = {styles.timerview}>{props.time}</Text>
    );
}

export default TimerView