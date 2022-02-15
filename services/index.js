import { request, gql } from 'graphql-request'

const graphqlAPI =
  'https://api-ap-south-1.graphcms.com/v2/ckz6yhy9501t801z5eym547kp/master'
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
  // faced a problem here in fetching the data
  // make sure you have written everything correctly
  // and you have given permissions to access the api
  const result = await request(graphqlAPI, query)
  console.log(graphqlAPI)
  return result.postsConnection.edges
}
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
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
        content {
          raw
        }
      }
    }
  `
  const result = await request(graphqlAPI, query, { slug })
  console.log(result)
  return result.post
}

export const getRecentPosts = async () => {
  const query = gql`
    query MyQuery {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  console.log(graphqlAPI)
  const result = await request(graphqlAPI, query)
  return result.posts
}

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetSimilarPosts($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query, { categories, slug })
  return result.posts
}

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query)
  return result.categories
}
