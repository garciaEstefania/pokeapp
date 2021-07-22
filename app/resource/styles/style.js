import { StyleSheet, Dimensions } from 'react-native'

const WIDTH= Dimensions.get("window").width;
const HEIGHT=Dimensions.get("window").height;

const styles = StyleSheet.create({
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
        margin: 10,
    },
    textBtnRegion:{
        color: "#FFF",
        textTransform: 'uppercase',
    },
})
export default styles;