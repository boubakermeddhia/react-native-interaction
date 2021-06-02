import React from 'react'
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import formscreen from './formscreen'
import Homeuserscreen from './Homeuserscreen'
import {Consumer} from '../context'
import CustomSidebarMenu from './CustomSidebarMenu'


const Drawer = createDrawerNavigator();

export default  Drawers=()=> {
   
            return (
        <Consumer>
                {value=>{
            const {issingin}=value
            return(
                <>
                     { issingin &&
                               ( 
                               <>
                               <Drawer.Navigator  drawerContentOptions={{
                                            activeTintColor: '#e91e63',
                                            itemStyle: {marginVertical: 5},
                                            }}
                                            drawerContent={(props) => <CustomSidebarMenu {...props} />} >
                                            <Drawer.Screen name="Home" component={Homeuserscreen} />
                                            <Drawer.Screen name="New Post" component={formscreen} />
                                </Drawer.Navigator>
                                </>
                                )
                     }

                </>
                    )
                }}
        </Consumer>
    )
}

