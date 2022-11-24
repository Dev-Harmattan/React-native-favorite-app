import { Image, Pressable, View } from 'react-native';

export const PlaceItem = ({ place, onSelect}) => {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.description}</Text>
      </View>
    </Pressable>
  );
};
