import { StatusBar } from 'react-native'
import React, {  } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import store from './src/redux/store';
import { Provider } from 'react-redux'
import AppRouters from './src/navigators/AppRouters';

const App = () => {


  // Check whether use logged in or not
  // const { getItem, setItem } = useAsyncStorage('accessToken')

  // const [accessToken, setAccessToken] = useState('')


  // useEffect(() => {
  //   checkLogin()
  // }, [])

  // const checkLogin = async () => {
  //   const token = await getItem()

  //   // console.log(token)
  //   token && setAccessToken(token)
  // }

  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle='dark-content'
          backgroundColor='transparent'
          translucent />

        <NavigationContainer>
          <AppRouters />
        </NavigationContainer>
      </Provider>
    </>
  )
}

export default App
