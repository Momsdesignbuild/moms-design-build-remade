'use client'

import { useState } from 'react'
import COUNTRIES from './countries.json'
import { REFERENCE_FIELDS, RESUME_EXTENSIONS, RESUME_MAX_BYTES, SKILLS, YES_NO } from './applicationFields'

const field =
  'w-full border border-ink/20 bg-white px-4 py-3 text-[20px] font-[300] tracking-[0.04em] text-ink placeholder:text-muted/60 focus:outline-none focus:border-ink'
const labelCls = 'block text-[18px] font-[400] tracking-[0.04em] text-ink mb-2'
const heading = 'text-[22px] font-[300] tracking-[0.2em] uppercase text-ink'

const Star = () => <span className="text-red-700/80" aria-hidden="true"> *</span>

function Field({
  name,
  label,
  required,
  type = 'text',
  rows,
}: {
  name: string
  label: string
  required?: boolean
  type?: string
  rows?: number
}) {
  return (
    <label className="block">
      <span className={labelCls}>
        {label}
        {required && <Star />}
      </span>
      {rows ? (
        <textarea name={name} rows={rows} required={required} className={field} />
      ) : (
        <input name={name} type={type} required={required} className={field} />
      )}
    </label>
  )
}

const QUESTIONS = Object.fromEntries(YES_NO) as Record<(typeof YES_NO)[number][0], string>

function YesNo({ name }: { name: keyof typeof QUESTIONS }) {
  return (
    <fieldset>
      <legend className={labelCls}>{QUESTIONS[name]}</legend>
      <div className="flex gap-8">
        {['Yes', 'No'].map((v) => (
          <label key={v} className="flex items-center gap-2 text-[20px] font-[300] text-ink">
            <input type="radio" name={name} value={v} className="h-5 w-5 accent-ink" />
            {v}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

const Section = ({ title, note }: { title: string; note?: string }) => (
  <div className="border-t border-ink/15 pt-10">
    <h2 className={heading}>{title}</h2>
    {note && <p className="mt-2 text-[20px] font-[300] text-muted">{note}</p>}
  </div>
)

/** their WP job-application form, question for question — submissions → Sanity */
export default function ApplicationForm() {
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state === 'busy') return
    const f = new FormData(e.currentTarget)
    const resume = f.get('resume')
    if (resume instanceof File && resume.size > RESUME_MAX_BYTES) {
      setError('Your resume is over 4 MB — please upload a smaller file.')
      setState('error')
      return
    }
    setState('busy')
    try {
      const res = await fetch('/api/apply', { method: 'POST', body: f })
      if (res.ok) return setState('done')
      const j = await res.json().catch(() => null)
      setError(j?.error ?? '')
      setState('error')
    } catch {
      setError('')
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div className="text-center py-16">
        <p className="text-[20px] font-[300] tracking-[0.1em] uppercase text-ink mb-3">Application received</p>
        <p className="text-[20px] font-[300] text-muted">
          Thank you — our team will be in touch if there&rsquo;s a fit.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <h2 className={heading}>Applicant Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field name="firstName" label="First Name" required />
        <Field name="lastName" label="Last Name" required />
      </div>

      <label className="block">
        <span className={labelCls}>Country</span>
        <select name="country" defaultValue={COUNTRIES[0]} className={field}>
          {COUNTRIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      <Field name="address1" label="Address Line 1" required />
      <Field name="address2" label="Address Line 2" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Field name="city" label="City" required />
        <Field name="state" label="State" />
        <Field name="zip" label="ZIP Code" required />
      </div>

      <Field name="phone" label="Phone" type="tel" />
      <Field name="email" label="Email Address" type="email" required />
      <Field name="position" label="Position Applying For" rows={3} required />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field name="dateAvailable" label="Date Available" type="date" />
        <Field name="desiredSalary" label="Desired Salary" />
      </div>

      <YesNo name="driversLicense" />
      <YesNo name="cdl" />
      <YesNo name="drivingProhibited" />
      <Field name="drivingProhibitedWhy" label="If so, why?" rows={3} />
      <YesNo name="usCitizen" />
      <YesNo name="authorizedToWork" />
      <YesNo name="workedHereBefore" />
      <Field name="workedHereWhen" label="If so, when?" rows={3} />

      <Section title="Education" />
      <Field name="highSchool" label="High School" />
      <YesNo name="highSchoolGraduated" />
      <YesNo name="ged" />
      <Field name="college" label="College" />
      <YesNo name="collegeGraduated" />
      <Field name="collegeDegree" label="Degree" />
      <Field name="otherEducation" label="Other Education" />
      <Field name="otherDegree" label="Degree" />

      <Section title="References" note="Please list three references that can be contacted." />
      {[1, 2, 3].map((n) => (
        <fieldset key={n} className="space-y-5">
          <legend className="text-[20px] font-[500] tracking-[0.1em] uppercase text-ink mb-4">Reference {n}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {REFERENCE_FIELDS.map(([k, label]) => (
              <Field key={k} name={`ref${n}_${k}`} label={label} type={k === 'phone' ? 'tel' : 'text'} />
            ))}
          </div>
        </fieldset>
      ))}

      <div className="border-t border-ink/15 pt-10">
        <label className="block">
          <span className={labelCls}>
            Upload Resume
            <Star />
          </span>
          <input
            name="resume"
            type="file"
            required
            accept={RESUME_EXTENSIONS.map((x) => `.${x}`).join(',')}
            className={`${field} file:mr-4 file:border-0 file:bg-ink file:text-white file:px-4 file:py-2 file:text-[16px] file:tracking-[0.1em] file:uppercase`}
          />
          <span className="mt-2 block text-[16px] font-[300] text-muted">PDF, Word document or photo, up to 4 MB.</span>
        </label>
      </div>

      <Section title="Skills/Experience" note="Do you have experience in these areas?" />
      {SKILLS.map(([name, title, choices]) => (
        <fieldset key={name}>
          <legend className={labelCls}>{title}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
            {choices.map((c) => (
              <label key={c} className="flex items-start gap-3 text-[20px] font-[300] text-ink">
                <input type="checkbox" name={name} value={c} className="mt-1.5 h-5 w-5 shrink-0 accent-ink" />
                {c}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <Field name="additionalSkills" label="Additional Skills" rows={5} />

      {/* honeypot — hidden from people, filled by bots */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={state === 'busy'}
          className="border border-ink bg-ink text-white text-[20px] font-[500] tracking-[0.2em] uppercase px-10 py-3 hover:bg-white hover:text-ink transition-colors duration-300 disabled:opacity-60"
        >
          {state === 'busy' ? 'Submitting…' : 'Apply'}
        </button>
        {state === 'error' && (
          <p className="mt-3 text-[20px] text-red-700/80">
            {error || 'Something went wrong — try again or email hello@momsdesignbuild.com'}
          </p>
        )}
      </div>
    </form>
  )
}
