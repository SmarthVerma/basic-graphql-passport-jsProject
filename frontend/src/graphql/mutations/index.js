import { gql } from "@apollo/client";

export const SIGNUP_USER = {
    mutation: gql`
    mutation SignupUser($email: String!, $password: String!, $role: String!) {
      signup(email: $email, password: $password, role: $role) {
        email
        role
        id
      }
    }
  `
};

export const LOGIN_USER = {
    mutation: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        email
        role
      }
    }
  `
};

export const LOGOUT_USER = {
    mutation: gql`
mutation Mutation {
  logout
}`
}