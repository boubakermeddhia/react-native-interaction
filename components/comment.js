import React from 'react';
import {Keyboard,View,StatusBar,TouchableOpacity,ActivityIndicator,ScrollView,TouchableWithoutFeedback,StyleSheet,SafeAreaView} from 'react-native'
import 'react-native-gesture-handler';
import Comments from './Comments'
import {Consumer} from '../context'
import { Icon } from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler';
export default function Comment({navigation}) {
    return (
        <Consumer>
            {value=>{
                const {message,setmessage,postcomment,getcomment,loading}=value
                return (
                    <>
                     {loading && (<View style={styles.loading}>
                                    <ActivityIndicator size="large" color="#00ff00" />
                                    </View>
                        )}
                    <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
                        <StatusBar style="light"/>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView contentContainerStyle={{paddingTop:15}}>
                         {
                         getcomment.map(res=>{
                                return(
                                         <Comments key={res._id} comment={res}/>
                                    )
                         })}
                         </ScrollView>
                         </TouchableWithoutFeedback>
                         <View style={styles.footer}>
                         <TextInput value={message} onChangeText={(text)=>setmessage(text)} placeholder="Comment" style={styles.TextInput} />
                         <TouchableOpacity activeOpacity={0.5} on onPress={()=>postcomment(navigation)} >
                         <Icon name='sc-telegram' type='evilicon' color='#517fa4' />                  
                         </TouchableOpacity>
                         </View>
                    </SafeAreaView>
                    </>
                )
            }}
        </Consumer>
       
    )
}

const styles = StyleSheet.create({
    loading: {
         padding: 50,
         flex: 1,
         justifyContent: "center",
         color:"white"
       },
       conatiner:{
        flex:1,
    },
    footer:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding:15
    },
    TextInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor:"transparent",
        backgroundColor:"#ECECEC",
        borderWidth:1,
        padding:10,
        color:"grey",
        borderRadius:30

    }
})
