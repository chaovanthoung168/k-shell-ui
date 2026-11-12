import type { Metadata } from "next";
import Link from "next/link";
import { DocsNav } from "../components/docs-nav";
import { CodeBlock } from "../components/code-block";
import { ShellSetup } from "../components/shell-setup";
import { Icon, Logo } from "../components/ui";
import { GITHUB_REPOSITORY_URL, INSTALL_COMMAND, RELEASES_URL } from "../release";
import "./docs.css";

export const metadata: Metadata = {
  title: "Install & configure K Shell",
  description: "A step-by-step guide to installing K Shell on Windows, choosing your theme, saving startup preferences, and running your first commands.",
};

export default function Docs() {
  return <main id="main-content" className="docs-workspace">
    <DocsNav />
    <article className="guide-article">
      <section id="overview" className="guide-intro">
        <div className="guide-breadcrumb"><Link href="/">K Shell</Link><span>/</span> Documentation</div>
        <h1>Your shell.<br />Set up your way.</h1>
        <p className="guide-lead">From your first install to a prompt that feels like home. Follow the steps below, one command at a time.</p>
        <div className="guide-route" aria-label="Guide stages"><a href="#installation"><Icon name="download" /><span>Install</span></a><span aria-hidden="true">/</span><a href="#customization"><Icon name="palette" /><span>Personalize</span></a><span aria-hidden="true">/</span><a href="#commands"><Icon name="terminal" /><span>Get to work</span></a></div>
        <div className="guide-requirements"><strong>Before you begin</strong><ul><li><Icon name="windows" /> Windows 10 or 11, x64</li><li><Icon name="terminal" /> PowerShell 5.1 or newer</li><li><Icon name="check" /> No admin access or Rust needed</li></ul><p>Windows Terminal is recommended. Already installed? <a href="#customization">Jump to configuration.</a></p></div>
      </section>

      <div className="guide-walkthrough">
        <section id="installation" className="guide-step" aria-labelledby="installation-title">
          <span className="guide-step-number" aria-label="Step 1">1</span>
          <header className="guide-section-heading"><span>Install</span><h2 id="installation-title">One command to get started.</h2><p>Open the Start menu, search for <strong>PowerShell</strong>, and open it. Paste this command and press <kbd>Enter</kbd>.</p></header>
          <CodeBlock label="PowerShell · install K Shell" code={INSTALL_COMMAND} />
          <div className="guide-result"><Icon name="check" /><p>When setup finishes, you’ll see <strong>“K Shell is ready.”</strong> Your Windows Terminal profile and user PATH are set up for you.</p></div>
          <details className="guide-details"><summary>What does the installer change?</summary><div><p>It downloads the latest stable GitHub release, verifies its SHA256 checksum, and installs into <code>%LOCALAPPDATA%\Programs\KShell</code>. It adds that folder to your user PATH and creates a K Shell profile in Windows Terminal.</p><p>Your default Terminal profile and command history are preserved. The execution-policy flag applies only to the setup process. This is an unsigned early Windows release.</p><a className="guide-source-link" href={`${GITHUB_REPOSITORY_URL}/blob/main/install.ps1`} target="_blank" rel="noopener noreferrer">Read the installer source</a></div></details>
          <details className="guide-details"><summary>Prefer a portable ZIP or a custom installation?</summary><div><p><a className="guide-source-link" href={RELEASES_URL} target="_blank" rel="noopener noreferrer">Download the Windows x64 ZIP and its SHA256 file.</a> Compare the checksum with <code>Get-FileHash</code>, extract the entire ZIP, and run <code>kshell.exe</code> for a portable session.</p><p>To install from the extracted folder instead:</p><CodeBlock label="PowerShell · extracted release folder" code={'powershell -NoProfile -ExecutionPolicy Bypass -File .\\Install.ps1 -PathScope User'} /><p>The repository’s <code>install.ps1</code> also accepts <code>-InstallDirectory</code>, <code>-Version</code>, <code>-NoTerminalProfile</code>, and <code>-PathScope None</code>. Download the script first to use these options.</p></div></details>
          <a className="guide-next" href="#launch">Next: open your first session <Logo /></a>
        </section>

        <section id="launch" className="guide-step" aria-labelledby="launch-title">
          <span className="guide-step-number" aria-label="Step 2">2</span>
          <header className="guide-section-heading"><span>Launch</span><h2 id="launch-title">Meet your new prompt.</h2><p>Close and reopen your terminal app to refresh PATH. In a new PowerShell or Command Prompt window, run:</p></header>
          <CodeBlock label="PowerShell or Command Prompt" code="kshell" />
          <p>Using Windows Terminal? Open its dropdown beside <strong>+</strong> and select <strong>K Shell</strong>. Once you see the <code>›</code> prompt, you’re inside K Shell.</p>
          <div className="guide-prompt-example"><Logo /><div><span>C:\Users\you</span><p><b>›</b> help<span className="guide-example-caret" /></p></div><span>K Shell</span></div>
          <p>Type <code>help</code> and press <kbd>Enter</kbd> to see the available commands.</p>
          <div className="guide-note"><Icon name="terminal" /><div><strong>Watch the label above each command</strong><p><strong>PowerShell</strong> means your Windows setup shell. <strong>K Shell</strong> means the new shell you just opened. Run each example in the place its label names.</p></div></div>
          <a className="guide-next" href="#customization">Next: choose your colors and icons <Icon name="palette" /></a>
        </section>

        <ShellSetup />

        <section id="commands" className="guide-step guide-step-last" aria-labelledby="commands-title">
          <span className="guide-step-number" aria-label="Step 5">5</span>
          <header className="guide-section-heading"><span>Get to work</span><h2 id="commands-title">Try a few familiar commands.</h2><p>Start by looking around your current folder. Run each line separately inside K Shell.</p></header>
          <CodeBlock label="K Shell · explore your files" code={'pwd\nls -la\ntree -L 2'} />
          <h3>Create a small practice project</h3><p>Use a new folder name if <code>kshell-demo</code> already exists. These commands create a folder and write a sample note inside it.</p>
          <CodeBlock label="K Shell · run each line" code={"mkdir kshell-demo\ncd kshell-demo\nwrite notes.txt 'Hello from K Shell'\ncat notes.txt"} />
          <div className="guide-result"><Icon name="check" /><p>You should see <strong>Hello from K Shell</strong> printed below your command.</p></div>
          <div className="guide-table-scroll"><table><caption>A few commands to keep nearby</caption><thead><tr><th>Command</th><th>Use it to</th></tr></thead><tbody>{[["cd ..", "Go up one folder"], ["history 10", "See your last 10 history entries"], ["theme", "Check your current appearance settings"], ["help", "Browse available commands and shortcuts"], ["exit", "Leave K Shell"]].map(([command, description]) => <tr key={command}><td><code>{command}</code></td><td>{description}</td></tr>)}</tbody></table></div>
          <p>Installed developer tools come along, too. Try <code>git status</code> in a Git repository, <code>cargo --version</code> if Rust is installed, or <code>code .</code> if you use VS Code.</p>
          <div className="guide-finish"><Icon name="check" /><div><strong>You’re set up.</strong><p>Your shell is installed, personalized, and ready for your next project.</p></div></div>
        </section>
      </div>

      <div className="guide-reference-sections">
        <section id="shortcuts" className="guide-reference-section"><header className="guide-section-heading"><span>Everyday use</span><h2>A little less typing.</h2><p>Completion and history keep your next command close.</p></header><dl className="guide-shortcuts">{[["Tab", "Accept a visible suggestion, or complete and cycle through commands and paths."], ["→", "Accept the suggestion at the end of your input. Enter runs it."], ["↑ / ↓", "Move through command history."], ["Ctrl + R", "Search previous commands."], ["Ctrl + L", "Clear the terminal screen and scrollback."], ["Ctrl + C", "Cancel the current input line."], ["Ctrl + D", "Exit when the input line is empty."]].map(([key, description]) => <div key={key}><dt><kbd>{key}</kbd></dt><dd>{description}</dd></div>)}</dl></section>

        <section id="troubleshooting" className="guide-reference-section"><header className="guide-section-heading"><span>When you need a hand</span><h2>Get back to your prompt.</h2></header>
          <details className="guide-details"><summary>“kshell is not recognized” after installation</summary><div><p>Close all windows of your terminal app, then open it again. If the command still isn’t found, test the standard install path from PowerShell:</p><CodeBlock label="PowerShell · check the installed executable" code={'& "$env:LOCALAPPDATA\\Programs\\KShell\\kshell.exe" --help'} /><p>If that works, add <code>%LOCALAPPDATA%\Programs\KShell</code> to your Windows <strong>user</strong> PATH, or rerun the installer. For a custom installation, use its actual path.</p></div></details>
          <details className="guide-details"><summary>The K Shell profile is missing from Windows Terminal</summary><div><p>Restart all Windows Terminal windows. You can still run <code>kshell</code> from PowerShell. To regenerate the profile after a standard installation, run:</p><CodeBlock label="PowerShell · regenerate the Terminal profile" code={'powershell -NoProfile -ExecutionPolicy Bypass -File "$env:LOCALAPPDATA\\Programs\\KShell\\Install-KShellProfile.ps1"'} /><p>This restores the installed profile’s Midnight preset. Your executable stays installed. If you have a user override in Terminal settings, check its Command line field as well.</p></div></details>
          <details className="guide-details"><summary>Icons appear as empty squares</summary><div><p>Switch back to standard Unicode icons inside K Shell:</p><CodeBlock label="K Shell" code="theme icons unicode" /><p>For Nerd icons, install and select a compatible Nerd Font Mono in the terminal’s Appearance settings. K Shell does not install fonts. You can also turn icons off with <code>theme icons off</code>.</p></div></details>
          <details className="guide-details"><summary>My theme changes disappear in a new tab</summary><div><p>The <code>theme</code> command changes the current session. Follow <a href="#startup">step 4</a> to save startup settings. Explicit <code>--theme</code>, <code>--icons</code>, and <code>--suggestions</code> flags override environment defaults.</p></div></details>
          <details className="guide-details"><summary>How do I update or remove K Shell?</summary><div><p>To update, close your K Shell sessions and run the command from <a href="#installation">step 1</a> again. Setup keeps backups of the previous executable and profile.</p><p>To remove it, close K Shell, remove its dedicated installation folder and K Shell Terminal fragment folder, then remove its entry from your user PATH. The default fragment folder is <code>%LOCALAPPDATA%\Microsoft\Windows Terminal\Fragments\K Shell</code>. Keep your history at <code>%APPDATA%\mysh\history.txt</code> if you want it.</p></div></details>
        </section>

        <section id="build-from-source" className="guide-reference-section"><header className="guide-section-heading"><span>For contributors</span><h2>Build it yourself.</h2><p>Install stable Rust and the Windows MSVC build tools. In the Rust source folder containing <code>Cargo.toml</code>, run:</p></header><CodeBlock label="PowerShell · Rust source folder" code={'cargo build\ncargo run'} /><p>Your debug executable is <code>target/debug/kshell.exe</code>. To build the distributable Windows x64 ZIP, first cache the full locked dependency graph:</p><CodeBlock label="PowerShell · Rust source folder" code={'cargo fetch --locked\n.\\scripts\\Build-Release.ps1'} /><p>The packaging script builds offline and includes dependency license notices. Find the ZIP and checksum in <code>target/packages</code>. Recipients do not need Rust.</p><a className="guide-source-link" href={GITHUB_REPOSITORY_URL} target="_blank" rel="noopener noreferrer"><Icon name="github" /> Explore the source on GitHub</a></section>

        <section id="limitations" className="guide-reference-section"><header className="guide-section-heading"><span>Current release</span><h2>A shell that’s still growing.</h2><p>K Shell supports single commands, native Windows applications, history, completion, and the configuration shown in this guide. Pipes, shell redirection, aliases, variable expansion, and full scripting are still under development.</p></header><p>Use <code>write</code> and <code>append</code> for file output today. Git, Node/npm, VS Code, and other developer tools are separate installations. Linux executables require their own compatible environment.</p><Link className="guide-source-link" href="/about/#roadmap">See what’s next for K Shell</Link></section>
        <footer className="guide-footer"><Logo /><p>Ready for your next command.</p><a href="#overview">Back to top ↑</a></footer>
      </div>
    </article>
  </main>;
}
