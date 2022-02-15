/*
  All the file inside the pages/api will be mapped 
  to /api/* and will be treated as an api Endpoint instead of page

*/

import { GraphQLClient, gql } from 'graphql'
const graphqlAPI = process.env.CODELEARNER_ENDPOINT
export default async function comments(req, res) {
  const { name, email, slug, comment } = req.body
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.CODELEARNER_AUTH_TOKEN}`,
    },
  })
  // mutation means update data in graphcms
  const query = gql`
    mutation CreateComment($name:Sting!,$email:String!,$comment:$String!,$slug:String!){
      createComment(data:{ 
        name:$name,
        email:$email,
        comment:$comment,
        post:{ connect:{slug:$slug}}
      })
    }
  `
  const result = await graphQLClient.request(query, req.body)
  return res.status.send(result)
}
