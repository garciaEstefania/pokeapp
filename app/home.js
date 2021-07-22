import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import styles from "./resource/styles/style";
import Api from './api'

export default class home extends Component {

    state={
        back: true,
        list:[],
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
        style={styles.btnRegion}>
            <Text style={styles.textBtnRegion}>{item.name}</Text>
        </TouchableOpacity>
      )  
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.titleHome}>All Regions</Text>
                <Text style={styles.descriptionHome}>Choose a region and create a new team.</Text>
                <View>
                    <ScrollView style={styles.scroll}>
                        <FlatList
                            data={this.state.list}
                            ListEmptyComponent={this.empty}
                            renderItem={this.renderIt}
                        >
                        </FlatList>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
