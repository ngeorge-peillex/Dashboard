import apolloFetch from '../utils/apolloFetch'
import camelize from '../utils/camelize'
import { getCurrentUserId } from './user'

export const fetchOneWidget = async name => {
  const userId = await getCurrentUserId()
  if (userId == '') return {}

  const query = `
    query FetchOneWidget(
      $ownerId: String!
      $name: String
    ) {
      widgets(
        where: {
          name: { equals: $name }
          owner: { id: { equals: $ownerId } }
        }
      ) {
        id
        name
        isVisible
        isConnected
      }
    }
   `

  const response = await apolloFetch({
    query,
    variables: { name: camelize(name), ownerId: userId }
  })

  if (
    response &&
    response.data &&
    response.data.widgets &&
    response.data.widgets[0]
  ) {
    return response.data.widgets[0]
  } else {
    return {}
  }
}

export const updateWidget = async params => {
  const userId = await getCurrentUserId()
  if (userId == '') return {}

  const query = `
    mutation UpdateOneWidget(
      $id: ID!
      $isVisible: Boolean
      $isConnected: Boolean
    ) {
      updateOneWidget(
        where: {
          id: $id
        }
        data: {
          isVisible: $isVisible
          isConnected: $isConnected
        }
      ) {
        id
        name
        isVisible
        isConnected
      }
    }
   `

  const response = await apolloFetch({ query, variables: params })

  if (response && response.data) {
    return response.data.updateOneWidget
  } else {
    return {}
  }
}

export const fetchWidgetData = async (name, params, accessToken) => {
  const userId = await getCurrentUserId()
  if (userId == '') return ''

  const variableString = Object.keys(params)
    .map(key => '$' + camelize(key) + ': String!')
    .join('\n')
  const paramString = Object.keys(params)
    .map(key => camelize(key) + ': $' + camelize(key))
    .join('\n')

  const query = `
    query FetchWidgetData(
      ${variableString}
    ) {
      fetchWidgetData(
        ${camelize(name)}: {
          ${paramString}
          ${accessToken ? `accessToken: ${accessToken}` : ''}
        }
      ) {
        data
      }
    }
  `

  const response = await apolloFetch({
    query,
    variables: params
  })

  if (response && response.data && response.data.fetchWidgetData) {
    return response.data.fetchWidgetData.data
  } else {
    return ''
  }
}
