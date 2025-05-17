import React from 'react';
import { StyleSheet,View,Image } from 'react-native';
import colors from '../config/colors';
function WelcomeScreen(props) {
    return (
    <View style={styles.container}>
<Image  source={require("../assets/logo.png")} style={{width:150,height:150}}/>

    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
backgroundColor:colors.secondary,
justifyContent:'center',
alignItems:'center'
    }
})
export default WelcomeScreen;
