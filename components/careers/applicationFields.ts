// The job application's questions — one list, read by the form, the /api/apply
// route and the Sanity schema. Wording and order copied from the live WordPress
// form (momsdesignbuild.com/application/, WPForms 7655) on 2026-10-05.

/** [field name, label, max length] — single-line and paragraph answers */
export const TEXT_FIELDS = [
  ['firstName', 'First Name', 100],
  ['lastName', 'Last Name', 100],
  ['country', 'Country', 100],
  ['address1', 'Address Line 1', 200],
  ['address2', 'Address Line 2', 200],
  ['city', 'City', 100],
  ['state', 'State', 100],
  ['zip', 'ZIP Code', 20],
  ['phone', 'Phone', 50],
  ['email', 'Email Address', 200],
  ['position', 'Position Applying For', 1000],
  ['dateAvailable', 'Date Available', 20],
  ['desiredSalary', 'Desired Salary', 100],
  ['drivingProhibitedWhy', 'If so, why?', 2000],
  ['workedHereWhen', 'If so, when?', 2000],
  ['highSchool', 'High School', 200],
  ['college', 'College', 200],
  ['collegeDegree', 'Degree', 200],
  ['otherEducation', 'Other Education', 200],
  ['otherDegree', 'Degree', 200],
  ['additionalSkills', 'Additional Skills', 5000],
] as const

export const REQUIRED = ['firstName', 'lastName', 'address1', 'city', 'zip', 'email', 'position'] as const

/** [field name, question] — Yes / No */
export const YES_NO = [
  ['driversLicense', "Do you have a valid driver's license?"],
  ['cdl', 'Do you have a valid CDL license?'],
  ['drivingProhibited', 'Is there anything that prohibits you from driving?'],
  ['usCitizen', 'Are you a citizen of the United States?'],
  ['authorizedToWork', 'If no, are you authorized to work in the U.S.?'],
  ['workedHereBefore', 'Have you ever worked for this company?'],
  ['highSchoolGraduated', 'Did you graduate?'],
  ['ged', 'GED?'],
  ['collegeGraduated', 'Did you graduate?'],
] as const

export const REFERENCE_FIELDS = [
  ['firstName', 'First Name'],
  ['lastName', 'Last Name'],
  ['relationship', 'Relationship'],
  ['company', 'Company'],
  ['phone', 'Phone'],
] as const

/** [field name, heading, choices] — "Do you have experience in these areas?" */
export const SKILLS = [
  ['skillsNursery', 'Nursery/Garden Management (For Landscape and Fine Gardening Applicants ONLY)',
    ['Identification of trees, shrubs, plants', 'Planting trees and shrubs', 'Planting perennials and annuals', 'Chemical License', 'Water Feature Treatment', 'Container Design/Seasonal Decor']],
  ['skillsLandscape', 'Landscape (For Landscape Applicants ONLY)',
    ['Installing edging', 'Installing mulch', 'Digging holes with a spade', 'Installing patios and walkways', 'Installing retaining walls', 'Laying natural stone', 'Preparation of sod bed, laying sod', 'Installing Ponds', 'MNLA Certificate', 'Reading a landscape plan', 'Supervising a crew']],
  ['skillsOffice', 'Computer/Office (For All Office Applicants)',
    ['Phone/Customer Service', 'Buildertrend/CRM', 'Microsoft Office', 'Software Creating proposals in Quickbooks', 'SketchUp', 'Adobe Creative Suite']],
  ['skillsMachinery', 'Machinery (For Landscape & Carpentry Applicants ONLY)',
    ['Manual transmission vehicle', 'Skid loader', 'Trencher', 'Sod cutter', 'Tiller', 'Plate packer', 'Brick cutter', 'Chain saw', 'Minor vehicle maintenance', 'Small engine repair', 'Cut off saw', 'Walk behind skid']],
  ['skillsTechnical', 'Technical (For Landscape & Carpentry Applicants ONLY)',
    ['Remodeling', 'Carpentry', 'Welding', 'Irrigation System Experience', 'Low Voltage Lighting Experience', 'Deck Installation', 'Framing', 'Millwork', 'Drywall', 'Roofing']],
  ['skillsSocial', 'Social Media (For Marketing Applicants ONLY)',
    ['Instagram', 'TikTok', 'Facebook', 'Houzz', 'Pinterest']],
] as const

// ponytail: one resume, 4 MB — Vercel rejects request bodies over 4.5 MB. Live WPForms
// took 3 files up to 500 MB; move to a direct-to-Sanity upload if applicants hit the cap.
export const RESUME_MAX_BYTES = 4 * 1024 * 1024
export const RESUME_EXTENSIONS = ['pdf', 'doc', 'docx', 'rtf', 'txt', 'odt', 'pages', 'jpg', 'jpeg', 'png', 'heic']
