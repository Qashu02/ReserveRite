import React from 'react';
import { View,StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import colors from '../../config/colors';
const BottomVector=(props)=> {
    return (
  <View style={styles.container}> 
  <MaterialCommunityIcons style={styles.vectorleft} color={colors.secondary} name='circle' size={200}/>
  <MaterialCommunityIcons style={styles.vectorright} color={colors.secondary} name='circle' size={100}/>
  </View>
    );
}
const styles = StyleSheet.create({
    container:{

    },
    vectorleft:{
        position:'absolute',
        top:120,
        right:40
    },
    vectorright:{
position:'absolute',
top :120,
left:100
    }
})
export default BottomVector;