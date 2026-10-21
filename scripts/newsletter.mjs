// The Brevo newsletter, from the Codespace. Needs BREVO_API_KEY (a Codespace secret).
//   node scripts/newsletter.mjs count            how many people are on the website list
//   node scripts/newsletter.mjs recent [n]       the newest sign-ups (default 10)
//   node scripts/newsletter.mjs add <email>      add one person
//   node scripts/newsletter.mjs remove <email>   take one person off the list
//   node scripts/newsletter.mjs lists            every list in the account, with sizes
// Sending a campaign is NOT here on purpose: that needs Josh's word, each time.
const key = process.env.BREVO_API_KEY
const LIST = Number(process.env.BREVO_LIST_ID || 7) // "Website newsletter"
if (!key) { console.error("Missing BREVO_API_KEY. It's a Codespace secret; ask Josh. Rebuild the Codespace after it's added."); process.exit(1) }

const api = async (path, opts = {}) => {
  const res = await fetch('https://api.brevo.com/v3' + path, { ...opts, headers: { 'api-key': key, 'content-type': 'application/json', accept: 'application/json', ...opts.headers } })
  const text = await res.text()
  if (!res.ok) { console.error(`Brevo said ${res.status}: ${text.slice(0, 300)}`); process.exit(1) }
  return text ? JSON.parse(text) : {}
}

const [cmd, arg] = process.argv.slice(2)
if (cmd === 'count') {
  const l = await api(`/contacts/lists/${LIST}`)
  console.log(`${l.name}: ${l.uniqueSubscribers} people`)
} else if (cmd === 'recent') {
  const d = await api(`/contacts/lists/${LIST}/contacts?limit=${Number(arg) || 10}&sort=desc`)
  for (const c of d.contacts || []) console.log(`${c.createdAt?.slice(0, 10)}  ${c.email}`)
  if (!d.contacts?.length) console.log('No one on the list yet.')
} else if (cmd === 'add' && arg) {
  await api('/contacts', { method: 'POST', body: JSON.stringify({ email: arg.toLowerCase(), listIds: [LIST], updateEnabled: true }) })
  console.log(`Added ${arg} to the website newsletter.`)
} else if (cmd === 'remove' && arg) {
  await api(`/contacts/lists/${LIST}/contacts/remove`, { method: 'POST', body: JSON.stringify({ emails: [arg.toLowerCase()] }) })
  console.log(`Removed ${arg} from the website newsletter.`)
} else if (cmd === 'lists') {
  const d = await api('/contacts/lists?limit=50')
  for (const l of d.lists || []) console.log(`${l.id}  ${l.name}  (${l.uniqueSubscribers} people)`)
} else {
  console.error('usage: newsletter.mjs count | recent [n] | add <email> | remove <email> | lists'); process.exit(1)
}
