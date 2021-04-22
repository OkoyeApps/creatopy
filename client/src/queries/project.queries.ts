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

export const GETOPENPROJECTS = gql`
 query {
  projects {
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
`;

export const getPersonalProjects = gql`
query  {
  myProjects {
    id
    title
    description
    createdBy
      Users {
          lastName
          firstName
          lastName
          id
          email
            projects {
              id
              title
              description
              createdBy
                Users {
                  firstName
                  lastName
                  id
                  email
                      projects {
                        id
                        title
                        description
                        createdBy
                      }
                }
           }
    }
  }
}
`;

export const CREATEPROJECT = gql`
  mutation CreateProject($title : String!, $description : String!) {
    createProject(title : $title, description  : $description){
      id
    title
    description
    createdBy
    Users {
       id
    }
    }
  }
`;
export const JOINPROJECT = gql`
  mutation JoinProject($projectId : ID!) {
    joinProject(projectId : $projectId){
      id
    title
    description
    createdBy
    Users {
       id
    }
    }
  }
`;

export const GETSINGLEPROJECT = gql`
 query ($id : ID!){ 
   project (id : $id) {
    id
    title
    description
    createdBy
    Users {
       id
       firstName
       lastName
       email
    }
   }
 }
`