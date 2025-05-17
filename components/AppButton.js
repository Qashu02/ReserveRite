
import { View,StyleSheet, TouchableOpacity,Text } from 'react-native';
import colors from '../config/colors';
 import {MaterialCommunityIcons} from '@expo/vector-icons'
const AppButton= ({title,onPress,color='secondary' ,style , icon}) => {

    return (
<TouchableOpacity onPress={onPress} style={[styles.button, style ]}>

<Text style={[styles.text]} >{title}
</Text>
     {icon && <MaterialCommunityIcons 
size={20}
name={icon}
color={'black'}/>}
</TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: colors.secondary,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: "100%",
        marginVertical: 10,
    }
    ,
    text:{
        color:colors.dark,
        fontSize:18,
        fontWeight:"500",
     textAlign:'center'
        
    }
})
export default AppButton;