import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { AddButton } from '../components/AddButton';
import Player from '../components/Player';

export function HomeScreen() {
  const [player, setPlayer] = useState('');
  const [playerItems, setPlayerItems] = useState([]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const storedPlayers = await AsyncStorage.getItem('players');
      if (storedPlayers !== null) {
        setPlayerItems(JSON.parse(storedPlayers));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const storePlayers = async (players) => {
    try {
      await AsyncStorage.setItem('players', JSON.stringify(players));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPlayer = () => {
    Keyboard.dismiss();
    if (player.trim() !== '') {
      const newPlayers = [...playerItems, { name: player, position: '' }];
      setPlayerItems(newPlayers);
      storePlayers(newPlayers);
      setPlayer('');
    }
  };

  const deletePlayer = (index) => {
    const newPlayers = [...playerItems];
    newPlayers.splice(index, 1);
    setPlayerItems(newPlayers);
    storePlayers(newPlayers);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Oyuncu Ekle"
          value={player}
          onChangeText={(text) => setPlayer(text)}
        />
        <AddButton handleAddPlayer={handleAddPlayer} />
      </View>
      {/* Haftanın Oyuncuları */}
      <ScrollView style={styles.playerWrapper}>
        <Text style={styles.sectionTitle}>Haftanın Oyuncuları</Text>
        <View style={styles.items}>
          {playerItems.map((item, index) => (
            <Player onDelete={() => deletePlayer(index)} key={index} playerItem={item} />
          ))}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#E8EAED" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  row: {
    flexDirection: 'row',
    padding: 20,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerWrapper: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writePlayerWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 11,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
