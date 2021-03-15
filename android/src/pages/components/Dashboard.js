import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const Dashboard = () => {
   return (
     <Tab.Navigator>
        <View>
           <Text>aw</Text>
        </View>
       {/* <Tab.Screen name="Home" component={Home} /> */}
       {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
     </Tab.Navigator>
   );
}

export default Dashboard
