import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import BackgroundService from 'react-native-background-actions';
import Geolocation from '@react-native-community/geolocation';

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
const getCurrentPosition = () => {
  let position
  Geolocation.getCurrentPosition(
    (pos) => {
      position =JSON.stringify(pos)
      console.log(position)
    },
    (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
    { enableHighAccuracy: true }
  );
};
const veryIntensiveTask = async (taskDataArguments) => {
  // Example of an infinite loop task
  const { delay } = taskDataArguments;
  await new Promise( async (resolve) => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
           getCurrentPosition();
          await BackgroundService.updateNotification({taskDesc: 'Location fetching'});
          await sleep(delay);
      }
  });
};

const options = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask description',
  taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
      delay: 5000,
  },
};

const stopBackGourndService = async () =>{
  await BackgroundService.stop();
}
const Test = () => {

  const startBackGroundService = async()=>{
    await BackgroundService.start(veryIntensiveTask, options);
    await BackgroundService.updateNotification({taskDesc: 'Location fetching'});
  }
  return (
    <View>
     
      <TouchableOpacity onPress={()=>{startBackGroundService()}}>
        <Text>start</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{stopBackGourndService()}}>
        <Text>stop</Text>
      </TouchableOpacity>
      
    </View>
  )
}

export default Test