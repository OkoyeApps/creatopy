import { gql } from '@apollo/client';

export const REGISTER = gql`
mutation Register($firstName: String!, $lastName: String!, $email: String!, $password : String!){
    register(firstName: $firstName, lastName: $lastName, email: $email, password : $password ){
       access_token,
       authDetail {
           firstName
           lastName
           email 
           id
       }
    }
}
`;

export const LOGIN = gql`
mutation Login($email: String!, $password : String){
    login(email: $email, password : $password){
       access_token,
       authDetail {
           firstName
           lastName
           email 
           id
       }
    }
}
`;

export const RESETPASSWORD = gql`
mutation ResetPassword($oldPassword: String!, $newPassword : String!, $confirmPassword : String!){
    resetPassword(oldPassword: $oldPassword, newPassword : $newPassword, confirmPassword : $confirmPassword)
}
`;


