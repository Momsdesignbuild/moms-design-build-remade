import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Homeowner Project Portal Access & Set-Up - Mom's Design Build" },
  description:
    "Mom's Design Build uses Buildertrend to help communicate important information about your project and more. Set up & access your project portal today.",
};

export default function HomeownerPortalPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="py-16 md:py-20 px-6 text-center bg-white border-b border-gray-100">
        <h1 className="text-[22px] md:text-[28px] font-[300] tracking-[0.25em] uppercase text-ink">
          Your Homeowner Project Portal
        </h1>
      </section>

      {/* ── Main Content ── */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-[900px] mx-auto grid md:grid-cols-2 gap-16">

          {/* Left: Online Access + Overview + Hints */}
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-[12px] font-[500] tracking-[0.2em] uppercase text-ink mb-4">
                Online Access
              </h2>
              <p className="text-[14px] font-[300] leading-[1.85] text-muted mb-6">
                Our simple site makes it possible to access your project from any computer, tablet, or phone.
              </p>
              <a
                href="https://buildertrend.net/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0097a7] text-white text-[11px] font-[600] tracking-[0.15em] uppercase px-6 py-3 hover:bg-[#00838f] transition-colors duration-200"
              >
                Sign In to Buildertrend
              </a>
            </div>

            <div>
              <h2 className="text-[12px] font-[500] tracking-[0.2em] uppercase text-ink mb-4">
                Overview
              </h2>
              <p className="text-[14px] font-[300] leading-[1.85] text-muted mb-4">
                Buildertrend is the project management program we use to communicate important information about your project, from the design phase throughout its completion.
              </p>
              <p className="text-[14px] font-[300] leading-[1.85] text-muted mb-4">
                The Buildertrend homeowner portal is easy to navigate and allows you to see your designs, material and product selections, build plans and financial information at your convenience. By activating your portal, you will receive important notices about action items, your project schedule, payment due dates, and warranty information.
              </p>
              <p className="text-[14px] font-[300] leading-[1.85] text-muted">
                Invoices can also be paid online for faster processing to keep your project on-schedule.
              </p>
            </div>

            <div>
              <h2 className="text-[12px] font-[500] tracking-[0.2em] uppercase text-ink mb-4">
                Helpful Hints
              </h2>
              <ul className="flex flex-col gap-3">
                <li className="text-[14px] font-[300] leading-[1.75] text-muted">
                  If you forgot your username or password --{" "}
                  <a
                    href="https://buildertrend.net/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:underline"
                  >
                    click here to reset your credentials
                  </a>
                  .
                </li>
                <li className="text-[14px] font-[300] leading-[1.75] text-muted">
                  Buildertrend offers a homeowner help portal.{" "}
                  <a
                    href="https://help.buildertrend.com/hc/en-us"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:underline"
                  >
                    Click here to see all video and written tutorials
                  </a>{" "}
                  that Buildertrend has created.
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Portal Set-Up */}
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-[12px] font-[500] tracking-[0.2em] uppercase text-ink mb-6">
                Portal Set-Up
              </h2>
              <ol className="flex flex-col gap-8">
                {[
                  {
                    n: "1",
                    title: "Accept Invitation",
                    body: "Once your portal is set-up and ready for activation, you will receive an email notification from momsdesignbuild@buildertrend.net with the subject line: Mom's Design Build Requests Your Participation. Open the email and click the ACCEPT button located at the bottom.",
                  },
                  {
                    n: "2",
                    title: "Create Username & Password",
                    body: "Follow the prompt to create your username and password. Please Note: Buildertrend only allows one credential portal per household. If more than one person has shared authority to access and approve documents, the one credential should be shared and used to log in.",
                  },
                  {
                    n: "3",
                    title: "Download Mobile App",
                    body: "Buildertrend is available in the App Store for your device. The mobile app is great for quick access and approvals, but the desktop version is more user-friendly.",
                  },
                  {
                    n: "4",
                    title: "Log In & Look Around",
                    body: "Once logged in, explore the portal. On the right is the What's Happening section -- alerts for actions needed, invoices, messages, and to-dos. On the left is your job price summary. Under Files > Documents you'll find all contracts, surveys, designs, and warranty info. Under Project Management > Selections you'll see all material selections.",
                  },
                ].map((step) => (
                  <li key={step.n} className="flex gap-5">
                    <span className="text-[22px] font-[300] text-brand/40 leading-none flex-shrink-0 w-6 text-right mt-0.5">
                      {step.n}.
                    </span>
                    <div>
                      <h3 className="text-[13px] font-[500] tracking-[0.12em] uppercase text-ink mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[13px] font-[300] leading-[1.85] text-muted">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t border-gray-100 pt-10">
              <h2 className="text-[12px] font-[500] tracking-[0.2em] uppercase text-ink mb-6">
                Online Payment Set-Up
              </h2>
              <ol className="flex flex-col gap-8">
                {[
                  {
                    n: "1",
                    title: "View All Invoices",
                    body: "Log in to your homeowner portal and click the Upcoming Invoices page found under the What's Happening section.",
                  },
                  {
                    n: "2",
                    title: "View and Select Invoices",
                    body: "Click the ID number to view the details for each invoice. Then, click Make Payment to select which invoices to pay. On the pop-up box, check the boxes next to invoices that are due and then click Pay Online.",
                  },
                  {
                    n: "3",
                    title: "Set Up Bank Account",
                    body: "You will reach the WePay account set-up page. Click Continue and follow the prompts to link your banking information. WePay will deposit two micro deposits into your account that you will need to verify. Your payment will not process until verification is complete.",
                  },
                ].map((step) => (
                  <li key={step.n} className="flex gap-5">
                    <span className="text-[22px] font-[300] text-brand/40 leading-none flex-shrink-0 w-6 text-right mt-0.5">
                      {step.n}.
                    </span>
                    <div>
                      <h3 className="text-[13px] font-[500] tracking-[0.12em] uppercase text-ink mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[13px] font-[300] leading-[1.85] text-muted">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#f7f4ef] py-14 px-6 text-center border-t border-gray-100">
        <p className="text-[13px] font-[300] tracking-[0.08em] text-muted mb-6 max-w-md mx-auto">
          Don&apos;t have an account yet? Contact your project manager to get started.
        </p>
        <Link
          href="/contact"
          className="inline-block border border-ink text-ink text-[10px] font-[500] tracking-[0.2em] uppercase px-8 py-3 hover:bg-ink hover:text-white transition-colors duration-300"
        >
          Contact Your Project Manager
        </Link>
      </section>
    </>
  );
}
