import styled from "utils/styled"

export const SocialLink = styled.a
  .attr("data-testid", "social-link")
  .attr("target", "_blank")
  .use(
    "text-2xl bg-blue-400 text-gray-900 rounded-full p-2 hover:bg-blue-500 transition-colors"
  )
