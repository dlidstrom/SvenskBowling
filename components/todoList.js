import React from 'react-native'
var {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView
} = React;


class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentWillReceiveProps(newProps, oldProps) {
    this.setState({
      todoSource: this.state.todoSource.cloneWithRows(newProps.items)
    });
  }

  render() {
    return (
      <ListView
        dataSource={this.state.todoSource}
        renderRow={this.renderRow.bind(this)} />
    );
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        underlayColor='#dddddd'
        onPress={() => this.props.removeTodo(rowData)}>
        <View>
          <View style={styles.row}>
            <Text style={styles.todoText}>{rowData.text.todo}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 44
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  todoText: {
    flex: 1,
  }
});

export default TodoList;
