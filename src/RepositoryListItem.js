import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { StyleSheet, Text, View, TextInput } from 'react-native'

class RepositoryListItem extends Component {
  render() {
    const { repository } = this.props

    return (
      <View>
        <Text>{repository.name}</Text>
      </View>
    )
  }
}

export default createFragmentContainer(
  RepositoryListItem,
  graphql`
    fragment RepositoryListItem_repository on Repository {
      name
      url
    }
  `
)
