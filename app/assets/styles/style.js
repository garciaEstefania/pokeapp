import { StyleSheet, Dimensions } from 'react-native'

const WIDTH= Dimensions.get("window").width;
const HEIGHT=Dimensions.get("window").height;

const styles = StyleSheet.create({
    //HOME SCREEN
    titleHome:{
        fontSize: HEIGHT * 0.05,
        //fontFamily: '',
    },
    descriptionHome:{
        fontSize: HEIGHT * 0.025,
        paddingVertical: 10,
        color: "#A0522D"
        //fontFamily: '',
    },
    mainContainer:{
        padding: 50,
    },
    btnRegion:{
        flex: 1,
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#B22222",
        padding: 20,
        marginVertical: 10,
        elevation: 3,
    },
    textBtn:{
        color: "#FFF",
        textTransform: 'uppercase',
    },

    //ADD NEW TEAM SCREEN
    addTeamContainer:{
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    inputContainer:{
        flex: 0.1,
    },
    input:{
        width: "100%",
        borderRadius: 5,
        borderColor: "#2D4860",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "flex-start",
        
        paddingLeft: 20,
    },
    listContainer:{
        flex: 0.8,
        backgroundColor: "#DCDCDC",
        borderRadius: 10,
    },

    //POKECARD SCREEN
    cardItem: {
        flex: 0.33,
        margin: 10,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: "#fff",
    },
    btnContainer:{
        flex: 1,
    },
    cardContainer:{
        flex: 1,
        flexDirection: 'row',
        padding: 10,
    },
    imageContainer: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
      },
      pokeImage: {
        width: WIDTH * 0.30,
        height: HEIGHT * 0.15,
        borderRadius: 100,
    },
    infoContainer:{
        flex: 0.6,
        flexDirection: 'column',
        padding: 5,
        justifyContent:"flex-start",
        alignItems: "flex-start",
    },
    pokeName:{
        fontSize: HEIGHT * 0.025,
        fontWeight: 'bold',
    },
    textRow:{
        flexDirection: 'row',
    },
    empty:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },
    btnContent:{
        flex:0.1,
    },
    btnSave:{
        flex: 1,
        justifyContent:'center',
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#B22222",
        marginVertical: 10,
        elevation: 3,
    },     
})
export default styles;