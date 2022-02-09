import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.CODELEARNER_ENDPOINT
console.log(graphqlAPI)

export const getPosts = async () => {
  // query is made from graph cms

  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `
  console.log(graphqlAPI)
  // faced a problem here in fetching the data
  // make sure you have written everything correctly
  // and you have given permissions to access the api
  const result = await request(graphqlAPI, query)

  return result.postsConnection.edges
}
