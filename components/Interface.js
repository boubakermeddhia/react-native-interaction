import React from 'react';
import {View,StatusBar,StyleSheet,KeyboardAvoidingView } from 'react-native'
import 'react-native-gesture-handler';
import {Consumer} from '../context'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Button,Text,Input,Image} from 'react-native-elements'
import {AsyncStorage} from 'react-native';

const Drawer = createDrawerNavigator();

const Interface = () => {
    return (
        <Consumer>
                {value=>{
            const {loading,isregister,event,setemail,setname,setpassword,login,handleimage,name,email,password,register,image}=value
            return(
                        <KeyboardAvoidingView behavior="padding" style={styles.container}>
                        <StatusBar style="light"/>
                       {!isregister && ( 
                       <Text h3 style={{marginBottom:50}}>
                            Create a Interaction account
                        </Text>
                        )
                        }
                         {isregister && ( 
                             <>
                             <Text h3 style={{marginBottom:50}}>
                            Login
                            </Text>
                             <Image style={{width:200,height:200}}
                             source={{uri:"https://ps.w.org/login-customizer/assets/icon-256x256.png?rev=2455454"}}/>
                         </>
                         )
                         }
                        <View style={styles.inputContainer}>
                        {!isregister && ( 
                          <Input placeholder="Full Name" value={name} onChangeText={text=>setname(text)}  type="text"/>
                         )
                         }
                            <Input placeholder="Email" value={email} onChangeText={text=>setemail(text)}  type="Email"/>
                            <Input placeholder="Password" value={password} secureTextEntry onChangeText={text=>setpassword(text)}  type="password"/>
                        </View>
                        {!isregister && ( 
                            <>
                         { image !='' && <Image style={{width:100,height:100}} source={{ uri: image}}/>}
                          <Button containerStyle={styles.button} type="outline"  title="Profile Image" onPress={handleimage}/>
                          <Button loading={loading} containerStyle={styles.button} raised title="Register" onPress={register}/>
                          <Button containerStyle={styles.button} color="#841584" onPress={event} title="Alerady Have an account" type="outline" />
                          </>
                         )
                         }
                          {isregister && ( 
                              <>
                             <Button loading={loading} containerStyle={styles.button} onPress={login} title="Login" />
                             <Button containerStyle={styles.button} onPress={event} title="Register" type="outline" />
                             </>
                         )
                         }
                    </KeyboardAvoidingView>
                    )
                }}
        </Consumer>
    )
}

export default Interface

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:"white"
    },
    inputContainer:{
        width:300,
    },
    button:{
        width:288,
        marginTop:10
    }


})

