import React, {useState} from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from "../assets/styles/style";

const PokeCard = ({pokemon, pokeTeam, handleTeam: setTeam, isViewing}) => {
const foundPokemon = pokeTeam?.find(p => p.id === pokemon.id);
const [selectedPokemon, setSelectedPokemon] = useState(foundPokemon);

    const handleTeam = () => {
      if(!selectedPokemon){
        if(pokeTeam.length < 6) {
          setSelectedPokemon(pokemon);
          setTeam(pokemon, 'add');
        } else {
          return;
        }
      } else {
        setTeam(pokemon, 'remove');
        setSelectedPokemon(null);
      }
  }

  return (
    <View style={[styles.cardItem, { backgroundColor: !selectedPokemon  ? '#fff'   : 'rgba(0,0,0,0.2)' , elevation: !selectedPokemon  ? 5 : 0, },]}>
      {!isViewing ? (
        <TouchableOpacity
        style={styles.btnContainer}
        onPress={handleTeam}
        >
            <View>
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
                      <Text style={styles.pokeDesc}>{pokemon.description}</Text>
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