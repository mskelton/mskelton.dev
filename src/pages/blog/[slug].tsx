import { useRouter } from "next/router"

function Post() {
  const router = useRouter()
  const { slug } = router.query

  return <p>Post: {slug}</p>
}

export default Post
