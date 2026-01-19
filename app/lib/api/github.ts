import { Octokit } from '@octokit/rest'
import { notFound } from 'next/navigation'

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

octokit.hook.error('request', async (error) => {
  if ((error as any).status === 404) {
    return notFound()
  }

  throw error
})

export async function getByteSource(id: string) {
  const path = `bytes/${id}.md`
  const { data } = await octokit.repos.getContent({
    mediaType: { format: 'raw' },
    owner: 'mskelton',
    path,
    repo: 'bytes',
  })

  if (typeof data !== 'string') {
    throw new Error(
      `Tried to fetch raw file from ${path}. GitHub did not return the raw contents. This should never happen...`,
    )
  }

  return data as string
}
