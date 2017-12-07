import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { StyleSheet, Text, View, TextInput } from 'react-native'

class RepositoryListItem extends Component {
  render() {
    const { repository } = this.props

    return (
      <View style={styles.pad}>
        <Text style={styles.repoName}>{repository.name}</Text>
        <Text style={styles.repoDesc}>
          {repository.description
            ? ` ${repository.description.substring(0, 50)}`
            : ''}
        </Text>
      </View>
    )
  }
}

export default createFragmentContainer(
  RepositoryListItem,
  graphql`
    fragment RepositoryListItem_repository on Repository {
      name
      description
      url
    }
  `
)

const styles = StyleSheet.create({
  pad: {
    padding: 3
  },
  repoName: { fontWeight: 'bold' },
  repoDesc: { fontStyle: 'italic' }
})
