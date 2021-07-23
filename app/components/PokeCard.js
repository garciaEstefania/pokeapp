import React, {useState} from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from "../assets/styles/style";
// import {TouchableOpacity} from 'react-native-gesture-handler';

const PokeCard = ({pokemon, selectedValues, setSelectedValues, isViewing}) => {
    
const foundPokemon = selectedValues?.find((pok) => pok.id === pokemon.id);
console.log('selectedValues: ',foundPokemon);
const [selectedPokemon, setSelectedPokemon] = useState(foundPokemon);

    const onPressedCard = () => {
        if (!selectedPokemon) {
            
            if (selectedValues.length < 6) {
                setSelectedPokemon(pokemon);
                setSelectedValues((prevState) => prevState.concat(pokemon));
            } else {
            return;
            }
        } else {
            setSelectedPokemon(null);
            setSelectedValues((prevState) =>
                prevState.filter((det) => det.id !== pokemon.id),
            );
        }
    };

  return (
    <View style={[styles.cardItem, { backgroundColor: !selectedPokemon ? '#fff' : 'rgba(0,0,0,0.8)', elevation: !selectedPokemon ? 5 : 0, },]}>
      {!isViewing ? (
        <TouchableOpacity
        style={styles.btnContainer}
        onPress={onPressedCard}
        >
            <View style={styles.cardContainer}>
                <View style={styles.imageContainer}>
                {!pokemon.image && pokemon.image !== null ? (
                    <ActivityIndicator color="red" size="small" />
                  ) : (
                    <Image
                      style={styles.pokeImage}
                      source={
                        pokemon.image !== null
                          ? {
                              uri: pokemon.image,
                            }
                          : require('../assets/img/noImageAvailable.png')
                      }
                    />
                  )}
                </View>
                <View style={styles.infoContainer}>
                    <Text># {pokemon.id}</Text>
                    <Text style={styles.pokeName}>{pokemon.name}</Text>
                    <Text>{pokemon.description}</Text>
                    <View style={styles.textRow}>
                        <Text>Type: </Text>
                        {pokemon.types?.map((type, index) => (
                        <Text key={index}>
                            {type.type.name}
                            {pokemon.types?.length > 1 && index === 0 && (
                            <Text> / </Text>
                            )}
                        </Text>
                        ))}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        ) : (
            <View style={styles.cardContainer}>
                <View style={styles.imageContainer}>
                {!pokemon.image && pokemon.image !== null ? (
                    <ActivityIndicator color="red" size="small" />
                  ) : (
                    <Image
                      style={styles.pokeImage}
                      source={
                        pokemon.image !== null
                          ? {
                              uri: pokemon.image,
                            }
                          : require('../assets/img/noImageAvailable.png')
                      }
                    />
                  )}
                </View>
                <View style={styles.infoContainer}>
                    <Text># {pokemon.id}</Text>
                    <Text style={styles.pokeName}>{pokemon.name}</Text>
                    <Text>{pokemon.description}</Text>
                    <View style={styles.textRow}>
                        <Text>Type: </Text>
                        {pokemon.types?.map((type, index) => (
                        <Text key={index}>
                            {type.type.name}
                            {pokemon.types?.length > 1 && index === 0 && (
                            <Text> / </Text>
                            )}
                        </Text>
                        ))}
                    </View>
                </View>
            </View>
        )}
    </View>
  );
};
export default PokeCard;