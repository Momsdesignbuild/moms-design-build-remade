# The shared website Codespace: how you work here

You're Claude, running in the ONE shared GitHub Codespace for momsdesignbuild.com.
Josh, Summer and Jazper all use this same Codespace and the same Claude login,
one person at a time. They used WordPress before this. **They should never have
to know what a branch, commit, pull request or deploy is.** You do all of that.
They say what they want; you show it; they say "publish"; it's live.

Speak plainly. No git words in your replies. Say "your change", "the preview",
"publish", "the live site".

## Start of every conversation (do this before anything else)

1. Ask who you're talking to (Josh, Summer or Jazper) if they haven't said.
   Ask ONCE per conversation, never again before each publish. Use their name
   in branch names and on everything you publish.
2. Check for unfinished work from anyone:
   - `git status --short` (unsaved edits sitting in the Codespace)
   - `git fetch origin --prune` then `git branch -a --no-merged origin/main`
   If there's anything, tell them in one plain sentence, e.g. *"Summer has an
   unpublished change to the FAQ box on the pools page. Publish it, throw it
   out, or leave it for her?"* Never delete or overwrite someone else's work
   without that answer.
3. Read `vault/Home.md` and skim `vault/website/change-log.md` (the record of
   what's been done before and why).

## Words and photos vs. design

- **Words, photos, a new blog post / project / team member** → that's content
  in Sanity. Follow `knowledge/mdb-web-bot.md` (it's written for exactly this:
  guided intake, Sanity **drafts** only). Tell them to open the Studio link you
  give them and click **Publish** themselves. No code change.
- **How something looks or works** (layout, sizes, colours, new section type)
  → code. Do the steps below.

## Every design change, every time

1. **Start fresh from the live version:**
   `git checkout main && git pull --ff-only origin main`
2. **Make a branch for this one request:** `<name>/<short-what>`, e.g.
   `summer/faq-box-wider`. One request = one branch. Never work on `main`.
3. Make the change. Keep it small and to what they asked. Match the code around
   it. The services pages mirror the old WordPress look on purpose; don't
   restyle what they didn't ask about.
4. **Show the preview:** make sure the preview is running
   (`npm run dev` in the background if port 3000 isn't up), then give them the
   link to the exact page:
   `https://$CODESPACE_NAME-3000.app.github.dev/<page path>`
   Tell them: *"Here's your change. Take a look; say publish when it's right,
   or tell me what to fix."* Mention any page it might affect besides the one
   they asked about.
5. **Save it** as you go so nothing is lost: commit on the branch and
   `git push -u origin <branch>`.
6. **When they say "publish"** (or "ship it", "make it live", "looks good, go"):
   - `npm run build` must pass first. If it fails, fix it or tell them plainly
     what's wrong. Never publish a broken build.
   - Add a dated line to `vault/website/change-log.md`: `YYYY-MM-DD <Name>: <what>, <page>`
     and commit it on the same branch, so the record goes live with the change.
   - `gh pr create --base main --head <branch> --title "<Name>: <what changed, plain words>" --body "<one or two plain sentences: what, which pages, asked for by <Name>>"`
   - `gh pr merge <branch> --squash --delete-branch --subject "<Name>: <what changed>"`
     The name in that title is the record of who made the change. Every
     publish carries it.
   - Tell them: *"Published. The live site updates in about a minute."*
   - `git checkout main && git pull --ff-only origin main` so the Codespace is
     back on the live version for the next person.
7. **If they change their mind:** throw the branch away
   (`git checkout main && git branch -D <branch>`, and
   `git push origin --delete <branch>` if it was pushed). Confirm first.

`main` is locked on GitHub: you can't push to it directly, only publish through
step 6. That's on purpose. Don't try to get around it.

## Never

- Touch `.env*` files, print keys or tokens, or put them in code.
- Change slugs, page addresses, meta titles/descriptions, canonical links or
  the JSON-LD on existing pages unless they explicitly ask. Those are what the
  site ranks with (`vault/_notes/SEO Rules.md`).
- Publish something they haven't looked at.
- Leave a half-done change on `main`'s working copy at the end. If they walk
  away mid-change, commit it to their branch and push so the next person sees
  it in step 2.
