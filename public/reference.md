# K Shell (`kshell`)

A native Windows shell written in Rust, with basic Linux-style commands,
history suggestions, and Tab completion. It is not yet a Zsh-compatible shell.
Rust edition: 2024. `rustyline` supplies terminal editing and persistent history;
the lexer, parser, completion quoting, command dispatch, and utilities are K Shell's
own code. Rustyline enables file history and custom key bindings; its
`radix_trie` dependency dispatches the Ctrl+L override used for terminal clearing.
No second editor is added. `unicode-width`
measures filenames in terminal cells for aligned columns, and `windows-sys`
enables console styling, default-app file opening and read-only hardware queries through native Windows APIs. Both were already transitive
dependencies of the line editor.

## Install on Windows

Open PowerShell on Windows 10/11 x64 and run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -Command "irm https://raw.githubusercontent.com/chaovanthoung168/k-shell/main/install.ps1 | iex"
```

Restart your terminal app, then run `kshell`, or select **K Shell** in Windows
Terminal's profile menu. No administrator access, Rust, WSL, or new fonts are
required. The command uses a process-only execution policy; it does not change
your saved policy. PowerShell runs setup only, never K Shell's runtime/parser.

The bootstrap downloads the latest stable [GitHub release](https://github.com/chaovanthoung168/k-shell/releases/latest),
checks the ZIP's SHA256 before extraction, and installs into
`%LOCALAPPDATA%\Programs\KShell`. It adds this directory to your **user** PATH,
preserves prior executable/profile backups on upgrade, and registers a Windows
Terminal profile. Existing history and your default Terminal profile are preserved.
Run the same command again to update. Close existing K Shell sessions before updating.

To inspect setup or choose a version and destination, download `install.ps1` first:

```powershell
Invoke-WebRequest -UseBasicParsing https://raw.githubusercontent.com/chaovanthoung168/k-shell/main/install.ps1 -OutFile install.ps1
Get-Content .\install.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\install.ps1 -Version 0.1.1
```

Options: `-InstallDirectory 'D:\Apps\KShell'`, `-NoTerminalProfile`,
`-FontFace Consolas`, and `-PathScope None` (leave PATH unchanged) or `Process`
(current setup process only). Offline installation accepts `-Archive <ZIP>` and
its adjacent `.sha256` file; `-ChecksumFile <path>` overrides that file's location.
The ZIP is an unsigned x64 build. Download the ZIP and checksum directly for
portable use if preferred. See its included README for manual removal; also
remove the K Shell folder from your user PATH if added.

## Build and run

To share K Shell without requiring Rust on the recipient's machine, build the
Windows x64 distribution from PowerShell:

```powershell
.\scripts\Build-Release.ps1
```

Share `target/packages/KShell-0.1.1-windows-x64.zip` and its `.sha256` file.
The ZIP contains a release executable, a per-user `Install.ps1`, a portable-aware
Terminal-profile installer, a quick-start guide, an executable checksum manifest
and application/dependency license texts. It contains no personal history, local
settings, fonts, external application binaries or development files. The build
uses the locked dependency graph, static MSVC CRT and remapped build paths.
Use a fresh `-OutputDirectory` when producing another archive; an existing ZIP
is never overwritten. Build tools are needed only on the developer's machine.

Recipients extract the ZIP and either run `kshell.exe` directly, or run the
included `Install.ps1` from PowerShell to copy it into
`%LOCALAPPDATA%\Programs\KShell` and register a Windows Terminal profile. No admin,
machine PATH change or font installation is required. The packaged installer
leaves PATH unchanged unless you pass `-PathScope User` or `-PathScope Process`.
Restart Terminal after
installation. Font selection uses an installed Meslo Nerd Font Mono when found,
otherwise Consolas with Unicode icons. A recipient can override `-FontFace` or
choose `-NoTerminalProfile`. Old executable/profile copies are backed up on
upgrade, unmarked nonempty installation folders are protected, and checksum
failure stops before any installation. Existing sessions finish normally.

The package is an unsigned Windows 10/11 x64 build, not an MSI.
Native programs such as Git, Nano, Node/npm and VS Code are optional,
separate installations. Release smoke checks:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\Test-Distribution.ps1 -Archive .\target\packages\KShell-0.1.1-windows-x64.zip
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\Test-Installer.ps1 -Archive .\target\packages\KShell-0.1.1-windows-x64.zip
```

Maintainers: update the Cargo version, commit, then push a matching `vMAJOR.MINOR.PATCH`
tag. `.github/workflows/release.yml` checks Rust, builds the locked Windows package,
runs the isolated Windows PowerShell distribution/installer checks, and publishes
the ZIP and checksum as a GitHub release. An existing release is never overwritten.
No custom release secret is needed; the job uses GitHub's scoped workflow token.

With stable Rust and the Windows MSVC build tools installed:

```text
cargo build
cargo run -- -c "echo 'hello world'"
cargo run
```

The executable is `target/debug/kshell.exe`. Use `kshell -c <command>` to execute
one command, or launch without arguments for an interactive REPL.
The application and Cargo package are now named **K Shell** / `kshell`
(formerly MyShell / `mysh`). The project folder can stay `D:\Projects\myshell`.
The Windows terminal tab is titled `K Shell`. A compact two-line prompt shows the
current directory with a folder icon above a mint `›` input marker, and changes after `cd`:

```text
📁 D:\My-Portfolio
› tree -L 2
```

After a failed command, the `›` marker turns rose red without showing a numeric
exit code. A successful command restores the mint marker.
K Shell restores the previous terminal title when it exits. Redirected input/output
and `-c` mode never emit prompts or change the terminal title.
EOF returns the last command status. `exit [0-255]` exits explicitly.

Inside K Shell:

```text
echo "hello world" "" end
echo 'literal $HOME'
cd 'C:\Program Files'
pwd
ls -la
tree -L 2
sysinfo
specs
ssh -V
curl --version
mkdir -p 'my project/src'
touch 'my project/src/main.rs'
create 'my project/src/new.rs'
write 'my project/notes.txt' 'Hello world'
append 'my project/notes.txt' 'Another line'
cat 'my project/notes.txt'
nano 'my project/notes.txt'
cat 'my project/src/main.rs'
open 'D:\HER V2.mp3'
open 'D:\Videos\movie.mp4'
cd 'D:\My-Portfolio'
code .
npm --version
npm run dev
help
'C:\Program Files\Git\cmd\git.exe' --version
exit 0
```

## Implemented behavior

- A separate lexer, single-command parser, runtime, built-in layer, and platform
  executable resolver; source spans use UTF-8 byte offsets.
- Single and double quotes preserve spaces and empty arguments. Adjacent quoted
  and unquoted fragments form one argument. Quote context is retained in the AST.
- **Backslashes are always literal**, including in double quotes. This preserves
  Windows drive paths, UNC paths, and trailing directory separators. There are
  no backslash escape sequences yet. To include a quote, use the opposite quote:
  `echo 'a"b' "a'b"`. To include both, concatenate fragments: `echo 'a"'"'b"`.
- `echo` writes arguments separated by spaces and a newline; every argument is
  literal, including `-n`. `pwd` accepts no arguments. `cd [directory]` persists
  in shell state; no argument selects `USERPROFILE` on Windows (`HOME` elsewhere).
  `cd` flags are rejected. A failed `cd` preserves the previous directory.
- `pwd` presents normal drive/UNC paths after `cd`, hiding Windows' internal
  `\\?\` prefix while retaining the original native path for filesystem calls.
- `ls [-al] [path ...]` lists sorted names without appending `/` to directories. Interactive
  output uses vertical columns sized to the terminal, with three-cell gaps,
  soft blue directories, mint executables/audio/links, lavender images/videos,
  and amber archives. Detailed file metadata is muted slate. Spaces in filenames
  are quoted and Unicode cell widths are used for alignment. `NO_COLOR` disables colors while
  retaining columns. Redirected and `-c` output stays plain, one entry per line.
  `-a`
  includes dotfiles, Windows hidden entries, `.` and `..`. `-l` shows real file
  kind (`d`, `l`, or `-`) and byte size; it does not invent Unix permission bits
  or ownership. Symlink directories are listed as links, without recursion.
- `mkdir [-p] directory ...` creates directories; `-p` creates missing parents
  and accepts existing directories. `touch file ...` creates files without
  truncation and updates access/modified times; directory timestamps and touch
  flags are not supported yet.
- `create [--] file ...` creates new empty files, including several names in one
  command: `create notes.txt 'my file.txt'`. Parent directories must already
  exist; use `mkdir -p` first when needed. Existing files, directories and links
  are rejected without overwriting or changing their timestamps. All operands
  are checked before creation, with exclusive file creation to handle conflicts.
  Use `create -- -file.txt` for a name beginning with `-`. Like the other file
  commands, it rejects Windows device/stream paths and link/reparse ancestors.
  It creates empty files only; `touch` remains available to update timestamps.
  Multiple-file creation is not transactional: an I/O error or concurrent change
  can leave earlier files created.
- `write [--] file text ...` creates a file or replaces its contents with the
  supplied text. `append [--] file text ...` adds text at the end and creates a
  missing file. Both write UTF-8 without a BOM and add one LF newline after the
  text. Arguments are joined with single spaces; quote text to preserve internal
  spacing, and use `""` for an empty word or a blank line. Flags after the filename
  are literal text. Example: `write notes.txt 'Hello world'`, then
  `append notes.txt 'Another line'` and `cat notes.txt`. Use
  `write -- -notes.txt 'text'` for a filename beginning with `-`. Parent folders
  must exist. Directory/link/reparse targets and link ancestors are rejected;
  Windows device names and alternate streams are unsupported. The opened file
  handle is checked before truncation. Writes are not transactional: disk/I/O
  errors or concurrent changes may leave partial content. Completion offers
  filenames only in the filename position; it leaves text arguments alone.
  `write`/`append` are explicit K Shell commands; `echo text > file` redirection
  remains unimplemented.
- `tree [-ad] [-L depth] [--] [directory]` displays a sorted folder structure,
  using the shell directory by default. `-L 2` limits it to two levels; `-d` shows
  real directories only, and `-a` includes dotfiles and Windows hidden entries.
  Flags can be combined (`tree -adL2`). Quote paths containing spaces. Branches
  use Unicode tree characters with muted branch lines in interactive terminals.
  It shares the `ls` palette: soft blue folders, mint executables/audio/links,
  lavender images/videos, and amber archives. Counts and branches use muted slate.
  Directory names have no added `/`
  suffix. `NO_COLOR` disables coloring. Redirected and `-c` output has no ANSI colors.
  The final counts include displayed descendants, excluding the root. Symlinks
  and all Windows reparse points, including junctions, are leaves and never
  traversed; a link passed as the root is rejected. `-d` excludes those leaves.
  Use a depth limit for large folders such as projects containing `node_modules`.
  `tree --help` shows the supported flags. No external `tree.exe` is required.
- `cp` / `copy [-r] [--] source destination` copies one file or folder; folders
  require `-r`. `mv` / `move [--] source destination` moves a file or folder.
  An existing destination directory receives the source's original name.
  `rename` / `update [--] source new-name` changes its name in the same parent
  folder; `update` is a rename alias, not an editor or software updater.
  Existing destination entries are never overwritten or merged. Destination
  parents must exist. Copies include file contents and empty directories, without
  preserving timestamps, ACLs, alternate data streams or other metadata.
  Same-drive moves use native Windows no-replace renaming; cross-drive moves
  copy completely before deleting the original. File copies use exclusive creation.
- `rm` / `delete [-rf] [--] path ...` permanently deletes files; `-r` is required
  for real directories. `-f` ignores missing paths and never bypasses protection
  or suppresses other errors. Roots, home, the current directory and its ancestors,
  plus Windows system/program folders and their descendants are protected from
  deletion/moving/renaming. All deletion targets are preflighted before mutation.
  Recursive deletion unlinks symlinks/junctions as leaves; recursive copying and
  cross-drive moves reject links/reparse points before creating the destination.
  Same-drive moves can rename a link as an entry. These commands reject paths
  through link/reparse-point ancestors, Windows devices, alternate streams and
  drive-relative paths such as `D:folder`; use `D:\folder` instead.
  Operations stop on I/O errors and are not transactions: a failed copy may leave
  a partial destination; deletion or cross-drive source cleanup may be partial.
  Avoid concurrent changes to files being copied or removed.
- `cat [file ...]` streams files byte-for-byte; no arguments or `-` reads stdin.
  `clear` clears the interactive screen **and scrollback**, returning the prompt
  to the top. It uses terminal sequences for cursor-home, viewport erase and
  scrollback erase (`H`, `2J`, `3J`), with the editor's native fallback when VT
  is unavailable. This follows Microsoft's [terminal clearing guidance](https://learn.microsoft.com/en-us/windows/console/clearing-the-screen).
  Ctrl+L uses the same terminal clear and the editor's repaint, preserving the
  current input and cursor. Clearing works with `NO_COLOR` and emits nothing
  when redirected or used with `-c`. Command history remains available with Up;
  clearing the display does not erase the history file.
  `help` lists the available commands and key bindings. Utilities reject unknown
  flags; `--` ends flag parsing for filenames beginning with `-`.
- Native programs run through `std::process::Command`, inherit the environment
  and console streams, and receive arguments individually. Built-ins write
  through the supplied output stream. Native process handles are waited for.
- `nano file.txt` opens GNU nano in the current terminal when it is installed.
  Quote names containing spaces: `nano 'my notes.txt'`. Nano creates a missing
  file when you save it. **Ctrl+O**, then **Enter** saves; **Ctrl+X** exits to the
  K Shell prompt. See the [GNU nano manual](https://www.nano-editor.org/dist/latest/nano.html).
  Normal native PATH lookup has precedence. On Windows, bare `nano`/`nano.exe`
  can also find Git for Windows' `usr/bin/nano.exe` via a PATH Git installation
  or standard per-user/system Git locations. It launches that executable
  directly with inherited terminal streams and unchanged arguments, never Git
  Bash, CMD or PowerShell. Git's bundled editor uses its adjacent MSYS DLLs;
  it remains an external application, not a K Shell built-in editor. No new
  installation or permanent PATH change is made. Explicit paths never fall back,
  and `.cmd`/`.bat` wrappers remain rejected. Discovery/completion never launch
  Nano; the command-name snapshot updates at startup/after `cd`. `nano --version`
  provides a noninteractive check. If Nano is unavailable, use a
  [Windows build linked by GNU nano](https://www.nano-editor.org/download.php)
  and add its directory to PATH.
- In an interactive Windows session, Ctrl+C/Ctrl+Break keeps K Shell alive and
  reaches foreground programs normally. When `npm run dev` or another program
  stops, K Shell restores the folder prompt and accepts the next command. The
  shell registers a process-local console handler for the session and removes
  it on exit; it never sets the inherited Ctrl+C-ignore flag. Native Windows
  `STATUS_CONTROL_C_EXIT` is reported as status 130, hidden from the prompt.
  Programs can handle or ignore interrupts themselves (for example SSH can
  forward Ctrl+C to its remote command); K Shell waits for the child to exit
  rather than forcing termination. Batch/`-c` mode retains normal OS signal
  handling. The handler does not intercept close/logoff/shutdown events.
- `code .` opens the current shell directory in VS Code on Windows. If `code`
  resolves to a native executable, that executable runs normally. Otherwise,
  K Shell finds the installed VS Code CLI via its `PATH` entry or standard
  per-user/system installation locations. The adapter launches `Code.exe` with
  its packaged `cli.js`, sets `ELECTRON_RUN_AS_NODE=1` for that child only, and
  passes each argument separately. It never runs `code.cmd` or a command parser.
  Versioned VS Code installation layouts are supported by reading only the known
  quoted installation-relative CLI path from `code.cmd` as metadata. Other batch
  files remain unsupported. `code --version`, `code --new-window .`, quoted folder
  paths, and other arguments are passed to VS Code's CLI. `code` is included in
  completion when a supported installation is found. VS Code Insiders and other
  editor wrappers do not have dedicated adapters yet.
- `open [--] file` opens one existing media/document file with its Windows default
  app. MP3s and videos use the player configured for their file type. Quote paths
  containing spaces; relative paths use the shell's current directory, so use
  an absolute path when the file is elsewhere. Tab completion includes files.
  The command returns after the file has been handed to the app; status 0 means
  the launch request succeeded, not that a media codec can decode the file.
  Missing files and missing associations return status 1 with a diagnostic.
  Choose the default player in Windows Settings > Apps > Default apps if needed.
  This uses `ShellExecuteExW` with one native UTF-16 filename and no command-line
  parameters, independently of normal program execution. It never delegates
  command parsing to another shell. `.exe`, `.com`, `.cmd`, and `.bat` are rejected
  by `open`; it is a file-association action for documents, not a program launcher.
  Other file types are handed to their registered handlers, so open trusted files.
  URLs and directories are not supported by this first version.
- Windows lookup uses explicit paths or `PATH`; relative `PATH` entries are
  relative to the shell directory. Bare names use only `.EXE`/`.COM` entries of
  `PATHEXT` (default `.COM;.EXE` if unset). The current directory is searched only
  through an explicit path such as `.\tool.exe`, or an entry in `PATH`.
- `.cmd` and `.bat` execution is rejected, including implicit `PATHEXT` lookup.
  No general command parsing or execution is delegated to another shell.
- Exit status: native child status; 1 for ordinary built-in/I/O errors; 2 for
  syntax/usage errors; 126 for unsupported scripts or launch failures; 127 for a
  command not found. `exit` without a number uses the previous status.

## Node.js, npm and npx

Windows normally exposes npm through `npm.cmd`/`npm.ps1`, so a native-executable
search alone cannot launch it. K Shell provides dedicated adapters for the bare
commands `npm` and `npx`:

```text
node --version
npm --version
npx --version
cd 'D:\My-Portfolio'
npm run dev
npm run build
```

If no native `npm.exe`/`npx.exe` resolves, K Shell searches PATH installation
directories in order for `node_modules/npm/bin/npm-cli.js` or `npx-cli.js`, then
the resolved Node directory, `%APPDATA%\npm` and standard Program Files Node.js
locations. It uses adjacent `node.exe` when present, otherwise native Node from
PATH. It launches Node with the CLI file and each argument separately, preserving
the current project directory, inherited terminal streams and exit status. Node's
directory is prepended to that child's PATH so package scripts can find it.
Completion includes `npm`/`npx` when supported installations are found.

The adapter never executes `npm.cmd`, `npm.ps1` or discovery helper scripts.
Explicit wrappers such as `npm.cmd` stay unsupported. It uses the CLI files at
the discovered installation; wrapper-specific prefix selection and unrelated
version-manager shims are not interpreted. Missing/incomplete installations
produce a diagnostic explaining how to install Node.js with npm or fix PATH.
No new dependency or automatic package installation is introduced by K Shell.

`npm run` package scripts keep npm's normal behavior, including its configured
script shell (usually CMD on Windows), `node_modules/.bin`, lifecycle hooks and
`--` argument forwarding. This is npm executing the requested package script;
K Shell's own parser/executor remains native. Package installation, downloads,
registry settings and npm errors are handled by npm itself.

## Computer specifications and SSH

Run `sysinfo` or its alias `specs` inside K Shell:

```text
sysinfo
specs
sysinfo --help
```

The summary starts with `OS` (Windows edition, release and build/revision when
available) and `User` (the current Windows logon name), followed by the processor model, logical processors available to K Shell,
all display-adapter names reported by Windows (deduplicated), usable physical
RAM total/used/available, and total/available capacity for each local fixed drive
letter. A `Total` row adds the listed drives' capacity and available space together.
If any listed drive cannot be read, the combined total is marked unavailable.
Sizes use binary units (GiB = 1,024³ bytes). This is a snapshot: run the
command again to refresh. GPU memory, CPU/GPU utilization, physical disk models,
network/removable drives and volumes without drive letters are not included.
OS details come from the read-only Windows CurrentVersion registry values;
client builds from 22000 correct a legacy `Windows 10` product label to Windows 11,
preserving the edition and leaving Server product names unchanged. The
[Windows release information](https://learn.microsoft.com/en-us/windows/release-health/windows11-release-information)
documents the builds. The current user comes from native
[`GetUserNameW`](https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-getusernamew),
not the mutable `USERNAME` environment variable. Optional release/revision values
are omitted when unavailable. OS/user failures are reported individually.
The command also reads the CPU registry entry and calls Windows display, memory and
filesystem APIs directly; it never runs PowerShell, CMD or WMIC. The existing
`windows-sys` dependency exposes those APIs through additional feature flags;
no new crate is required. If a section/volume cannot be read, it displays an
individual diagnostic while the remaining information stays visible. A partial
snapshot returns status 0; invalid arguments return status 2. Interactive output
uses the shared palette; `NO_COLOR`, redirected output and `-c` remain plain.

Use the native Windows OpenSSH client to log in to your server. Replace the
example username, address and key path with your own:

```text
ssh -V
ssh username@192.168.1.100
ssh -p 2222 username@192.168.1.100
ssh -i 'C:\Users\YourName\.ssh\id_ed25519' username@192.168.1.100
```

The first command checks the installed client version without connecting.
`ssh` inherits the terminal so password/key prompts and the remote shell work
normally; type `exit` in the remote shell to return to K Shell. OpenSSH handles
authentication, host-key verification and its usual configuration files. K Shell
passes each argument separately, waits for the client and returns its exit status.
Use full key paths: K Shell does not yet expand `~` or environment variables.
Native `ssh.exe` on `PATH` takes precedence; if absent, K Shell checks the Windows
system directory's `OpenSSH\ssh.exe`. Explicit paths bypass that fallback.
If neither is installed, the error points to Windows Settings > Optional features
> OpenSSH Client. Install the client, then restart K Shell for command suggestions.
This feature does not install or enable an SSH server on your computer.

## Developer tools with KPM (source build)

KPM is a native K Shell builtin for installing developer tools and selecting
managed versions. It is in the updated source build; the existing v0.1.6 download
does not include it. Build the source with current stable Rust and launch the
resulting K Shell, then run `kpm --help`.

```text
kpm list
kpm search java
kpm versions node
kpm install
kpm install node
kpm install java
```

`kpm install` opens a single-tool menu. `kpm install node` (or another tool)
discovers its available Windows x64 releases and shows a separate Latest Stable
shortcut, the five newest distinct stable versions, and Other version for manual
input. The five releases need not have different major versions. Fewer entries
are shown when the provider has fewer releases. Prereleases are filtered out.
Menus use Up/Down, Enter and Esc/Ctrl+C; Esc from version selection returns to
tool selection when installation began without a tool. Discovery failures offer
Retry/Cancel. Installed and saved active versions are marked in the menu.

Exact versions skip the version menu, but still require availability validation
and installation confirmation. Version numbers below are syntax examples, not
claims that those releases are still available:

```text
kpm install node@22.15.0
kpm install python@3.13.2
kpm install go@1.24.1
kpm install rust@1.85.0
kpm install php@8.4.3
kpm install git@2.47.1
kpm install java@21
```

Java selects a full Eclipse Temurin JDK, including `javac`, for feature releases
17 and later. `java@21` resolves the newest available JDK 21 patch/build; a full
provider version such as `java@21.0.6+7` can pin a particular release. Java
versions are not treated as universal SemVer. Git Windows build suffixes are
also verified according to Git's version output.

For scripts or redirected input, specify an explicit version or `@latest` and
`--yes`. The flag skips confirmation, not validation; in a terminal it does not
skip the version menu when no version was supplied. One install command accepts
one tool only:

```text
kpm install node@latest --yes
kpm install java@21 --yes
```

Before confirmation, KPM shows the tool, resolved version, provider, destination,
and any executable found on PATH. Installation uses a cyan, indeterminate marker
moving left to right on stderr, without fake percentages. `KSHELL_KPM_FPS` sets
5-60 refreshes per second (default 30); redirected stderr uses plain messages.
Cursor visibility is restored on success, failure and cancellation.

| Tool | Provider and version management |
| --- | --- |
| Node.js | Official ZIP and SHA-256 list from nodejs.org; isolated versions, switching, native npm/npx integration. LTS labels come from metadata. |
| Python | WinGet `Python.Python.<major>.<minor>`, user scope. One recorded version; `use` and in-place `upgrade` are explicitly unsupported. |
| Go | go.dev release metadata, ZIP and SHA-256; isolated SDKs and switching. |
| Rust | Existing native rustup client; private `RUSTUP_HOME` and `CARGO_HOME`, pinned MSVC toolchains, switching. KPM never bootstraps rustup or changes the user's existing Rust homes. |
| PHP | Official Windows NTS x64 ZIPs and hashes from downloads.php.net; isolated versions and switching. Discovery is limited to the published releases JSON, so archive-only older versions are unavailable. A matching Visual C++ runtime must already be installed. |
| Git | WinGet `Git.Git`, user scope. One recorded version; `use` and in-place `upgrade` are explicitly unsupported. |
| Java | Adoptium metadata and verified Temurin JDK ZIPs; isolated JDKs, switching, matching `java`/`javac`, and child `JAVA_HOME`. |

WinGet must be available through Microsoft's App Installer for Python/Git. The
selected installer must support user scope, KPM's custom destination, and a
matching current-user registry InstallLocation. Otherwise verification fails
and the pending record remains for inspection. Existing unmanaged packages are
not adopted or overwritten. Package/source agreements are accepted as part of
the confirmed installation. WinGet's own installer may update user settings;
KPM never changes system PATH or requests administrator elevation. WinGet
uninstall rechecks exact package/version, managed files and current-user
installer location before removal. Replace a managed Python/Git version by
uninstalling it first, then installing another version.

```text
kpm installed
kpm installed node
kpm current node
kpm use node
kpm use node@22.15.0
kpm use java@21
java -version
javac -version
kpm upgrade node
kpm upgrade node@latest --yes
kpm uninstall node@22.15.0
kpm recover
```

`use` lists only installed, recorded versions and never downloads anything.
Activation runs version verification before saving the selection; Java verifies
both runtime and compiler. The selection affects subsequent commands immediately
and persists across K Shell restarts. K Shell prepends managed bin directories
and sets JAVA_HOME/GOROOT/private Rust variables for children only. Explicit
executable paths retain their normal meaning; native npm/npx use the selected
Node and its packaged CLI scripts. System PATH and the parent terminal's
environment stay unchanged. The shell still lacks variable expansion, so use
`kpm current java`, `java -version` and `javac -version` to check the selection.

The first switchable installation activates automatically after verification.
When another version is active, an interactive install offers activation;
`--yes` preserves that existing selection, so switch explicitly with `kpm use`.
Upgrade installs a newer isolated release; it keeps earlier versions. Active
uninstall confirmation explicitly includes deactivation; `--yes` authorizes
that deactivation too. Only KPM-recorded installations can be removed.

Storage defaults to `%LOCALAPPDATA%\KShell\kpm`. `KSHELL_KPM_HOME` selects an
absolute private root; an empty setting disables storage. KPM refuses nonempty
unmarked roots, unsafe paths and reparse points. An OS file lock serializes
changes, installation records are replaced atomically, and a pending journal
supports recovery after failure or interruption. Downloads require HTTPS from
the configured provider and SHA-256 validation before extraction. ZIP traversal,
links, duplicate files and excessive sizes are rejected.

`kpm recover` verifies a completed pending installation before recording it,
or cleans marked staging when no installation exists. For absent WinGet packages,
recovery also cleans the marked incomplete destination after checking WinGet's
inventory. Recovered versions are not activated automatically. Unverifiable
partial installations, especially WinGet work
outside the requested destination, remain pending for inspection. Do not delete
the store to work around an error. Cancellation drops HTTP work and kills owned
native process jobs; brokered installers can outlive WinGet, so recovery must
check their actual result. Uninstall/file cleanup is not transactional.

HTTP work shares one lazy current-thread Tokio runtime with `kreq`. Production
providers are implemented; automated tests use mock providers, local archives,
and compiled test-owned native binaries, never real software installs or public
network services. Live installation across all seven upstreams still requires
separate verification on machines with the relevant installer prerequisites.

## Native HTTP requests with kreq (source build)

`kreq` is a built-in HTTP client in this source tree. Build with `cargo build`
and launch `target/debug/kshell.exe` to use it; the existing v0.1.6 download
does not include this new command yet. No separate curl installation is required.
It uses reqwest with Rustls and native certificate roots, a current-thread Tokio
runtime shared with KPM, and serde_json for explicit JSON formatting.

Run each example separately inside K Shell:

```text
kreq get 'https://api.example.com/users/1'
kreq get 'https://api.example.com/users/1' --json
kreq GET 'https://api.example.com/users/1' -j
kreq post 'https://api.example.com/users' -H 'Content-Type: application/json' -d '{"name":"John","age":22}'
kreq post 'https://api.example.com/messages' -H 'Content-Type: text/plain' -d 'Hello World'
kreq put 'https://api.example.com/users/1' -d 'replacement'
kreq patch 'https://api.example.com/users/1' -H 'Content-Type: application/json' -d '{"active":true}'
kreq delete 'https://api.example.com/users/1'
kreq head 'https://api.example.com/users/1' -i
kreq options 'https://api.example.com/users' -i
kreq get 'https://api.example.com/profile' -H 'Authorization: Bearer TOKEN'
kreq get 'https://api.example.com/data' -H 'X-API-Key: TOKEN'
kreq get 'https://example.com/download' -L -o 'download.bin'
kreq get 'https://api.example.com/users' --timeout 5 --fail -v
kreq -X PATCH 'https://api.example.com/users/1' -d 'updated'
kreq --help
```

The example API addresses are placeholders; replace them with your own service.
Methods are case-insensitive; options work before or after the URL. `-X` can
override the positional method or supply it when only a URL is given.

| Option | Behavior |
| --- | --- |
| `-j`, `--json` | Parse original response bytes and pretty-print JSON; invalid or empty JSON fails. Objects, arrays and scalar values are supported. |
| `--raw` | Omit the interactive response summary and show only the body. With `--json`, show just formatted JSON. |
| `-H`, `--header` | Add a `Name: value` header; repeat for multiple headers. |
| `-d`, `--data` | Send the supplied text exactly, without adding a newline. |
| `-o`, `--output` | Save original body bytes, overwriting a regular file relative to the shell's current folder. Parent folder must exist. |
| `-i`, `--include` | Prepend final response headers on stdout; with `-o`, only headers go to stdout and the file contains just the body. |
| `-v`, `--verbose` | Send method, URL (without query/fragment), request/final-response headers, status and elapsed time to stderr. Sensitive header values are redacted. |
| `-L`, `--location` | Follow up to 10 HTTP/HTTPS redirects. Off by default. Cross-origin redirects with sensitive request headers are refused to protect credentials. |
| `-X`, `--request` | Override the method using one of the seven supported methods. |
| `--timeout` | Total network timeout in seconds; positive fractions allowed, default 30, maximum 86400. |
| `--fail` | Return status 22 for HTTP 4xx/5xx, while still writing the response body. |
| `-h`, `--help` | Show the complete usage reference. |

Interactive requests show a response summary with `StatusCode`,
`Content`, `RawContent`, and `Headers`. StatusCode combines the numeric code
and description, such as `200 OK` or `404 Not Found`. By default Content
shows the compact response text; `--json` indents JSON inside that field:

```text
StatusCode        : 200 OK
Content           : {
                      "active": true,
                      "id": 1,
                      "name": "John"
                    }
RawContent        : HTTP/1.1 200 OK
                    content-type: application/json

                    {"id":1,"name":"John","active":true}
Headers           : {[content-type, application/json]}
```

Select just content or response headers by adding a final response view.
Options may appear before or after that view; `header` aliases `headers`.
Both terminal views retain the combined StatusCode line:

```text
kreq get 'https://api.example.com/users/1' --json content
kreq get 'https://api.example.com/users/1' content
kreq get 'https://api.example.com/users/1' headers
kreq get 'https://api.example.com/users/1' header
```

Content view omits RawContent and Headers, including with `-i`. Headers view
omits Content and RawContent, skips downloading the body, and ignores `--json`
because no response-body parsing is needed. In raw/batch/redirected output,
content writes only the body; headers writes an HTTP status line and response
headers. With `headers -o headers.txt`, save that header block instead of the
body. `--fail` retains its normal status behavior in either view.

Use `--raw` for body-only terminal output, or `--raw --json` for body-only
formatted JSON. File output, redirected stdout, and batch/`-c` execution omit
the summary. Raw output preserves the exact response bytes, including binary
bytes, without added newlines or colors. JSON output stays plain for reliable
copying and external piping. `--json` changes only response
formatting: set request Content-Type explicitly with `-H`. With `--json -o`,
the body is validated as JSON and the file retains the original bytes; invalid
JSON leaves the destination untouched. Raw file transfers stream without
buffering the full body; explicit JSON formatting buffers it in memory.
Terminal text previews retain at most 64 KiB unless `--json` is requested;
binary bodies show a byte count. RawContent displays the normalized status and
headers plus at most 240 characters of the original body. It is a display
preview, not a wire capture. Summary headers redact credentials and terminal
controls are escaped. `-i` is redundant in a summary; in raw/batch/file modes
it retains its existing header-output behavior. Forms are not parsed.
Failed/interrupted transfers may leave partial raw files or output.

Successful HTTP transactions return 0, including 4xx/5xx unless `--fail` is used.
Usage errors return 2; network, TLS, timeout, JSON and file errors return 1.
Interactive Windows Ctrl+C cancels the transaction and returns 130. These
statuses update shell state and the exit code of `kshell -c`. Authentication
headers are forwarded as supplied. URL user/password credentials are rejected.
Verbose logs redact Authorization, API-key, token, secret and cookie headers,
including known request credentials reflected by response headers; raw body and
explicit `-i` header output remain server data. Avoid verbose mode for private
URLs. Requests do not load curl configuration or a persistent cookie jar.

The shell's existing single- and double-quote rules apply; single-quote JSON,
paths containing spaces, and URLs with `&`. K Shell does not yet implement
internal pipes, `>`/`>>` redirection, variable expansion, or conditional scripting.
Use `-o` inside K Shell; external host pipes/redirection preserve raw stdout.
HTTP tests use only private loopback fixtures, including OS pipes and file handles.

## HTTP requests and downloads with curl

K Shell runs native `curl.exe` directly, with its usual options and exit codes.
Windows' system curl is used when `curl`/`curl.exe` is absent from PATH; a native
PATH installation takes precedence. Explicit paths never fall back, and script
wrappers stay rejected. Completion includes curl when available, using the
existing startup/after-`cd` snapshot. No extra crate or download is required.
TLS verification, proxies, redirects, authentication, curl configuration and
supported protocols are handled by the selected curl installation.

```text
curl --version
curl -I 'https://example.com'
curl -L -o 'page.html' 'https://example.com'
curl 'http://localhost:3000/api?first=1&second=2'
curl -H 'Content-Type: application/json' --data-raw '{"message":"hello world"}' 'http://localhost:3000/api'
```

Quote URLs containing shell operators such as `&` and quote JSON with single
quotes. Use curl's `-o`/`--output` option to save a response; shell `>` redirection
and pipes remain unimplemented. See the [curl manual](https://curl.se/docs/manpage.html).
Automated curl checks use `-q` to disable user configuration and contact only a
test-owned loopback server, with private temporary output files; they never
contact external services.

## Suggestions and keyboard shortcuts

In an interactive terminal:

- The **whole suggested suffix**, including flags/arguments, is colored using
  the proposed complete command. Mint green means locally valid supported syntax
  or a previously successful execution. Rose red means an unknown executable,
  known invalid syntax/options or a previous failed execution. Unverified external
  arguments remain slate grey. For example, typing `do` with history entries
  `docker --sdf` and `docker --version` shows `cker --sdf` entirely red and
  `cker --version` entirely green, respectively. Typed letters keep their normal
  foreground, including after Tab/Right accepts the suggestion. `cl` still shows
  a green `ear` suggestion for `clear`.
  Built-ins, cached native commands and installed npm/npx/code/SSH adapters are
  recognized. Explicit executable paths use native lookup, including quoted
  paths with spaces; suggestions of unsupported executable scripts/missing
  executable paths are red. Built-in argument checks reuse utility/tree option
  parsers, and unsupported shell syntax is checked by the existing parser.
  Docker's global option names, boolean values and required values are checked
  before its subcommand; Docker plugin/subcommand arguments are unverified until
  an execution result is available. Other external argument schemas are not
  guessed. No suggested command or help/discovery subprocess is executed while
  typing. Highlighting cannot predict future permissions, file contents or
  server state; runtime validation still takes place on Enter.
- Start typing `cle`: a green `ar` suggestion appears even on a fresh install.
- Execute `echo hello`, then type `echo h`: history suggests the remaining text.
- Press **Right arrow** at the end of the line to accept the suggestion; this
  inserts text but does not execute it. Press **Enter** to run the command.
- Press **Tab** to complete/cycle built-in commands, native commands from `PATH`,
  or paths relative to the shell directory. `cd`/`mkdir`/`tree` completion shows directories
  only. Filenames with spaces/quotes receive quoting that K Shell can parse.
- The first **Tab** accepts the visible suggestion, including a history
  path such as `D:\` after `cd D`; further Tabs can cycle matching alternatives.
  Without a visible suggestion, Tab uses the normal completion candidates.
  On Windows, `cd D:` + Tab inserts `D:\`. Absolute/UNC completion retains the
  path prefix and the typed `\` or `/` directory-separator style.
- Command completion uses the typed prefix and puts built-ins first: `cle` +
  **Tab** inserts `clear `. Grey hints wait until you type an argument prefix;
  completing a command does not immediately suggest an unrelated file. Commands
  such as `clear`, `pwd`, `help`, and `exit` do not offer file arguments.
- Press **Up/Down** for command history, **Ctrl+R** to search history, **Ctrl+L**
  to clear the screen, **Ctrl+C** to cancel the input line, and **Ctrl+D** on an
  empty line to exit. During `npm run dev`, **Ctrl+C** stops the server normally
  and returns to K Shell instead of exiting the shell.

The tab title is set through the Windows console API. If Windows Terminal is
configured to suppress application titles or the tab has a manual title override,
that host setting takes precedence.

History is limited to 1,000 entries. For compatibility, K Shell continues using
`%APPDATA%\mysh\history.txt` (fallback: `~/.mysh/history.txt`) so existing command
history remains available. A leading space skips a command's history entry.
Use `history` to list that same saved/session history with entry numbers,
oldest first, or `history 10` to show the most recent ten. `history --help`
explains usage; `history 0` prints nothing. Numbers refer to the currently
retained list (up to 1,000 entries); filtered results keep their original numbers.
The current `history` invocation is included when the editor accepts it.
Commands are displayed as entered, with terminal control characters escaped.
The list reflects the editor's loaded history and current session, without
re-reading the file or executing any entries. Leading-space commands stay
excluded even when persistence is disabled. `-c` and batch sessions have no
interactive history and `history` prints nothing there. Clearing/deleting or
replaying entries is not implemented by this command.
Set `KSHELL_HISTORY_FILE` before starting K Shell to use a different history file;
an empty value disables persistence while keeping in-session navigation. If the
history file cannot be read or written, editing continues with in-memory history.
Startup settings use `KSHELL_THEME`, `KSHELL_ICONS`, `KSHELL_SUGGESTION_STYLE`
and `KSHELL_HISTORY_FILE`. Their legacy `MYSH_*` names remain accepted when the
corresponding `KSHELL_*` variable is absent. An explicitly empty new value takes
precedence (including disabling history persistence).
`NO_COLOR` disables suggestion coloring. Native command names are cached on
startup and refreshed after `cd`; restart after installing a new executable.
Suggestions and history are enabled only when both stdin and stdout are terminals.

The most recent 200 command results are kept in memory for the current session,
matched by directory and parsed arguments (so equivalent quoting/spacing matches).
Later results replace earlier ones; status 130 interruptions do not add a failure.
Results are not written to the history file and are forgotten on restart. A
previous failure can remain red until a successful retry, even if external state
has changed. Known invalid syntax always takes priority over remembered success.

## Customize colors and icons

For the coordinated **Midnight** look, build K Shell, then run this installer
from PowerShell in the project directory:

```powershell
cargo build
.\contrib\windows-terminal\Install-KShellProfile.ps1
wt -p "K Shell"
```

It adds a dedicated Windows Terminal profile using **MesloLGM Nerd Font Mono,
13 pt** when already installed (otherwise Consolas/Unicode), a deep ink-blue background, quiet cyan paths, one-cell Nerd Font icons,
an opaque surface, bar cursor and comfortable padding. Use an installed font
with that exact family name; the `-FontFace` parameter can select another Nerd
Font Mono. The installer never installs fonts. It writes only its own
`%LOCALAPPDATA%\Microsoft\Windows Terminal\Fragments\K Shell\kshell.json`
fragment and backs up an earlier copy before replacing it. Your main Terminal
settings and default profile are not rewritten. Use `-Preview` to print the
fragment or `-OutputPath` to generate it in another directory. Use `-Executable`
when building outside `target/debug`. See Microsoft's
[profile appearance settings](https://learn.microsoft.com/en-us/windows/terminal/customize-settings/profile-appearance)
and [fragment extensions](https://learn.microsoft.com/en-us/windows/terminal/json-fragment-extensions).

The profile launches K Shell directly with:

```text
kshell --theme midnight --icons nerd --suggestions soft
```

Startup appearance flags override environment choices and must precede `-c`
when used in command mode. Command-mode output remains plain. The existing
`theme` commands can change appearance during the session.

Prompt, suggestions, `ls`, `tree` and `sysinfo` share the selected foreground
palette. The default Ocean palette uses blue folders, mint success/audio,
lavender code/media, amber configuration/archives and a rose red error marker.
Dusk switches to lavender folders and pink media with warmer gold details.
Midnight uses regular-weight cyan paths, muted sage/rose suggestions, lavender
code, and quieter slate metadata to match the installed Terminal profile.
The terminal's existing font and background are preserved.

Inside K Shell:

```text
theme
theme list
theme install atomic
theme atomic
theme status
theme default
theme dusk
theme midnight
theme ocean
theme icons unicode
theme icons nerd
theme icons off
theme suggestions soft
theme suggestions bold
theme suggestions underline
theme reset
```

`theme` opens the interactive prompt picker. Use Up/Down to preview a design,
Enter to install and activate it, or Esc/Ctrl+C to cancel. A fresh installation
uses the original default prompt; optional designs are `powerline`, `atomic`,
`bubblesline`, `cert`, and `negligible`. They install offline from bundled designs,
without downloading scripts or fonts. With commands, run `theme install <name>`
before `theme <name>` to activate and save a design. `theme list` lists designs;
`theme status` shows your current prompt, palette, icons and suggestion style.
Tab completes design names, installation names, icon modes and suggestion styles.

Prompt installation records and your selection are saved in `%APPDATA%\kshell`
(home fallback `.kshell`) and survive upgrades. `KSHELL_CONFIG_DIR` overrides
that directory; an empty value disables persistence. `theme default` restores
and saves the original prompt. These commands require the installed shell;
the browser Playground supports palette changes only.

Palette, icon and suggestion changes apply to the next prompt and subsequent
listings in this session. `theme reset` restores the original prompt, Ocean,
standard Unicode icons and soft suggestions for this session. To choose startup
palette, icon and suggestion defaults, set these environment values
in PowerShell before launching K Shell (or in your PowerShell profile):

```powershell
$env:KSHELL_THEME = 'dusk'
$env:KSHELL_ICONS = 'unicode'
$env:KSHELL_SUGGESTION_STYLE = 'soft'
& 'D:\Projects\myshell\target\debug\kshell.exe'
```

Suggestions default to **soft**: regular-weight sage green for valid/previously
successful proposals, dusty rose for known errors, and readable ash grey for
unverified arguments. Typed input keeps the terminal's normal foreground, so the
preview is distinct from accepted text. **Bold** uses the stronger existing
status colors; **underline** adds a single underline in the soft status colors.
Trailing completion whitespace stays insertable without an extra underline.
All three styles preserve the same command validation, source text, cursor and
Tab/Right acceptance behavior. `NO_COLOR` disables color and underline together.
The Ocean/Dusk/Midnight theme selects matching preview colors for every style.

The default `unicode` mode uses standard symbols such as `📁`, `📄`, `♪` and
`‹›`; it needs no icon font. `nerd` provides distinct Rust, TypeScript, JavaScript,
Python, Git and other file icons; choose an installed Nerd Font Mono in your
terminal settings for these glyphs. If glyphs appear as boxes, use
`theme icons unicode` or `theme icons off`. K Shell does not install/change fonts.
Icons appear before names in terminal `ls` and `tree`, and before the prompt
path. They are outside quoted filenames and included in column-width calculations.
Redirected and `-c` output remains undecorated and ANSI-free, regardless of theme.
`NO_COLOR` retains the layout without escape sequences; the prompt shows no numeric
exit codes in either mode. Icons remain visible with `NO_COLOR`; disable them
separately with `theme icons off` or `KSHELL_ICONS=off`. Invalid startup values fall
back to the default independently; invalid `theme` arguments leave settings intact.
The palette and design decisions are documented in [DESIGN.md](DESIGN.md).

Command text must be valid Unicode. OS paths and executable lookup use native
path types, but arbitrary non-Unicode filenames cannot yet be expressed in the
command language. `pwd` uses display formatting for paths. Completion skips
unrepresentable names rather than substituting a different filename.

## Gaps and next milestones

The initial inspection found only `AGENTS.md`: no Cargo manifest, source, README,
or tests. This change establishes quoting and native execution before adding
stream and language features.

- Pipes, redirection, `&&`, `||`, separators, background execution, and embedded
  newlines are recognized and rejected **before any command executes**. Thus
  `echo hi|grep hi>out.txt` reports an unsupported operator rather than passing
  syntax as arguments or partially executing the line.
- `$NAME`, `${NAME}`, `$?`, `~`, assignments, and globbing have no expansion yet;
  these characters remain literal. Shell-local variables, `export`, and `unset`
  are not implemented.
- `grep`, `find`, `which`, aliases, scripts, variable-name
  completion, full argument/operator syntax highlighting, custom prompt templates and persistent theme
  configuration files remain unimplemented.
- When feeding commands through redirected stdin, the line reader can buffer
  later input. Use `-c` when a native program needs to consume redirected stdin;
  the command-input and child-input handoff in line mode is not implemented yet.
- Forced cancellation of programs that ignore Ctrl+C, interruptible blocking
  built-ins, close/logoff/shutdown cleanup, production Job Objects, batch
  compatibility and packaging need separate Windows hardening work.

Next correctness milestone: quote-aware expansion, followed by concurrent,
stream-safe pipelines and ordered redirection with failure cleanup tests.

## Verification

Try the file commands in a new scratch folder (run each line separately):

```text
mkdir kshell-file-test
cd kshell-file-test
touch original.txt
copy original.txt backup.txt
mkdir archive
move backup.txt archive
rename archive/backup.txt renamed.txt
update archive/renamed.txt final.txt
tree
delete archive/final.txt
cp -r archive archive-copy
rm -r archive-copy
```

`copy`/`cp` and `move`/`mv` currently take one source and one destination.
File-command tests use owned temporary fixtures for binary/Unicode paths,
non-overwrite behavior, flags, recursive operations, guards, link handling,
completion and side-effect-free suggestion validation. The Windows cross-drive
test runs when temp and the repository are on different drives. Link tests use
a native junction fixture if Windows denies the symlink privilege; additional
`windows-sys` dev feature flags expose its APIs without adding a crate.

```text
cargo fmt --check
cargo test
cargo clippy --all-targets -- -D warnings
```

Tests cover empty/adjacent quotes, literal Windows and Unicode paths, source
spans, unsupported operators, persistent shell state, diagnostics/status codes,
line mode, explicit batch rejection, native executable paths and arguments with
spaces, Windows `PATH`/`PATHEXT` lookup, filesystem commands and flags, binary-safe
`cat`, command/history hints, quoted path completion, persistent history, and
Windows display-path formatting, terminal column widths/colors, Unicode alignment,
plain redirected listings, and clear-screen actions. Filesystem tests use fresh temporary
directories and delete only those directories.

File-opening tests validate command dispatch, errors, media paths after `cd`,
Unicode/space handling, lossless Windows path conversion, and file completion.
Automated tests do not launch desktop apps. To verify a configured media player
manually, run `open 'D:\path\to\song.mp3'` and `open 'D:\path\to\movie.mp4'` with
real files on your machine. Playback and codec support belong to that player.

VS Code tests use fake installations and a native Rust CLI stand-in, without
opening a desktop editor. They check legacy/versioned layouts, search order,
argument/environment handling, current directory, and rejection of direct batch
execution. Manual verification: `code --version`, then `cd 'your project'` and
`code .` with an installed VS Code.

System tests verify hardware snapshots on Windows, both command names, argument
validation/completion, unavailable sections, byte units, provided-stream errors
and color handling. SSH tests check native fallback discovery and, when Windows
OpenSSH is installed, `ssh -V`, offline `ssh -G -F none` argument handling and
error-status propagation with an empty child `PATH`. They never connect to a
server, read SSH configuration or launch desktop apps. An authenticated remote
session requires a real server and is a separate manual check.

Appearance tests cover both palettes and all icon modes, per-session settings,
startup defaults, argument validation/completion, Unicode cell-width alignment,
quoted names, plain output and identical visible prompt text with/without color.

Suggestion-highlighting tests check color transitions, quoted/Unicode command
suffixes, native/adapted command recognition, paths after `cd`, deleted files,
unsupported scripts, whole-suggestion argument status, Docker global flags,
recorded failures/successes, directory/argument scoping, stale-context clearing
and disabled colors. Typed text remains unchanged; highlighting never runs a program.

Node/npm tests cover installation priority, separate npm/Node layouts, incomplete
installations, native-executable precedence, explicit-wrapper rejection and
argument/PATH handling. When npm is installed, an offline temporary fixture
package checks `npm run`, Unicode/space arguments, project directory and nonzero
script status, plus installed CLI versions. Tests use private empty npm config
files and a temporary cache; they do not install packages or access the network.
Manual project check: `npm run dev -- --help` reaches the installed development
tool without starting a server; `npm run dev` starts the actual development server.

Interrupt tests validate event filtering and native exit-status conversion.
The Windows integration check launches an interactive K Shell in a new hidden
console, runs an offline fixture npm package through a Windows batch wrapper
and nested Node processes, and sends a real console Ctrl+C broadcast there.
It verifies the server's listener closes, a subsequent shell command succeeds,
`clear` removes prior console output, Ctrl+L clears while preserving an editable
command, and explicit `exit 0` exits the shell. The helper enables the actual
editor with `TERM=xterm-256color` and tests clearing with `NO_COLOR=1`.
It also verifies the `K Shell` console title, legacy startup-setting fallback,
new-setting precedence and disabled history without changing the legacy file.
When Git's Nano is installed, the same contained console also opens Nano with
user configuration disabled, types into a new temporary file, saves with Ctrl+O
and Enter, exits with Ctrl+X and verifies K Shell can execute another command.
Separate Nano tests cover native PATH precedence, quoted arguments, cwd/status
propagation, explicit-path/script rejection, completion and installed `--version`.
The ignored helper test is invoked by
this check; it must not be run in a user's console. A private test-only Job
Object cleans up all probe processes on failure/timeout. The existing
`windows-sys` crate gains dev feature flags for these native test APIs; no new
crate or general shell delegation is added. Interactive input uses rustyline's
existing Ctrl+C handling; long-running built-ins are a separate milestone.

Manual check in the updated interactive executable:

```text
cd D:\My-Portfolio
npm run dev
```

After the server reports ready, press Ctrl+C once. The folder prompt should
return; run `pwd` to verify the shell is still open, then `exit` when finished.
