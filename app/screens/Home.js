import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import styles from "../assets/styles/style";
import Api from '../Api';

export default class Home extends Component {

    state={
        list:[],
        region: "",
    }

    async componentDidMount (){
        try {
            const data = await Api.getRegion()
            this.setState({list:data})
        } catch (err) {
            console.log(err)
        }
    }

    empty = () => <View style={{flex:1, justifyContent:'center', alignItems: 'center' }}>
    <ActivityIndicator size="small" color="#0000ff" />
    </View>

    renderIt = ({item}) => {
      return(
        <TouchableOpacity
        style={styles.btnRegion}
        onPress ={()=> {this.props.navigation.navigate('AddNewTeam',  {region: item}) }}
        >
            <Text style={styles.textBtn}>{item.name}</Text>
        </TouchableOpacity>
      )  
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.titleHome}>All Regions</Text>
                <Text style={styles.descriptionHome}>Choose a region and create a new team.</Text>
                <View>
                    <FlatList
                        data={this.state.list}
                        ListEmptyComponent={this.empty}
                        keyExtractor={(item) => item.name.toString()}
                        renderItem={this.renderIt}
                    >
                    </FlatList>
                </View>
            </View>
        )
    }
}
