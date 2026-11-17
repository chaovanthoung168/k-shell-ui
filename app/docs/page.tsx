import type { Metadata } from "next";
import Link from "next/link";
import { DocsNav } from "../components/docs-nav";
import { DocsContents } from "../components/docs-contents";
import { CodeBlock } from "../components/code-block";
import { ShellSetup } from "../components/shell-setup";
import { KreqGuide } from "../components/kreq-guide";
import { KpmGuide } from "../components/kpm-guide";
import { Arrow, Icon, Logo } from "../components/ui";
import { GITHUB_REPOSITORY_URL, INSTALL_COMMAND, RELEASES_URL } from "../release";
import "./docs.css";

export const metadata: Metadata = {
  title: "Install & configure K Shell",
  description: "A step-by-step guide to installing K Shell on Windows, choosing your theme, saving startup preferences, and running your first commands.",
};

export default function Docs() {
  return <main id="main-content" className="container docs-workspace">
    <DocsNav />
    <article className="guide-article">
      <section id="overview" className="guide-intro">
        <div className="guide-breadcrumb"><Link href="/">K Shell</Link><span>/</span> Documentation</div>
        <h1>The K Shell handbook</h1>
        <p className="guide-lead">Install on Windows, choose a theme, and run your first commands.</p>
        <nav className="guide-route" aria-label="Guide steps"><a href="#installation">Installation</a><a href="#launch">First session</a><a href="#customization">Appearance</a><a href="#startup">Startup</a><a href="#commands">Commands</a></nav>
        <div className="guide-requirements"><strong>Before you begin</strong><ul><li><Icon name="windows" /> Windows 10 or 11, x64</li><li><Icon name="terminal" /> PowerShell 5.1 or newer</li><li><Icon name="check" /> No admin access or Rust needed</li></ul><p>Windows Terminal is recommended. Already installed? <a href="#customization">Jump to configuration.</a></p></div>
      </section>

      <div className="guide-walkthrough">
        <section id="installation" className="guide-step" aria-labelledby="installation-title">
          <span className="guide-step-number" aria-label="Step 1">1</span>
          <header className="guide-section-heading"><h2 id="installation-title">Install K Shell</h2><p>Open <strong>PowerShell</strong> from the Start menu. Paste this command and press <kbd>Enter</kbd>.</p></header>
          <CodeBlock label="PowerShell · install K Shell" code={INSTALL_COMMAND} />
          <div className="guide-result"><Icon name="check" /><p>When setup finishes, you’ll see <strong>“K Shell is ready.”</strong> Your Windows Terminal profile and user PATH are set up for you.</p></div>
          <details className="guide-details"><summary>What does the installer change?</summary><div><p>It downloads the latest stable GitHub release, verifies its SHA256 checksum, and installs into <code>%LOCALAPPDATA%\Programs\KShell</code>. It adds that folder to your user PATH and creates a K Shell profile in Windows Terminal.</p><p>Your default Terminal profile and command history are preserved. The execution-policy flag applies only to the setup process. This is an unsigned early Windows release.</p><a className="guide-source-link" href={`${GITHUB_REPOSITORY_URL}/blob/main/install.ps1`} target="_blank" rel="noopener noreferrer">Read the installer source</a></div></details>
          <details className="guide-details"><summary>Prefer a portable ZIP or a custom installation?</summary><div><p><a className="guide-source-link" href={RELEASES_URL} target="_blank" rel="noopener noreferrer">Download the Windows x64 ZIP and its SHA256 file.</a> Compare the checksum with <code>Get-FileHash</code>, extract the entire ZIP, and run <code>kshell.exe</code> for a portable session.</p><p>To install from the extracted folder instead:</p><CodeBlock label="PowerShell · extracted release folder" code={'powershell -NoProfile -ExecutionPolicy Bypass -File .\\Install.ps1 -PathScope User'} /><p>The repository’s <code>install.ps1</code> also accepts <code>-InstallDirectory</code>, <code>-Version</code>, <code>-NoTerminalProfile</code>, and <code>-PathScope None</code>. Download the script first to use these options.</p></div></details>
          <a className="guide-next" href="#launch">Next: open your first session <Arrow /></a>
        </section>

        <section id="launch" className="guide-step" aria-labelledby="launch-title">
          <span className="guide-step-number" aria-label="Step 2">2</span>
          <header className="guide-section-heading"><h2 id="launch-title">Open your first session</h2><p>Close and reopen your terminal app to refresh PATH. In a new PowerShell or Command Prompt window, run:</p></header>
          <CodeBlock label="PowerShell or Command Prompt" code="kshell" />
          <p>Using Windows Terminal? Open its dropdown beside <strong>+</strong> and select <strong>K Shell</strong>. Once you see the <code>›</code> prompt, you’re inside K Shell.</p>
          <div className="guide-prompt-example"><div><span>C:\Users\you</span><p><b>›</b> help<span className="guide-example-caret" /></p></div><span>K Shell</span></div>
          <p>Type <code>help</code> and press <kbd>Enter</kbd> to see the available commands.</p>
          <div className="guide-note"><Icon name="terminal" /><div><strong>Watch the label above each command</strong><p><strong>PowerShell</strong> means your Windows setup shell. <strong>K Shell</strong> means the new shell you just opened. Run each example in the place its label names.</p></div></div>
          <a className="guide-next" href="#customization">Next: choose your colors and icons <Arrow /></a>
        </section>

        <ShellSetup />

        <section id="commands" className="guide-step guide-step-last" aria-labelledby="commands-title">
          <span className="guide-step-number" aria-label="Step 5">5</span>
          <header className="guide-section-heading"><h2 id="commands-title">Try your first commands</h2><p>Start by looking around your current folder. Run each line separately inside K Shell.</p></header>
          <CodeBlock label="K Shell · explore your files" code={'pwd\nls -la\ntree -L 2'} />
          <h3>Create a small practice project</h3><p>Use a new folder name if <code>kshell-demo</code> already exists. These commands create a folder and write a sample note inside it.</p>
          <CodeBlock label="K Shell · run each line" code={"mkdir kshell-demo\ncd kshell-demo\nwrite notes.txt 'Hello from K Shell'\ncat notes.txt"} />
          <div className="guide-result"><Icon name="check" /><p>You should see <strong>Hello from K Shell</strong> printed below your command.</p></div>
          <div className="guide-table-scroll"><table><caption>A few commands to keep nearby</caption><thead><tr><th>Command</th><th>Use it to</th></tr></thead><tbody>{[["cd ..", "Go up one folder"], ["history 10", "See your last 10 history entries"], ["theme", "Preview, install, and select a prompt theme"], ["theme status", "Check your current appearance settings"], ["help", "Browse available commands and shortcuts"], ["exit", "Leave K Shell"]].map(([command, description]) => <tr key={command}><td><code>{command}</code></td><td>{description}</td></tr>)}</tbody></table></div>
          <p>Installed developer tools come along, too. Try <code>git status</code> in a Git repository, <code>cargo --version</code> if Rust is installed, or <code>code .</code> if you use VS Code.</p>
          <div className="guide-finish"><Icon name="check" /><div><strong>Setup complete</strong><p>Your shell is installed and your preferences are saved.</p></div></div>
        </section>
      </div>

      <div className="guide-reference-sections">
        <KpmGuide />
        <KreqGuide />
        <section id="shortcuts" className="guide-reference-section"><header className="guide-section-heading"><span>Everyday use</span><h2>Keyboard shortcuts</h2><p>Complete commands, recall history, and move through your input.</p></header><dl className="guide-shortcuts">{[["Tab", "Accept a visible suggestion, or complete and cycle through commands and paths."], ["→", "Accept the suggestion at the end of your input. Enter runs it."], ["↑ / ↓", "Move through command history."], ["Ctrl + R", "Search previous commands."], ["Ctrl + L", "Clear the terminal screen and scrollback."], ["Ctrl + C", "Cancel the current input line."], ["Ctrl + D", "Exit when the input line is empty."]].map(([key, description]) => <div key={key}><dt><kbd>{key}</kbd></dt><dd>{description}</dd></div>)}</dl></section>

        <section id="troubleshooting" className="guide-reference-section"><header className="guide-section-heading"><span>Help</span><h2>Troubleshooting</h2><p>Find a fix for common installation and appearance problems.</p></header>
          <details className="guide-details"><summary>“kshell is not recognized” after installation</summary><div><p>Close all windows of your terminal app, then open it again. If the command still isn’t found, test the standard install path from PowerShell:</p><CodeBlock label="PowerShell · check the installed executable" code={'& "$env:LOCALAPPDATA\\Programs\\KShell\\kshell.exe" --help'} /><p>If that works, add <code>%LOCALAPPDATA%\Programs\KShell</code> to your Windows <strong>user</strong> PATH, or rerun the installer. For a custom installation, use its actual path.</p></div></details>
          <details className="guide-details"><summary>The K Shell profile is missing from Windows Terminal</summary><div><p>Restart all Windows Terminal windows. You can still run <code>kshell</code> from PowerShell. To regenerate the profile after a standard installation, run:</p><CodeBlock label="PowerShell · regenerate the Terminal profile" code={'powershell -NoProfile -ExecutionPolicy Bypass -File "$env:LOCALAPPDATA\\Programs\\KShell\\Install-KShellProfile.ps1"'} /><p>This restores the installed profile’s Midnight preset. Your executable stays installed. If you have a user override in Terminal settings, check its Command line field as well.</p></div></details>
          <details className="guide-details"><summary>Icons appear as empty squares</summary><div><p>Switch back to standard Unicode icons inside K Shell:</p><CodeBlock label="K Shell" code="theme icons unicode" /><p>For Nerd icons, install and select a compatible Nerd Font Mono in the terminal’s Appearance settings. K Shell does not install fonts. You can also turn icons off with <code>theme icons off</code>.</p></div></details>
          <details className="guide-details"><summary>My theme changes disappear in a new tab</summary><div><p>The theme picker and <code>theme &lt;design&gt;</code> save your prompt choice automatically. Palette, icon, and suggestion changes apply to the current session; follow <a href="#startup">step 4</a> to save those startup settings. Explicit <code>--theme</code>, <code>--icons</code>, and <code>--suggestions</code> flags override environment defaults.</p><p>If your prompt choice is not saved, check whether <code>KSHELL_CONFIG_DIR</code> is set: an empty value disables persistence; a custom directory must be writable. If <code>theme install</code> is unavailable, close K Shell and rerun the <a href="#installation">installer</a> to update.</p></div></details>
          <details className="guide-details"><summary>How do I update or remove K Shell?</summary><div><p>To update, close your K Shell sessions and run the command from <a href="#installation">step 1</a> again. Setup keeps backups of the previous executable and profile.</p><p>To remove K Shell, follow the <a href="#uninstall">step-by-step uninstall guide</a> below.</p></div></details>
        </section>

        <section id="uninstall" className="guide-reference-section" aria-labelledby="uninstall-title">
          <header className="guide-section-heading"><span>Remove K Shell</span><h2 id="uninstall-title">Uninstall K Shell</h2><p>Follow these steps for a standard per-user installation. You can keep your command history for a future reinstall.</p></header>
          <ol className="guide-instructions">
            <li><strong>Choose another default profile, then close K Shell.</strong><p>If K Shell is your Windows Terminal default, open <strong>Settings → Startup → Default profile</strong> and choose PowerShell or Command Prompt. Save, then close your K Shell tabs.</p></li>
            <li><strong>Remove the application folder.</strong><p>Open File Explorer and paste the path below into its address bar. Back up any personal files you saved there, then delete the <strong>KShell</strong> folder, including its old executable backups. For a custom installation, use the folder you chose during setup.</p><CodeBlock label="File Explorer · installation folder" code={'%LOCALAPPDATA%\\Programs\\KShell'} /></li>
            <li><strong>Remove the Windows Terminal profile.</strong><p>In File Explorer, delete the dedicated <strong>K Shell</strong> fragment folder at this path. Also remove any K Shell profile entries or overrides you added in Windows Terminal Settings.</p><CodeBlock label="File Explorer · Terminal fragment folder" code={'%LOCALAPPDATA%\\Microsoft\\Windows Terminal\\Fragments\\K Shell'} /></li>
            <li><strong>Remove the user PATH entry.</strong><p>Search Windows for <strong>Edit environment variables for your account</strong>. Under <strong>User variables</strong>, select <strong>Path → Edit</strong>, remove the entry for your K Shell installation folder, and save. The standard entry is <code>%LOCALAPPDATA%\Programs\KShell</code>, or its expanded full path. Skip this step if you installed without adding PATH.</p></li>
            <li><strong>Restart your terminal app.</strong><p>Close all Windows Terminal windows and reopen it so the removed profile and PATH change take effect.</p></li>
          </ol>
          <div className="guide-note"><Icon name="history" /><div><strong>Keep your history if you plan to return</strong><p>Your default history file is <code>%APPDATA%\mysh\history.txt</code>. It lives separately from the installation. Leave it in place to reuse your commands after reinstalling. If you chose a custom <code>KSHELL_HISTORY_FILE</code>, keep that file instead.</p></div></div>
          <details className="guide-details"><summary>Optional: clear saved appearance preferences</summary><div><p>If you saved user environment defaults in step 4, run these lines in <strong>PowerShell</strong> to remove them, then restart your terminal app:</p><CodeBlock label="PowerShell · remove saved user preferences" code={"[Environment]::SetEnvironmentVariable('KSHELL_THEME', $null, 'User')\n[Environment]::SetEnvironmentVariable('KSHELL_ICONS', $null, 'User')\n[Environment]::SetEnvironmentVariable('KSHELL_SUGGESTION_STYLE', $null, 'User')"} /><p>If you added these settings to a PowerShell profile instead, remove those lines from that profile. A custom <code>KSHELL_HISTORY_FILE</code> setting can be removed separately; removing its environment setting does not delete the history file.</p></div></details>
          <details className="guide-details"><summary>Optional: delete command history</summary><div><p>To remove saved commands too, delete only the history file you used. The default is <code>%APPDATA%\mysh\history.txt</code>. If you configured a custom history path, use that file’s location. Deleting history removes those saved commands permanently.</p></div></details>
          <details className="guide-details"><summary>Used the portable ZIP?</summary><div><p>Close K Shell and delete the extracted portable folder after saving any personal files inside it. If you never ran the installer or registered a Terminal profile, the installation, PATH, and Terminal cleanup steps do not apply. Your separately stored history can still be kept.</p></div></details>
          <p><a className="guide-source-link" href="#installation">Reinstall K Shell whenever you’re ready</a></p>
        </section>

        <section id="build-from-source" className="guide-reference-section"><header className="guide-section-heading"><span>For contributors</span><h2>Build from source</h2><p>Install stable Rust and the Windows MSVC build tools. In the Rust source folder containing <code>Cargo.toml</code>, run:</p></header><CodeBlock label="PowerShell · Rust source folder" code={'cargo build\ncargo run'} /><p>Your debug executable is <code>target/debug/kshell.exe</code>. To build the distributable Windows x64 ZIP, first cache the full locked dependency graph:</p><CodeBlock label="PowerShell · Rust source folder" code={'cargo fetch --locked\n.\\scripts\\Build-Release.ps1'} /><p>The packaging script builds offline and includes dependency license notices. Find the ZIP and checksum in <code>target/packages</code>. Recipients do not need Rust.</p><a className="guide-source-link" href={GITHUB_REPOSITORY_URL} target="_blank" rel="noopener noreferrer"><Icon name="github" /> Explore the source on GitHub</a></section>

        <section id="limitations" className="guide-reference-section"><header className="guide-section-heading"><span>Current release</span><h2>Current limitations</h2><p>K Shell supports single commands, native Windows applications, history, completion, and the configuration shown in this guide. Pipes, shell redirection, aliases, variable expansion, and full scripting are still under development.</p></header><p>Use <code>write</code> and <code>append</code> for file output today. Git, Node/npm, VS Code, and other developer tools are separate installations. Linux executables require their own compatible environment.</p><Link className="guide-source-link" href="/about/#roadmap">See what’s next for K Shell</Link></section>
        <footer className="guide-footer"><Logo /><p>K Shell documentation</p><a href="#overview">Back to top ↑</a></footer>
      </div>
    </article>
    <DocsContents />
  </main>;
}
