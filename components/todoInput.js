import React from 'react-native'
var {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput
} = React;

class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: ''
    };
  }

  addTodo() {
    this.props.addTodo(this.state.newTodo);
    this.setState({
      newTodo: ''
    });
  }

  render() {
    return (
      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({newTodo: text})}
          value={this.state.newTodo}/>
        <TouchableHighlight
          style={styles.button}
          onPress={this.addTodo.bind(this)}
          underlayColor='#dddddd'>
          <Text style={styles.btnText}>Add!</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
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

export default TodoInput;
