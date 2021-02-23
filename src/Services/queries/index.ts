// Shared Queries
const pageInfo = `pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }`;

const forks = ` forks(first: 3) {
                          nodes {
                            owner {
                             login
                             avatarUrl(size: 50)
                             url
            }
      }
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

export const searchUserQuery = `
     query search($searchString: String!,$first: Int = 20) {
            user(login: $searchString) {
                gists(first: $first, privacy: PUBLIC) {
                  ${pageInfo}
                  nodes {
                    ${files}
                    createdAt
                    name
                    description
                    url
                    ${forks}
                  }
                }
             }
    }`


export const loadMoreUserQuery = `
     query search($searchString: String!,$first: Int = 10 , $after:String!) {
            user(login: $searchString){
                gists(first: $first, privacy: PUBLIC,after:$after) {
                      ${pageInfo}
                      nodes {
                        ${files}
                        createdAt
                        name
                        description
                        url
                        ${forks}
                }
            }
                
     } 
}`
