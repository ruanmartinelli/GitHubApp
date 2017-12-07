import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import environment from './createRelayEnvironment'
import { QueryRenderer, graphql } from 'react-relay'

import RepositoryList from './RepositoryList'

export default class App extends Component {
  state = {
    query: graphql`
      query AppQuery($login: String!, $count: Int) {
        ...RepositoryList
      }
    `,
    variables: {
      count: 10,
      login: 'torvalds'
    }
  }

  _onPressButton = () => {
    const users = ['torvalds', 'gaearon', 'feross', 'yyx990803', 'TheLarkInn']
    const randomUser = users[Math.floor(Math.random() * users.length)]

    this.setState({
      variables: { count: 10, login: randomUser }
    })
  }

  renderApp = ({ error, props }) => {
    if (error) {
      return (
        <View style={styles.container}>
          <Text>Error</Text>
        </View>
      )
    } else if (props) {
      return (
        <View style={styles.container}>
        <Text style={styles.login}>📂 {this.state.variables.login}</Text>

          <View style={styles.listContainer}>
            <RepositoryList data={props} />
          </View>

          <Button
            style={styles.button}
            onPress={this._onPressButton}
            title="Random 🎲"
            color="tomato"
          />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )
    }
  }

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={this.state.query}
        variables={this.state.variables}
        render={this.renderApp}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 50,
    alignItems: 'center'
  },
  login: {
    fontWeight: 'bold',
    fontSize: 20
  },
  button: {
    marginBottom: 50
  },
  listContainer: {
    height: 310,
    marginBottom: 30,
    borderColor: '#d3d3d3',
    padding: 3,
    borderRadius: 2,
    borderWidth: 2
  }
})
