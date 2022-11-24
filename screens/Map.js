import { useState, useLayoutEffect, useCallback } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { IconButton } from '../components/UI/IconButton';

export const Map = ({ route, navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const pickedLocationHandler = useCallback(() => {
    if (!(selectedLocation.latitude && selectedLocation.longitude)) {
      Alert.alert(
        'No Location Picked!',
        'You have to pick a location (by tapping the tap) first.'
      );
      return;
    }

    navigation.navigate('AddPlace', {
      lat: selectedLocation.latitude,
      lng: selectedLocation.longitude,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          name="save"
          size={24}
          color={tintColor}
          onPress={pickedLocationHandler}
        />
      ),
    });
  }, [navigation, pickedLocationHandler]);

  const region = {
    latitude: 37.73,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const selectLocationHandler = (event) => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      <Marker title="Pick Location" coordinate={selectedLocation} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
