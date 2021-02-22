// Shared Queries
const pageInfo = `pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }`;

const files = `files {
                      encodedName
                      encoding
                      extension
                      isImage
                      isTruncated
                      language {
                        color
                        name
                        id
                      }
                      name
                      size
                    }`;

const users = ` ... on User {           
                      avatarUrl(size: 100)
                      login
                      name
                      url
                       repositories {
                        totalCount
                      }
                      followers {
                        totalCount
                      }
                      following {
                        totalCount
                      }
                    }
}`;


export const searchUserQuery = `
     query search($searchString: String!,$first: Int = 50) {
            user(login: $searchString) {
                gists(first: $first, privacy: PUBLIC) {
                  ${pageInfo}
                  nodes {
                    ${files}
                    forks(first: 3) {
                      nodes {
                        owner {
                          login
                        }
                      }
                    }
                  }
                }
             }
    }`


export const loadMoreUserQuery = `
     query search($searchString: String!,$first: Int = 30 , $after:String!) {
            search(query: $searchString, type: USER,first:$first,after:$after){
            userCount
            ${pageInfo}
                nodes{
                 ${users}
            }  
}`
