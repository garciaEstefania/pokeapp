import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import database from '@react-native-firebase/database';
import styles from '../assets/styles/style';
import PokeCard from '../components/PokeCard';
import Api from '../Api';

export default class AddTeam extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    teamName: this.props.route.params?.teamName || '',
    pokeList: [],
    pokeTeam: this.props.route.params?.selectedPokemons || [],
  };

  async componentDidMount() {
    const region = this.props.route.params?.region;
    
    try {
      const data = await Api.getPokemonByRegion(region);
      this.setState(prevstate => ({...prevstate, pokeList: data, teamName: this.props.route.params?.teamName}) );
    } catch (err) {
      console.log(err);
    }
  }

  Submit = () => {
    const isEditing = this.props.route.params?.isEditing;
    const teamId = this.props.route.params?.collectionId;
    const newReference = database().ref('/teams');

    const payload = {
      teamName: this.state.teamName,
      pokeTeam: this.state.pokeTeam,
      region: this.props.route?.params?.region?.name,
    };

    if (isEditing) {
      Alert.alert('Warning', 'Do you want to continue saving these changes?', [
        {text: 'NO', style: 'cancel'},
        {
          text: 'YES',
          onPress: () =>
            database()
              .ref(`/teams/${teamId}`)
              .update({
                pokeTeam: this.state.pokeTeam,
                teamName: this.state.teamName,
              })
              .then(() => {
                this.setState(prevState => ({
                  ...prevState,
                  teamName: '',
                  pokeTeam: [],
                }));
                this.props.navigation.navigate('MyTeams');
              }),
        },
      ]);
    } else {
      Alert.alert('Warning', 'Do you want to continue saving this team?', [
        {text: 'NO', style: 'cancel'},
        {
          text: 'YES',
          onPress: () =>
            newReference
              .push({...payload, createdAt: new Date().toISOString()})
              .then(() => {
                this.setState({
                  teamName: '',
                  pokeTeam: [],
                });
              })
              .finally(() => this.props.navigation.navigate('MyTeams')),
        },
      ]);
    }
  };

  handleTeam = (pokemon, action) => {
    if (action === 'remove') {
      this.setState(prevState => ({
        ...prevState,
        pokeTeam: prevState.pokeTeam.filter(pok => pok.id !== pokemon.id),
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        pokeTeam: prevState.pokeTeam.concat(pokemon),
      }));
    }
  };
  /*handler = (param) => {
        this.setState( prevState =>({
            ...prevState,
            pokeTeam: param,
        }))
        console.log('STATE: ',this.state.pokeTeam);
    }*/

  empty = () => (
    <View style={styles.empty}>
      <ActivityIndicator size="large" color="#8B0000" />
    </View>
  );

  renderIt = ({item}) => {
    return (
      <PokeCard
        pokemon={item}
        handleTeam={this.handleTeam}
        pokeTeam={this.state.pokeTeam}
      />
    );
  };

  render() {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={20} style={styles.addTeamContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <TextInput
              placeholder="Enter Team Name"
              placeholderTextColor="gray"
              style={styles.inputTeamName}
              autoCapitalize={'words'}
              onChangeText={text =>
                this.setState(prevState => ({...prevState, teamName: text}))
              }>
              {this.state.teamName}
            </TextInput>
          </View>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={this.state.pokeList}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={this.empty}
            renderItem={this.renderIt}
          />
        </View>
        <View style={styles.btnContent}>
          <TouchableOpacity
            onPress={this.Submit}
            style={styles.btnSave}
            disabled={this.state.pokeTeam.length < 3 || !this.state.teamName}>
            <Text style={styles.textBtn}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
