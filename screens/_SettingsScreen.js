/*import React from 'react';
import { ExpoConfigView } from '@expo/samples';
export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };
  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config *//*
    return <ExpoConfigView />;
  }
}
*/
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput , Button} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Account',
  };


 
     


  render() {

    return (
      <ScrollView style={styles.container}>
        
        <Text style={{marginTop:70,alignSelf:'center', fontSize:20 }}>user_name</Text>
        
<Text style={{marginTop:40,alignSelf:'center', fontSize:15 }}>Total Donation</Text>     
<Text style={{marginTop:5,alignSelf:'center', fontSize:40 }}>22x</Text>

       <Text style={{marginTop:40,alignSelf:'center', fontSize:15 }}>Total Amount Donated</Text>
        <Text style={{marginTop:5,alignSelf:'center', fontSize:40 }}>RM 120</Text>
       

        <Text style={{marginTop:40,alignSelf:'center', fontSize:15 }}>Transaction History</Text>
        <Text style={{marginTop:20,alignSelf:'center', fontSize:12 }}>22/6 | 2210 | RM10 | Aman Palestin</Text>
        <Text style={{marginTop:10,alignSelf:'center', fontSize:12 }}>20/6 | 2043 | RM10 | Islamic Relief</Text>
        <Text style={{marginTop:10,alignSelf:'center', fontSize:12 }}>18/6 | 2210 | RM10 | Aman Palestin</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});