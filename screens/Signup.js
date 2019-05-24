import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import * as firebase from 'firebase';
export default class SignUp extends React.Component {
  state = { email: '', password: '',name:'',age:'', errorMessage: null }

  
  
handleSignUp = () => {
  // TODO: Firebase stuff...
  console.log('handleSignUp')

  /*const AppStack=createStackNavigator({
    Signup:Signup,
    LoginScreen:LoginScreen,
  
  })
  export default AppContainer=createAppContainer(AppStack)*/
  
  const firebaseConfig = {
    apiKey: "<AIzaSyBjH8S3Ek6H1vzDI7qJjOT-fAazGDH6PtE>",
    authDomain: "<donategp-myiium.firebaseapp.com>",
    databaseURL: "<https://donategp-myiium.firebaseio.com>",
    storageBucket: "<donategp-myiium.appspot.com>"
  };
  firebase.initializeApp(firebaseConfig);

  
} 


render() {
    
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TextInput
          placeholder="Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
        <TextInput
          placeholder="Age"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={age => this.setState({ age })}
          value={this.state.age}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('LoginScreen')}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})