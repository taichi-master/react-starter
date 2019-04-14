import axios from 'axios'

export async function getCommentsByPost ( postId ) {
  const res = await axios.get( `https://jsonplaceholder.typicode.com/comments`, { params: { postId } } )

  return res.data
}