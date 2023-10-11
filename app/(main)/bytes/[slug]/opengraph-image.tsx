import { ImageResponse } from "next/server"
import fs from "node:fs/promises"
import prisma from "lib/prisma"

// export const runtime = "edge"
export const size = {
  height: 630,
  width: 1200,
}

export const contentType = "image/png"

const bytes = [0, 1, 1, 0, 0, 0, 1, 1]

export default async function Image({ params }: { params: { slug: string } }) {
  const byte = { title: "Arch shortcuts" }
  // const byte = await prisma.byte.findFirst({
  //   where: { slug: params.slug },
  // })
  console.log(new URL("./Rubik-SemiBold.ttf", import.meta.url))
  const rubikSemiBold = await fs.readFile(
    new URL("./Rubik-SemiBold.ttf", import.meta.url),
  )
  // .then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#18181B",
          color: "white",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: 64,
          }}
        >
          Bytes
        </div>
        <div
          style={{
            fontSize: 64,
          }}
        >
          {byte?.title}
        </div>

        <div style={{ display: "flex" }}>
          {bytes.map((byte, index) => (
            <div
              key={index}
              style={{
                alignItems: "center",
                border: "4px solid white",
                borderLeftWidth: index ? 0 : 4,
                display: "flex",
                fontSize: 48,
                height: 64,
                justifyContent: "center",
                paddingTop: 12,
                width: 64,
              }}
            >
              {byte}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          data: await rubikSemiBold,
          name: "Rubik",
          style: "normal",
          weight: 400,
        },
      ],
    },
  )
}
