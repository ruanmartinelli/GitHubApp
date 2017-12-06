import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native'
import { QueryRenderer, createFragmentContainer, graphql } from 'react-relay'
import RepositoryListItem from './RepositoryListItem'

class RepositoryList extends Component {
  render() {
    const { user } = this.props.data

    return (
      <View>
        <Text>{user.name}</Text>
        <FlatList
          data={user.repositories.edges}
          renderItem={({ item }) => (
            <RepositoryListItem repository={item.node} />
          )}
          keyExtractor={item => item.node.id}
        />
      </View>
    )
  }
}

export default createFragmentContainer(
  RepositoryList,
  graphql`
    fragment RepositoryList on Query {
      user(login: "ruanmartinelli") {
        name
        websiteUrl
        repositories(first: 15) {
          edges {
            node {
              id
              ...RepositoryListItem_repository
            }
          }
        }
      }
    }
  `
)
