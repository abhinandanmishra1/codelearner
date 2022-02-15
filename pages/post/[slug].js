import React from 'react'
import { getPosts, getPostDetails } from '../../services'
import {
  PostWidget,
  Categories,
  Author,
  CommentsForm,
  Comments,
  PostDetail,
} from '../../components'
const postDetails = ({ post }) => {
  console.log(post)
  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className=" col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <PostWidget
            slug={post.slug}
            categories={post.categories.map((category) => category.slug)}
          />
          <Categories />
        </div>
      </div>
    </div>
  )
}

export default postDetails
export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug)
  return {
    props: { post: data },
  }
}

export async function getStaticPaths() {
  const posts = await getPosts()
  console.log(posts)
  return {
    paths: posts.map(({ node: { slug } }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  }
}
