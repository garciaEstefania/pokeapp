import React, { Component } from 'react';
import { Text, View, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
//import database from '@react-native-firebase/database';
import styles from "../assets/styles/style";
import PokeCard from '../components/PokeCard';
import Api from '../Api';

export default class AddTeam extends Component {

    constructor(props){
        super(props)
    }
    state={
        teamName:"",
        pokeList:[],
    }


    async componentDidMount (){
        const region = this.props.route.params?.region;
        try {
            const data = await Api.getPokemonByRegion(region);
            this.setState({pokeList:data})
        } catch (err) {
            console.log(err)
        }
    }
    empty = () =>   <View style={styles.empty}>
                        <ActivityIndicator size="large" color="#8B0000" />
                    </View>

    renderIt = ({item}) => {
      return(
        <PokeCard pokemon={item}/>
      )  
    }

    render() {
        return (
            <View style={styles.addTeamContainer}>
                <View style={styles.inputContainer}>
                    <View style={styles.input}>
                        <TextInput
                            placeholder="Enter Team name here..." 
                            placeholderTextColor='gray' 
                            style={styles.size}
                            autoCapitalize={'none'}
                            onChangeText={text => this.setState(prevState =>({...prevState, teamName: text}))}>
                            {this.state.teamName} 
                        </TextInput>
                    </View>
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        data={this.state.pokeList}
                        ListEmptyComponent={this.empty}
                        renderItem={this.renderIt}
                    />
                </View>
                <View style={styles.btnContent}>
                    <TouchableOpacity
                    style={styles.btnSave}>
                        <Text style={styles.textBtn}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
