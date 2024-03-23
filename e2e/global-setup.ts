async function globalSetup() {
  await fetch("http://localhost:3000/reindex", { method: "POST" })
}

export default globalSetup
