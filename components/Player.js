import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import DeleteIcon from '../assets/icons/DeleteIcon';
import ProfileIcon from '../assets/icons/ProfileIcon';

const Player = ({ playerItem, onDelete }) => {
  const positions = ['Kaleci', 'Defans', 'Orta Saha', 'Forvet', 'Yedek Oyuncu'];
  const [selectedPosition, setSelectedPosition] = useState('');

  const handlePositionSelect = async (selectedItem, player) => {
    try {
      const storedPlayersStr = await AsyncStorage.getItem('players');
      const storedPlayers = JSON.parse(storedPlayersStr);

      const index = storedPlayers?.findIndex((item) => item.name === player.name);
      storedPlayers[index] = { name: player.name, position: selectedItem };

      await AsyncStorage.setItem('players', JSON.stringify(storedPlayers));

      setSelectedPosition(selectedItem);
    } catch (error) {
      console.log('Error saving selected position:', error);
    }
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <ProfileIcon />
        <Text style={styles.itemText}>{playerItem.name}</Text>
      </View>

      <SelectDropdown
        data={positions}
        onSelect={(val) => handlePositionSelect(val, playerItem)}
        defaultButtonText={selectedPosition || playerItem.position || 'Mevki Seçiniz'} // Mevcut seçili pozisyon varsa onu gösterir
        buttonStyle={styles.dropdownButton}
        buttonTextStyle={styles.dropdownButtonText}
      />

      <TouchableOpacity onPress={onDelete}>
        <DeleteIcon />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  circular: {
    width: 20,
    height: 20,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 10,
  },
  itemText: {
    marginLeft: 6,
    fontSize: 16,
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dropdownButton: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    width: 200,
    flex: 1,
  },
  dropdownButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 'auto',
    textAlign: 'center',
    alignItems: 'center',
  },
});

export default Player;
