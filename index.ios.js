/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React from 'react-native'
var {
  Component,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ListView,
  AlertIOS
} = React;
import Firebase from 'firebase'
import { connect } from 'react-redux'
import {
  addTodo,
  removeTodo
} from './actions/actions.js'
import TodoList from './components/todoList.js'
import Title from './components/title.js'

class testapp extends Component {
  constructor(props) {
    super(props);
    var myFirebaseRef = new Firebase('https://svenskbowling.firebaseio.com');
    this.itemsRef = myFirebaseRef.child('items');
    this.state = {
      newTodo: '',
      items: []
    };
  }

  componentDidMount() {
    // When a todo is added
    this.itemsRef.on('child_added', dataSnapshot => {
      var newItems = this.state.items.slice();
      newItems.push({id: dataSnapshot.key(), text: dataSnapshot.val()});
      this.setState({
        items: newItems
      });
    });

    // When a todo is removed
    this.itemsRef.on('child_removed', dataSnapshot => {
      var newItems = this.state.items.filter(x => x.id !== dataSnapshot.key());
      this.setState({
        items: newItems
      });
    });

    // When a todo is changed
    this.itemsRef.on('child_changed', dataSnapshot => {
      var newItems = this.state.items.filter(x => x.id !== dataSnapshot.key());
      newItems.push({id: dataSnapshot.key(), text: dataSnapshot.val()});
      this.setState({
        items: newItems
      });
    });
  }

  addTodo() {
    if (this.state.newTodo !== '') {
      this.itemsRef.push({
        todo: this.state.newTodo
      });
      this.setState({
        newTodo: ''
      });
    }
  }

  removeTodo(rowData) {
    this.itemsRef.child(rowData.id).remove();
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <Title />
        <View style={styles.inputcontainer}>
          <TextInput style={styles.input} onChangeText={text => this.setState({newTodo: text})} value={this.state.newTodo}/>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.addTodo()}
            underlayColor='#dddddd'>
            <Text style={styles.btnText}>Add!</Text>
          </TouchableHighlight>
        </View>
        <TodoList items={this.state.items} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  appContainer:{
    flex: 1
  },
  inputcontainer: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'row'
  },
  button: {
    height: 36,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#48afdb',
    justifyContent: 'center',
    borderRadius: 4,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 6,
  },
  input: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48afdb',
    borderRadius: 4,
    color: '#48BBEC'
  }
});

AppRegistry.registerComponent('testapp', () => testapp);
