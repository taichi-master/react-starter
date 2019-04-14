import axios from 'axios'

export async function getPostsByUser ( userId ) {
  const res = await axios.get( 'https://jsonplaceholder.typicode.com/posts', { params: { userId } } )

  return res.data
}