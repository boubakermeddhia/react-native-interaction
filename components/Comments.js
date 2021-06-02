import React from 'react';
import {View,Text,StyleSheet} from 'react-native'
import 'react-native-gesture-handler';
import {Consumer} from '../context'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';


const Comments = ({comment}) => {
    return (
        <Consumer>
        {value=>{
            const {currentuser}=value
            return (
                            <>
                                    {(currentuser[0].result._id==comment?.user?._id) &&
                                    (
                                        <View style={styles.reciver}>
                                        <Avatar  containerStyle={{ position:"absolute", bottom:15, right:-5  }} bottom={-20} right={-5}  rounded size={30} source={{uri:comment?.user?.imageUrl}}/>
                                        <Text tyle={styles.recivertext}>{comment?.comment}</Text>
                                        </View>
                                    )
                                    }
                                    {(currentuser[0].result._id!=comment?.user?._id) &&
                                    (
                                        <View style={styles.sender}>
                                        <Avatar  containerStyle={{ position:"absolute", bottom:15, right:-5  }} bottom={-20} right={-5}  rounded size={30} source={{uri:comment?.user?.imageUrl}}/>
                                        <Text tyle={styles.sendertext}>{comment?.comment}</Text>
                                        <Text tyle={styles.sendername}>{comment?.user?.name}</Text>
                                        </View>
                                    )
                                    }
                          
                            </>
                )
            }}
        </Consumer>
    )
}
export default Comments

const styles = StyleSheet.create({
    reciver:{
        alignSelf:"flex-end",
        backgroundColor:"#ECECEC",
        borderRadius:20,
        padding:15,
        maxWidth:"80%",
        position:"relative",
        marginRight:15,
        marginBottom:20
    },
    sender:{
        alignSelf:"flex-start",
        backgroundColor:"#ECECEC",
        borderRadius:20,
        padding:15,
        maxWidth:"80%",
        position:"relative",
        margin:20,
    },
    sendertext:{
        color:"white",
        fontWeight:"500",
        marginBottom:15,
        marginLeft:10
    },
    recivertext:{
        color:"black",
        fontWeight:"500",
        marginLeft:10
    },
    sendername:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:"white"
    }

})
