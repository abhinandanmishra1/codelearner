/*
  All the file inside the pages/api will be mapped 
  to /api/* and will be treated as an api Endpoint instead of page

*/
import { GraphQLClient, gql } from 'graphql-request'
const graphqlAPI = process.env.CODELEARNER_ENDPOINT

export default async function comments(req, res) {
  const graphcmsAuth = process.env.CODELEARNER_AUTH_TOKEN
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      Authorization: `Bearer ${graphcmsAuth}`,
    },
  })
  // mutation means update data in graphcms
  const query = gql`
    mutation (
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `
  const result = await graphQLClient.request(query, {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    slug: req.body.slug.slug,
  })

  return res.status(200).send(result)
}
