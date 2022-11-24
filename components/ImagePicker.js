import { Alert, Button, View } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';

export const ImagePicker = () => {
  const [permissionInformation, requestPermission] = useCameraPermissions();
  const verifyPermission = async () => {
    if (permissionInformation.status === PermissionStatus.GRANTED) {
      const permissonResponse = await requestPermission();
      return permissonResponse.granted;
    }
    if (permissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permission',
        'Your need to grant camera permission to use this app.'
      );
      return false;
    }
    return true;
  };
  const imagePickHandler = async () => {
    const hasPermission = await verifyPermission();
    console.log(hasPermission)
    if (!hasPermission) return;

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!image.canceled) {
      console.log(image.assets[0].uri);
    }
  };
  return (
    <View>
      <View></View>
      <Button title="Take Image" onPress={imagePickHandler} />
    </View>
  );
};
