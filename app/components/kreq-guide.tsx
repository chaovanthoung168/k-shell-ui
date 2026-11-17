import { CodeBlock } from "./code-block";
import { Icon } from "./ui";

const options = [
  ["-j, --json", "Pretty-print the response as JSON. Invalid or empty JSON returns an error."],
  ["--raw", "Show only the body, without the terminal summary. Combine with --json for body-only formatted JSON."],
  ["-H, --header", "Add a request header as 'Name: value'. Repeat for multiple headers."],
  ["-d, --data", "Send the supplied text exactly, without an added newline."],
  ["-o, --output", "Save raw response bytes to a file, overwriting an existing regular file."],
  ["-i, --include", "Include final response headers on stdout. With -o, the file contains only the body."],
  ["-v, --verbose", "Show request method and URL, headers, response status, and elapsed time on stderr."],
  ["-L, --location", "Follow up to 10 HTTP/HTTPS redirects. Redirects are off by default."],
  ["-X, --request", "Override the method, or supply it when only a URL is given."],
  ["--timeout", "Total network timeout in seconds. Default 30; positive fractions accepted, maximum 86400."],
  ["--fail", "Return status 22 on HTTP 4xx/5xx while still writing the response body."],
  ["-h, --help", "Show all options and usage inside K Shell."],
];

export function KreqGuide() {
  return <section id="http-client" className="guide-reference-section" aria-labelledby="http-client-title">
    <header className="guide-section-heading"><span>Developer tools</span><h2 id="http-client-title">HTTP requests with kreq</h2><p>Test APIs and download files with K Shell’s built-in HTTP client. No separate curl installation is needed.</p></header>
    <div className="guide-note"><Icon name="terminal" /><div><strong>Available in the updated source build</strong><p>The current v0.1.6 download does not include this command yet. After obtaining the updated source, follow <a href="#build-from-source">Build from source</a> and launch <code>target/debug/kshell.exe</code>. Run <code>kreq --help</code> to check availability.</p></div></div>
    <h3>Make your first request</h3><p>Use <code>kreq &lt;METHOD&gt; &lt;URL&gt; [OPTIONS] [content|headers]</code>. Methods and response views are case-insensitive, and options can appear before or after the URL or view. The API addresses below are placeholders: replace them with your own service.</p>
    <CodeBlock label="K Shell · response summary" code={"kreq get 'https://api.example.com/users/1'"} />
    <p>In an interactive K Shell session, responses show <code>StatusCode</code>, <code>Content</code>, <code>RawContent</code>, and <code>Headers</code>. StatusCode includes both the code and its description, such as <code>200 OK</code> or <code>404 Not Found</code>. Content shows the original compact text unless you request JSON formatting.</p>
    <CodeBlock kind="output" label="Example · terminal summary" code={'StatusCode        : 200 OK\nContent           : {"id":1,"name":"John","active":true}\nRawContent        : HTTP/1.1 200 OK\n                    content-type: application/json\n\n                    {"id":1,"name":"John","active":true}\nHeaders           : {[content-type, application/json]}'} />
    <h3>Format JSON when you need it</h3><CodeBlock label="K Shell · run either line" code={"kreq get 'https://api.example.com/users/1' --json\nkreq GET 'https://api.example.com/users/1' -j"} />
    <CodeBlock kind="output" label="Example · formatted Content field" code={'StatusCode        : 200 OK\nContent           : {\n                      "active": true,\n                      "id": 1,\n                      "name": "John"\n                    }'} />
    <p>The other summary fields remain available. Objects, arrays, strings, numbers, booleans, and null are supported. Invalid or empty JSON writes an error to stderr and returns a nonzero status. This flag controls response formatting only; set the request’s Content-Type explicitly.</p>
    <h3>Choose content or headers</h3><CodeBlock label="K Shell · select the response fields" code={"kreq get 'https://api.example.com/users/1' --json content\nkreq get 'https://api.example.com/users/1' content\nkreq get 'https://api.example.com/users/1' headers\nkreq get 'https://api.example.com/users/1' header"} />
    <p>Both views keep <code>StatusCode : 200 OK</code>. Content view shows only that status and Content; headers view shows only that status and Headers. The singular <code>header</code> is an alias for <code>headers</code>. Headers view skips downloading the response body and ignores <code>--json</code>. Content view omits headers even with <code>-i</code>.</p>
    <CodeBlock kind="output" label="Example · JSON content view" code={'StatusCode        : 200 OK\nContent           : {\n                      "active": true,\n                      "id": 1,\n                      "name": "John"\n                    }'} />
    <p>In raw, redirected, or batch output, content writes only the body; headers writes the HTTP status line and response headers. Use <code>headers -o headers.txt</code> to save that header block. The <code>--fail</code> exit-status behavior applies to both views.</p>
    <h3>Show only the response body</h3><CodeBlock label="K Shell · body-only output" code={"kreq get 'https://api.example.com/users/1' --raw\nkreq get 'https://api.example.com/users/1' --raw --json"} />
    <p>File output, redirected stdout, and batch or <code>kshell -c</code> execution omit the summary automatically. Raw output preserves the exact body bytes without added newlines or colors. With <code>--json</code>, body-only output is formatted JSON.</p>
    <p>Terminal text previews retain up to 64 KiB; explicit JSON formatting displays the full parsed body. Binary bodies show their byte count. RawContent shows normalized response status and headers with up to 240 characters of the original body. Summary headers redact credentials and terminal controls are escaped. Forms are not parsed. The <code>-i</code> flag is redundant in a summary and keeps its header-output behavior in raw, batch, and file modes.</p>
    <h3>Send headers and a request body</h3><p>Single-quote JSON to preserve its double quotes and Windows backslashes. Run each command on one line inside K Shell.</p>
    <CodeBlock label="K Shell · JSON and plain-text requests" code={"kreq post 'https://api.example.com/users' -H 'Content-Type: application/json' -d '{\"name\":\"John\",\"age\":22}'\nkreq post 'https://api.example.com/messages' -H 'Content-Type: text/plain' -d 'Hello World'"} />
    <CodeBlock label="K Shell · other HTTP methods" code={"kreq put 'https://api.example.com/users/1' -d 'replacement'\nkreq patch 'https://api.example.com/users/1' -H 'Content-Type: application/json' -d '{\"active\":true}'\nkreq delete 'https://api.example.com/users/1'\nkreq head 'https://api.example.com/users/1' -i\nkreq options 'https://api.example.com/users' -i\nkreq -X PATCH 'https://api.example.com/users/1' -d 'updated'"} />
    <h3>Authenticate to your API</h3><CodeBlock label="K Shell · replace TOKEN with your credential" code={"kreq get 'https://api.example.com/profile' -H 'Authorization: Bearer TOKEN'\nkreq get 'https://api.example.com/data' -H 'X-API-Key: TOKEN'"} />
    <p>Headers are forwarded as supplied. Verbose logs redact authorization, API-key, token, secret, and cookie headers, including known request credentials reflected in response headers. URL query strings and fragments are omitted from logs; avoid verbose mode for private URL paths. Raw bodies and explicitly included headers remain server data. URL user/password credentials are rejected. With sensitive request headers, cross-origin redirects are refused to protect credentials.</p>
    <h3>Save a download or inspect a failure</h3><CodeBlock label="K Shell · downloads and diagnostics" code={"kreq get 'https://example.com/download' -L -o 'download.bin'\nkreq get 'https://api.example.com/users' -o 'users.json'\nkreq get 'https://api.example.com/users' --timeout 5 --fail -v\nkreq --help"} />
    <p><code>-o</code> writes original bytes relative to the shell’s current folder; the parent folder must exist. With <code>--json -o</code>, JSON is validated first and the file retains the original bytes. Invalid JSON leaves the destination untouched. Raw downloads stream; explicit JSON formatting buffers the response in memory. Interrupted or failed transfers can leave partial raw output or files.</p>
    <div className="guide-table-scroll"><table><caption>kreq options</caption><thead><tr><th>Option</th><th>Behavior</th></tr></thead><tbody>{options.map(([flag, description]) => <tr key={flag}><td><code>{flag}</code></td><td>{description}</td></tr>)}</tbody></table></div>
    <p>HTTP transactions return <code>0</code>, including error responses unless <code>--fail</code> is used. HTTP failures with that flag return <code>22</code>; usage errors return <code>2</code>; network, TLS, timeout, JSON, and file errors return <code>1</code>. Interactive Windows <kbd>Ctrl + C</kbd> cancels a request with status <code>130</code>. These statuses also become the exit code of <code>kshell -c</code>.</p>
    <div className="guide-note"><Icon name="terminal" /><div><strong>Saving output inside K Shell</strong><p>Internal pipes, shell redirection, variable expansion, and conditional scripting are still under development. Use <code>-o</code> for file output today. External host pipes and redirection preserve raw stdout. Quote URLs that contain <code>&amp;</code> and paths that contain spaces.</p></div></div>
  </section>;
}
