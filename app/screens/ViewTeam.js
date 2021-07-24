import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Alert, Button} from 'react-native';
import database from '@react-native-firebase/database';
import PokeCard from '../components/PokeCard';
import Api from '../Api';

const ViewTeam = props => {
  const team = props.route?.params?.team;
  const [region, setRegion] = useState();

  const {navigation} = props;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: team.teamName,
    });
  }, [navigation]);

  useEffect(() => {
    if (team?.region) {
      const fetchRegion = async () => {
        const data = await Api.getRegion();
        const matchingRegion = data?.find(reg => reg.name === team?.region);
        setRegion(matchingRegion);
      };

      fetchRegion();
    }
  }, [team]);
console.log('teamName', team?.teamName);
  return (
    <View style={styles.screen}>
      <View style={styles.listContainer}>
        <FlatList
          data={team?.pokeTeam}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <PokeCard pokemon={item} isViewing />}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              navigation.navigate('AddNewTeam', {
                selectedPokemons: team?.pokeTeam,
                isEditing: true,
                region,
                teamName: team?.teamName,
                collectionId: team?.id,
              });
            }}
            title="EDIT"
            color="#008080"
            
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              Alert.alert(
                'Warning',
                'Would you like to continue deleting this team?',
                [
                  {text: 'Cancel'},
                  {
                    text: 'Confirm',
                    onPress: async () => {
                      await database()
                        .ref(`/teams/${team.id}`)
                        .remove()
                        .finally(() => props.navigation.push('MyTeams'));
                    },
                  },
                ],
              );
            }}
            title="DELETE"
            color="#B22222"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listContainer: {height: '85%', marginVertical: 10},
  buttonsContainer: {
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContainer: {height: '80%', width: 150},
});
export default ViewTeam;
