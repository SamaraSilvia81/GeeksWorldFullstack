import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators  } from '@react-navigation/stack';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './src/redux';

// Component
import BottomNavigation from './src/components/BtNavigation' 

// Screens 
import Hero from './src/screens/HeroScreen';
import Home from './src/screens/HomeScreen';
import Marvel from './src/screens/MarvelScreen';
import DC from './src/screens/DcScreen';
import List from './src/screens/ListScreen';

// Login
import Login from './src/screens/Login/LoginScreen';
import Logout from './src/screens/Login/LogoutScreen';
import Signup from './src/screens/Login/SignupScreen';

// List
import CharList from './src/screens/Lists/CharListScreen';

// Marvel
import MarvelHeroes from './src/screens/Marvel/MarvelHeroes';
import MarvelVill from './src/screens/Marvel/MarvelVill';
import MarvelHeroesChar from './src/screens/Marvel/MarvelHeroesChar';
import MarvelVillChar from './src/screens/Marvel/MarvelVillChar';

// DC
import DcHeroes from './src/screens/DC/DcHeroes';
import DcVill from './src/screens/DC/DcVill';
import DcHeroesChar from './src/screens/DC/DcHeroesChar';
import DcVillChar from './src/screens/DC/DcVillChar';

const queryClient = new QueryClient();
const store = configureStore({ reducer: rootReducer });
const Stack = createStackNavigator();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Hero"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#23232e',
                },
                cardStyleInterpolator:
                  CardStyleInterpolators.forHorizontalIOS,
                headerLeftContainerStyle: {
                    paddingLeft: 20,
                  },
              }}>
            <Stack.Screen
              name="Hero"
              component={Hero}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BottomNavigation"
              component={BottomNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Logout"
              component={Logout}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Marvel"
              component={Marvel}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MarvelHeroes"
              component={MarvelHeroes}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MarvelHeroesChar"
              component={MarvelHeroesChar}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MarvelVill"
              component={MarvelVill}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MarvelVillChar"
              component={MarvelVillChar}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DC"
              component={DC}
              options={{ headerShown: false }}
            />
              <Stack.Screen
              name="DCHeroes"
              component={DcHeroes}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DCHeroesChar"
              component={DcHeroesChar}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DCVill"
              component={DcVill}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DCVillChar"
              component={DcVillChar}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="List"
              component={List}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="CharList"
              component={CharList}
              options={{ headerShown: false }}
            />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;