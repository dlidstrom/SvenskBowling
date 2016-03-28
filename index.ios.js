/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React from 'react-native'
var {
  Component,
  AppRegistry,
  StyleSheet,
  View
} = React;
import Firebase from 'firebase'
import { connect } from 'react-redux'
import {
  addTodo,
  removeTodo
} from './actions/actions.js'
import TodoList from './components/todoList.js'
import Title from './components/title.js'
import TodoInput from './components/todoInput.js'

class testapp extends Component {
  constructor(props) {
    super(props);
    var myFirebaseRef = new Firebase('https://svenskbowling.firebaseio.com');
    this.itemsRef = myFirebaseRef.child('items');
    this.state = {
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

  addTodo(newTodo) {
    if (newTodo !== '') {
      this.itemsRef.push({
        todo: newTodo
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
        <TodoInput
          addTodo={this.addTodo.bind(this)} />
        <TodoList
          items={this.state.items}
          removeTodo={this.removeTodo.bind(this)} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  appContainer:{
    flex: 1
  }
});

AppRegistry.registerComponent('testapp', () => testapp);
