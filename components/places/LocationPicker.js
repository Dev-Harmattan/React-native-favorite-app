import { useState } from 'react';
import { Alert, View, StyleSheet, Text, Image } from 'react-native';
import {
  useForegroundPermissions,
  PermissionStatus,
  getCurrentPositionAsync,
} from 'expo-location';

import { Colors } from '../../constants/colors';
import { OutlineButton } from '../UI/OutlineButton';
import { getMapPreview } from '../../utils/location';

export const LocationPicker = () => {
  const [pickedLocation, setPickedLocation] = useState(null);
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const verifyPermission = async () => {
    if (locationPermissionInformation.status === PermissionStatus.GRANTED) {
      const permissonResponse = await requestPermission();
      return permissonResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permission',
        'You need to grant location permission to use this app.'
      );
      return false;
    }
    return true;
  };

  const locateUserHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) return;
    console.log('hasPermission', hasPermission);
    const location = await getCurrentPositionAsync({});
    if (location) {
      setPickedLocation({
        lat: location?.coords.latitude,
        lng: location?.coords.longitude,
      });
    }
  };

  const pickUserOnMapHandler = () => {};

  const locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
        style={styles.image}
      />
    );
  }
  return (
    <View>
      <View style={styles.locationPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlineButton icon="location" onPress={locateUserHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon="map" onPress={pickUserOnMapHandler}>
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPreview: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    maxWidth: '100%',
    height: 200,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
