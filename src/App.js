import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import environment from './createRelayEnvironment'
import { QueryRenderer, graphql } from 'react-relay'

import RepositoryList from './RepositoryList'

export default class App extends Component {
  state = {
    query: graphql`
      query AppQuery {
        ...RepositoryList
      }
    `,
    variables: {
      count: 10,
      login: 'ruanmartinelli'
    }
  }

  renderApp = ({ error, props }) => {
    if (error) {
      return (
        <View>
          <Text>Error</Text>
        </View>
      )
    } else if (props) {
      return (
        <View>
          <RepositoryList data={props} />
        </View>
      )
    } else {
      return (
        <View>
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
    padding: 10
  }
})
