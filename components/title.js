import React from 'react-native'
var {
  Component,
  StyleSheet,
  Text,
  View
} = React;

class Title extends Component {
  render() {
    return (
      <View style={styles.titleView}>
        <Text style={styles.titleText}>
          My Shoplist
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  appContainer:{
    flex: 1
  },
  titleView:{
    backgroundColor: '#48afdb',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  titleText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
  }
});

export default Title;
