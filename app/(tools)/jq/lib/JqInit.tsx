import Script from "next/script"

const init = `
var STDOUT = [],
  STDERR = [],
  FILE_DATA = "/tmp/data.json",
  Module = {
    noInitialRun: true,
    print: stdout => STDOUT.push(stdout),
    printErr: stderr => STDERR.push(stderr),
    onRuntimeInitialized: () => {
      document.dispatchEvent(new Event('jq-ready'));
    }
  };
`

export function JqInit() {
  return (
    <>
      <Script src="/jq.js" />
      <Script id="jq-init">{init}</Script>
    </>
  )
}
