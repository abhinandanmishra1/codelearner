/*
  All the file inside the pages/api will be mapped 
  to /api/* and will be treated as an api Endpoint instead of page

*/

impo

export default function helloAPI(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
