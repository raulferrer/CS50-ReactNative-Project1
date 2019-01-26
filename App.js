import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import styles from "./assets/styles.js"
import TimerView from "./timerview"
import Selectors from "./selectors.js"
import ActionButtons from "./actionbuttons.js"
import {vibrate} from './utils'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      workingMinutes: 25,
      workingSeconds: 0,
      workingTimer: 1500,
      pauseMinutes: 5,
      pauseSeconds: 0,
      pauseTimer: 300,
      timer: 1500,
      status: "work",
      stopped: true
    }
    this.beginCounter.bind(this)
  }


  beginCounter = () => {
    this.setState(prevState => ({stopped: false}))
    this.setState(prevState => ({workingTimer: prevState.workingMinutes * 60 + prevState.workingSeconds}))
    this.interval = setInterval(this.decrementCounter, 1000)
  }
  
  decrementCounter = () => {
    this.setState(prevState => ({timer: prevState.timer - 1}))
    /* Active pause counter on working timer reaches zero */
    if (this.state.timer === 0) {
      vibrate()
      if (this.state.status === "work") {
        this.setState(prevState => ({timer: prevState.pauseMinutes * 60 + prevState.pauseSeconds}))
        this.setState(prevState => ({status: "pause"}))
      } else if (this.state.status === "pause") {
        this.setState(prevState => ({timer: prevState.workingMinutes * 60 + prevState.workingSeconds}))
        this.setState(prevState => ({status: "work"}))
      }
    }
  }

  stopCounter = () => {
    clearInterval(this.interval)
  }

  resetCounter = () => {
    /* Begin with working timer */
    this.setState(prevState => ({timer: prevState.workingTimer}))
    this.setState(prevState => ({status: "work"}))
    this.setState(prevState => ({stopped: true}))
    this.stopCounter()
  }

  incrementWorkingTimeMinutes = () => {
    if (this.state.workingMinutes < 59) {
      this.setState(prevState => ({workingMinutes: prevState.workingMinutes + 1}))
    }

    this.setState(prevState => ({workingTimer: prevState.workingMinutes * 60 + prevState.workingSeconds}))

    if (this.state.stopped) {
      this.resetCounter()
    }
  }

  incrementWorkingTimeSeconds = () => {
    if (this.state.workingSeconds < 59) {
      this.setState(prevState => ({workingSeconds: prevState.workingSeconds + 1}))
    }

    this.setState(prevState => ({workingTimer: prevState.workingMinutes * 60 + prevState.workingSeconds}))
    
    if (this.state.stopped) {
      this.resetCounter()
    }
  }

  decrementWorkingTimeMinutes = () => {
    if (this.state.workingMinutes > 0) {
      this.setState(prevState => ({workingMinutes: prevState.workingMinutes - 1}))
    }

    this.setState(prevState => ({workingTimer: prevState.workingMinutes * 60 + prevState.workingSeconds}))
  
    if (this.state.stopped) {
      this.resetCounter()
    }
  }

  decrementWorkingTimeSeconds = () => {
    if (this.state.workingSeconds > 0) {
      this.setState(prevState => ({workingSeconds: prevState.workingSeconds - 1}))
    }

    this.setState(prevState => ({workingTimer: prevState.workingMinutes * 60 + prevState.workingSeconds}))
    
    if (this.state.stopped) {
      this.resetCounter()
    }
  }

  incrementPauseMinutes = () => {
    if (this.state.pauseMinutes < 59) {
      this.setState(prevState => ({pauseMinutes: prevState.pauseMinutes + 1}))
    }

    this.setState(prevState => ({pauseTimer: prevState.pauseMinutes * 60 + prevState.pauseSeconds}))
  }

  incrementPauseSeconds = () => {
    if (this.state.pauseSeconds < 59) {
      this.setState(prevState => ({pauseSeconds: prevState.pauseSeconds + 1}))
    }

    this.setState(prevState => ({pauseTimer: prevState.pauseMinutes * 60 + prevState.pauseSeconds}))
  }

  decrementPauseMinutes = () => {
    if (this.state.pauseMinutes > 0) {
      this.setState(prevState => ({pauseMinutes: prevState.pauseMinutes - 1}))
    }

    this.setState(prevState => ({pauseTimer: prevState.pauseMinutes * 60 + prevState.pauseSeconds}))
  }

  decrementPauseSeconds = () => {
    if (this.state.pauseSeconds > 0) {
      this.setState(prevState => ({pauseSeconds: prevState.pauseSeconds - 1}))
    }

    this.setState(prevState => ({pauseTimer: prevState.pauseMinutes * 60 + prevState.pauseSeconds}))
  }
  
  render() {
    return <OnlyUpdateOnEvens timer={this.state.timer} />
  }

  render() {
    return (
      <View style={styles.container}>
        <Timer time = {this.state.timer} 
          start = {this.beginCounter} 
          reset = {this.resetCounter}
          stop = {this.stopCounter}
          wminUp = {this.incrementWorkingTimeMinutes}
          wsecUp = {this.incrementWorkingTimeSeconds}
          wminDw = {this.decrementWorkingTimeMinutes}
          wsecDw = {this.decrementWorkingTimeSeconds}
          wminval = {this.state.workingMinutes}
          wsecval = {this.state.workingSeconds}
          pminUp = {this.incrementPauseMinutes}
          psecUp = {this.incrementPauseSeconds}
          pminDw = {this.decrementPauseMinutes}
          psecDw = {this.decrementPauseSeconds}
          pminval = {this.state.pauseMinutes}
          psecval = {this.state.pauseSeconds} />
      </View>
    );
  }
}

/* Main title */
const Title = () => {
  return (
    <View style={styles.titleView}>
      <Text style={styles.titleText}>Pomodoro</Text>
    </View>
  );
}

const Timer = props => {
  timeToShow = (time) => {
    let seconds = time % 60
    if (seconds < 10) {
      seconds = "0" + seconds
    }
    let minutes = (time - seconds)/60
    return minutes + ":" + seconds
  }

    return (
    <View style={styles.container}>
      <Title />
      <TimerView time = {this.timeToShow(props.time)} />
      <Selectors  wminUp = {props.wminUp}
                  wminDw = {props.wminDw}
                  wsecUp = {props.wsecUp}
                  wsecDw = {props.wsecDw}
                  wminval = {props.wminval}
                  wsecval = {props.wsecval}
                  pminUp = {props.pminUp}
                  pminDw = {props.pminDw}
                  psecUp = {props.psecUp}
                  psecDw = {props.psecDw}
                  pminval = {props.pminval}
                  psecval = {props.psecval} />
      <ActionButtons start = {props.start} stop = {props.stop} reset = {props.reset}/>
    </View>
  );
}
