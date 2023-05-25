import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../screens/HomeScreen';
import List from '../screens/ListScreen';
import Logout from '../screens/Login/LogoutScreen';

const Tab = createMaterialBottomTabNavigator();

const BtNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#CF2422" // #EF7377
      barStyle={{ backgroundColor: '#16161d' }}
    >
      <Tab.Screen
        name="Logout"
        component={Logout}
        options={{
          tabBarLabel: 'Logout',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="logout"
              color={color}
              size={26}
              style={{ transform: [{ rotateY: '180deg' }] }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="List"
        component={List}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BtNavigation;