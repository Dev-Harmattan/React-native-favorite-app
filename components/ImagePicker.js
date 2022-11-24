import { Button, View } from "react-native";
import {launchCameraAsync} from 'expo-image-picker';

export const ImagePicker = () => {
  const imagePickHandler = async () => {
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    })
    if(!image.canceled){
      console.log(image.assets[0].uri)
    }
  }
  return <View>
    <View></View> 
    <Button title="Take Image" onPress={imagePickHandler} />
  </View>
}