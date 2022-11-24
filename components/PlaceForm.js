import { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
export const PlaceForm = () => {
  const [inputValue, setInputValue] = useState('');
  const inputChangeHandler = (enteredValue) => {
    setInputValue(enteredValue);
  };
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={inputChangeHandler}
          value={inputValue}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    color: Colors.primary500,
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: Colors.primary100,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary700,
  },
});
