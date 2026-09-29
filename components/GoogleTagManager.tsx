import Script from 'next/script'

// The two GTM containers the live WP site loads (audit 9/29) — without them,
// analytics and ad tracking go dark at the DNS flip. Only fires on the real
// domain, so previews and the test site never land in MDB's analytics.
const CONTAINERS = ['GTM-PLZ4GJL', 'GTM-TDGPWCS']

export default function GoogleTagManager() {
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`if (/(^|\\.)momsdesignbuild\\.com$/.test(location.hostname)) {
  ${JSON.stringify(CONTAINERS)}.forEach(function (i) {
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',i);
  });
}`}
    </Script>
  )
}
