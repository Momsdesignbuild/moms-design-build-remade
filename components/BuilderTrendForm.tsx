"use client";

import Script from "next/script";

// The BuilderTrend lead-capture form — copied verbatim from the live WP
// contact page (builderID 19370, JWT in the URL is theirs). BuilderTrend's
// btClientContactForm.js finds #btIframe and manages its height via
// postMessage. WP served the iframe lazyloaded via data-src; we set src
// directly and load the script after hydration.
const BT_FORM_URL =
  "https://buildertrend.net/leads/contactforms/ContactFormFrame.aspx?builderID=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJidWlsZGVySWQiOjE5MzcwfQ._lPz4lD4-Qn0PkPd4uOsKUlnIw12nXVzgiXLTpVn_HQ";

export default function BuilderTrendForm() {
  return (
    <>
      <iframe
        scrolling="no"
        id="btIframe"
        title="Contact Mom's Design Build"
        style={{
          background: "transparent",
          border: "0px",
          margin: "0 auto",
          width: "100%",
          minHeight: "640px",
        }}
        src={BT_FORM_URL}
      />
      <Script
        src="https://buildertrend.net/leads/contactforms/js/btClientContactForm.js"
        strategy="afterInteractive"
      />
    </>
  );
}
