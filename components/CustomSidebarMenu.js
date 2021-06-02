import React from 'react';
import {SafeAreaView,Button,Text,StyleSheet,Image} from 'react-native';
import {DrawerItemList} from '@react-navigation/drawer';
import {Consumer} from '../context'



const CustomSidebarMenu = (props) => {
 
    return (
        <Consumer>
                {value=>{
            const {currentuser,logout}=value
            return(
                     <>
                     <SafeAreaView style={{flex: 1}}>
                            <Image
                                source={{uri: currentuser[0].result.imageUrl}}
                                style={styles.sideMenuProfileIcon}
                            />
                            <Text style={styles.text} >Hello! {currentuser[0].result.name} </Text>
                                <DrawerItemList {...props} />

                                <Button Style={styles.button} color="red" title='Logout' onPress={logout}/>
                    </SafeAreaView>
                     </>   
                    )
                }}
        </Consumer>
    )
}



const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    marginTop:30,
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  text:{
    marginTop:30,
    alignSelf: 'center',
    fontSize:30
  },
});

export default CustomSidebarMenu;