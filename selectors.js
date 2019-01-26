import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from "./assets/styles.js"

/* Selectors view (holds timers selector for working and pause time) */
const Selectors = (props) => {
    return (
      <View>
        <Text style = {styles.timerselectortitle}>Working time</Text>
        <WorkingTimerSelector   wminUp = {props.wminUp}
                                wsecUp = {props.wsecUp}
                                wminDw = {props.wminDw}
                                wsecDw = {props.wsecDw}
                                wminval = {props.wminval}
                                wsecval = {props.wsecval}
        />
        <Text style = {styles.timerselectortitle}>Pause time</Text>
        <PauseTimerSelector     pminUp = {props.pminUp}
                                psecUp = {props.psecUp}
                                pminDw = {props.pminDw}
                                psecDw = {props.psecDw}
                                pminval = {props.pminval}
                                psecval = {props.psecval}
        />
      </View>
    )
  }
  
  /* Working time selector */
  const WorkingTimerSelector = (props) => {
    return (
      <View style = {styles.timercomponent}>
        <MinutesSelector minUp = {props.wminUp} minDw = {props.wminDw} minval = {props.wminval} />
        <Separator /> 
        <SecondsSelector secUp = {props.wsecUp} secDw = {props.wsecDw} secval = {props.wsecval} /> 
      </View>
    );
  }
  
  /* Pause time selector */
  const PauseTimerSelector = props => {
    return (
      <View style = {styles.timercomponent}>
        <MinutesSelector minUp = {props.pminUp} minDw = {props.pminDw} minval = {props.pminval} />
        <Separator /> 
        <SecondsSelector secUp = {props.psecUp} secDw = {props.psecDw} secval = {props.psecval} /> 
      </View>
    );
  }
  
  const MinutesSelector = props =>  {  
      return (
        <View style = {styles.timerObject}>
          <TouchableOpacity onPress = {props.minUp} >
            <Image source={require('./assets/arrow-up.png')} style = {styles.arrowButton}  />
          </TouchableOpacity>
          <Text style = {styles.timerselector}>{props.minval < 9 ? "0" + props.minval : props.minval}</Text>
          <TouchableOpacity onPress = {props.minDw}>
            <Image source={require('./assets/arrow-down.png')} style = {styles.arrowButton}  />
          </TouchableOpacity>
        </View>
      );
  }
  
  
  const SecondsSelector = props => {
      return (
        <View style = {styles.timerObject}>
          <TouchableOpacity onPress = {props.secUp}>
            <Image source={require('./assets/arrow-up.png')} style = {styles.arrowButton}  />
          </TouchableOpacity>
          <Text style = {styles.timerselector}>{props.secval < 9 ? "0" + props.secval : props.secval}</Text>
          <TouchableOpacity onPress = {props.secDw}>
            <Image source={require('./assets/arrow-down.png')} style = {styles.arrowButton}  />
          </TouchableOpacity>
        </View>
      );
  }
  
  const Separator = () => {
    return (
        <Text style = {styles.timerselector}>:</Text>
    );
  }

  export default Selectors