import React,{useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button,Input,Image} from 'react-native-elements'
import {Consumer} from '../context'
import {AsyncStorage} from 'react-native';

export default function Formscreen({navigation}) {
    
return (
    <Consumer>
            {value=>{
                const {logout,imagepost,post,title,handleimagepost,clear,settitle,message,tags,setmessage,settags}=value
                return(
                    <>
                    <View style={styles.form}>
                                <Input type="text" value={title} placeholder="Title" onChangeText={settitle} />
                                <Input type="text" value={message} placeholder="Message" onChangeText={setmessage} />   
                                <Input type="text" value={tags} placeholder="Tags" onChangeText={settags}/>
                                {imagepost!='' && <Image style={{width:100,height:100}} source={{ uri: imagepost }}/>}
                                <Button containerStyle={styles.button} type="outline"  title="Image" onPress={handleimagepost}/>
                            </View>
                            <View style={styles.submit}>
                                <Button containerStyle={styles.button} onPress={()=>post(navigation)} title="Submit" />
                                <Button containerStyle={styles.button} onPress={clear} title="Clear" type="outline" />
                    </View>
            </>    
                )
            }}
    </Consumer>
)
}

const styles = StyleSheet.create({
 
    button:{
        width:100,
        height:100,
    
    },
    text:{
        fontSize:30,
    },
    submit:{
        flexDirection:"row",
        justifyContent:"center",

    },
    form:{
        
        flex:1,
        padding:10,
        alignItems:"center",
        justifyContent:"space-around",

    }
})


