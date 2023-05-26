import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export const AddButton = ({ handleAddPlayer }) => {
  return (
    <TouchableOpacity onPress={handleAddPlayer}>
      <View style={styles.addWrapper}>
        <Text style={styles.buttonText}>Ekle</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addWrapper: {
    width: 90,
    height: 50,
    backgroundColor: '#6979F8',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { color: 'white' },
});
