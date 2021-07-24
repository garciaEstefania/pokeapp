import React, {useEffect, useState} from 'react';
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
import styles from "../assets/styles/style";

const Teams = props => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const loadTeams = () => {
      database()
        .ref('/teams')
        .on('value', snapshot => {
          if (!snapshot.val()) {
            setTeams([]);
            setIsLoading(false);
            return;
          } else {
            setTeams(
              Object.keys(snapshot.val())
                .map(el => ({
                  ...snapshot.val()[el],
                  id: el,
                }))
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
                ),
            );
          }

          setIsLoading(false);
        });
    };

    loadTeams();
  }, []);


  return (
    <View style={styles.screen}>
      <View style={styles.mainScreen}>
        {isLoading && (
          <View style={styles.screen}>
            <ActivityIndicator size="large" color="red" />
          </View>
        )}
        {teams.length !== 0 && !isLoading ? (
          <View style={styles.myTeamsContainer}>
            <Text style={styles.titleHome}>My Teams</Text>
            <View style={styles.listTeams}>
              <FlatList
                data={teams.length > 0 && teams}
                renderItem={({item}) => (
                  <View style={styles.itemContainer}>
                    <TouchableOpacity
                      style={{borderRadius: 10}}
                      activeOpacity={0.9}
                      onPress={() =>
                        props.navigation.navigate('ViewTeam', {
                          team: item,
                        })
                      }>
                      <View>
                        <View>
                          <Text style={styles.name}>{item.teamName}</Text>
                          <Text style={styles.region}>{item.region}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        ) : (
          teams.length === 0 &&
          !isLoading && (
            <View style={styles.screen}>
              <View style={styles.noTeamsContainer}>
                <Text style={styles.textNoTeams}>No Teams Added Yet. Start Adding Some!</Text>
              </View>
            </View>
          )
        )}
      </View>
    </View>
  );
};

export default Teams;
