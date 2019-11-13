import apolloFetch from '../utils/apolloFetch'

export const signIn = async credentials => {
  const query = `
    mutation SignIn($email: String!, $password: String, $idToken: String) {
      signin(email: $email, password: $password, idToken: $idToken) {
        token
        expiresIn
      }
    }
  `;

  const response = await apolloFetch({ query, variables: credentials });

  if (response && response['data'] && response['data']['signin']) {
    localStorage.setItem('apiToken', response['data']['signin']['token'])
    return true
  } else {
    return false
  }
};

export const signUp = async credentials => {
  const query = `
    mutation SignUp(
      $email: String!
      $password: String
      $passwordConfirmation: String
      $authType: String
      $idToken: String
    ) {
      signup(
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
        authType: $authType
        idToken: $idToken
      ) {
        token
        expiresIn
      }
    }
  `;

  const response = await apolloFetch({ query, variables: credentials });

  if (response && response['data'] && response['data']['signup']) {
    localStorage.setItem('apiToken', response['data']['signup']['token'])
    return true
  } else {
    return false
  }
};

export const signOut = () => {
  localStorage.removeItem('apiToken')
}