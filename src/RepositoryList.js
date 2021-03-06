import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { createFragmentContainer, graphql } from 'react-relay'
import RepositoryListItem from './RepositoryListItem'

class RepositoryList extends Component {
  render () {
    const { user } = this.props.data

    return (
      <View>
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
      user(login: $login) {
        name
        repositories(last: $count) {
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
