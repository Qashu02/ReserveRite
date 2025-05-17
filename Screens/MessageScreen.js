import { StyleSheet, Text, TouchableOpacity, View,FlatList,Image } from 'react-native'
import React from 'react'
import Screen from '../components/Screen';


export default function MessageScreen({navigation}) {
    const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

    const messages = [
      {
        id: '1',
        name: 'Hall Manager A',
        avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
        lastMessage: 'Your booking has been confirmed.',
        time: '10:45 AM',
      },
      {
        id: '2',
        name: 'Hall Manager B',
        avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
        lastMessage: 'Can you confirm the catering?',
        time: 'Yesterday',
      },
      {
        id: '3',
        name: 'Manager C',
        avatar: '',
        lastMessage: 'Let us know if you need decorations.',
        time: '2 days ago',
      },
    ];
      const renderItem=({item})=>{
        return(

        <TouchableOpacity style={styles.messageItem} onPress={()=>navigation.navigate('Chatt',{
            receiverId: item.id,            // pass the receiver's id
    receiverName: item.name,        // pass the receiver's name
    receiverAvatar: item.avatar || defaultAvatar,
        })}>
      <Image style={styles.avatar} source= {{uri:item.avatar|| defaultAvatar}} />
            <View style={styles.messageContent}>
                <Text style={styles.name} > {item.name} </Text>
                <Text style={styles.message}>{item.lastMessage}</Text>
            </View>
      <Text style={styles.time}> {item.time}</Text>
            
        </TouchableOpacity>
        )
        
      }
  return (
    
    <Screen style={styles.container}>
        <Text style={styles.heading}>Messages</Text>
        <FlatList
        data={messages}
        keyExtractor={(item)=>item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={()=><View style={styles.separator}/>}
        />

  
    </Screen>
  
  )
}

const styles = StyleSheet.create({
    container: {
  
      flex: 1,
      padding: 10,
  
    },
    heading: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    messageItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 12,
      backgroundColor: '#eee',
    },
    messageContent: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
    },
    message: {
      color: '#555',
      marginTop: 2,
    },
    time: {
      fontSize: 12,
      color: '#888',
      alignSelf: 'flex-start',
    },
    separator: {
      height: 1,
      backgroundColor: '#eee',
    },
  });
  