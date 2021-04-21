import { gql } from '@apollo/client';

export const getProjectQuery = gql`
query {
    user (id : "b5818d3d-2d64-4b5e-b74e-1c09b12de401"){
     firstName
     lastName
     projects {
       title
       description
     }
   }
 }    
`;

export const getOpenProjects = gql`
 query {
    openProjects {
        title
        description
        createdBy
        id
         Users {
           firstName
           lastName
         }
       }
 }
`

export const getPersonalProjects = gql`
query getProjects($id : string) {
    project (id: $id) {
        title
        description
        createdBy
        id
        Users {
          lastName
          firstName
          id
        }
    }
}
`;