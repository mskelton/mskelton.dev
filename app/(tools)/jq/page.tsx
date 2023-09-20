import Script from "next/script"
import JQEditor from "./JQEditor"

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

export default function Page() {
  return (
    <div>
      <Script src="/jq.js" />
      <Script id="jq-init">{init}</Script>
      <JQEditor />
    </div>
  )
}
