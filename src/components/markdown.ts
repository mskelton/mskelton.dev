import { styled } from "utils/styled"
import { Paragraph } from "./Paragraph"

// Content
export const MarkdownH2 = styled.h2.use("text-3xl font-bold mb-4 mt-8")
export const MarkdownH3 = styled.h3.use("text-2xl font-bold mb-3 mt-8")
export const MarkdownParagraph = Paragraph.use("mb-4")

// Lists
const listStyle = "text-lg ml-8 mb-4"
export const MarkdownUnorderedList = styled.ul.use(`${listStyle} list-disc`)
export const MarkdownOrderedList = styled.ol.use(`${listStyle} list-decimal`)
