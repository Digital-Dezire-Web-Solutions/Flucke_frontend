import React from "react";
import "./Policy.css";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import LuxuryCta from "../../Components/LuxuryCta/LuxuryCta";

const LAST_UPDATED = "December 31, 2025";

const SECTIONS = [
  {
    title: "Information We Collect",
    body: [
      "When you visit our website or place an order, we may collect certain personal and non-personal information required to provide our products and services.",
    ],
    list: [
      "Name, phone number, email address, and billing/shipping address.",
      "Order and payment-related information.",
      "Information provided when contacting customer support.",
      "Website usage information such as cookies, browser details, and device information.",
    ],
  },

  {
    title: "How We Use Your Information",
    body: [
      "We use your information to operate our business and improve your shopping experience.",
    ],
    list: [
      "Process and deliver your orders.",
      "Confirm payments and provide order updates.",
      "Respond to customer service requests.",
      "Improve our products, website, and customer experience.",
      "Send promotional communications where permitted by law or with your consent.",
      "Prevent fraud, misuse, and unauthorized transactions.",
    ],
  },

  {
    title: "Payment Information",
    body: [
      "Payments are processed through secure third-party payment providers. Flucke Luxury Skincare does not store your complete credit/debit card details, UPI credentials, or banking information on its own servers.",
    ],
  },

  {
    title: "Sharing of Information",
    body: [
      "We respect your privacy and never sell or rent your personal information.",
      "Your information may only be shared with trusted third-party service providers when necessary to operate our business or comply with legal obligations.",
    ],
    list: [
      "Payment gateway providers.",
      "Shipping and courier partners.",
      "Technology and website service providers.",
      "Customer support service providers.",
      "Government or legal authorities where required by law.",
    ],
  },

  {
    title: "Cookies",
    body: [
      "Our website may use cookies and similar technologies to improve website functionality, analyze visitor behavior, and enhance your browsing experience.",
      "You can manage or disable cookies through your browser settings at any time.",
    ],
  },

  {
    title: "Data Security",
    body: [
      "We implement reasonable technical and organizational safeguards to protect your personal information from unauthorized access, misuse, alteration, or disclosure.",
      "However, no method of internet transmission or electronic storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },

  {
    title: "Data Retention",
    body: [
      "We retain your personal information only for as long as reasonably necessary to provide our services, maintain business and transaction records, resolve disputes, and comply with applicable legal requirements.",
    ],
  },

  {
    title: "Your Rights",
    body: [
      "Subject to applicable laws, you may exercise certain rights regarding your personal information.",
    ],
    list: [
      "Request access to your personal information.",
      "Request correction of inaccurate information.",
      "Request deletion of your personal information where legally permitted.",
      "Opt out of promotional communications at any time.",
    ],
  },

  {
    title: "Third-Party Links",
    body: [
      "Our website may contain links to third-party websites or services. We are not responsible for the privacy practices, security, or content of those external websites.",
      "We encourage you to review their respective privacy policies before sharing personal information.",
    ],
  },

  {
    title: "Children's Privacy",
    body: [
      "Our website and services are not intended for children. We do not knowingly collect or solicit personal information from children.",
    ],
  },

  {
    title: "Policy Updates",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or business operations.",
      "Any updates will be published on this page along with the revised effective date.",
    ],
  },

  {
    title: "Contact Us",
    body: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us:",
    ],
    list: [
      "Flucke Luxury Skincare",
      "Email: fluckeskincare@gmail.com",
      "Phone: +91 8766226077",
      "Business Hours: Monday – Saturday, 10:00 AM – 6:00 PM",
    ],
  },

  {
    title: "Last Updated",
    body: [
      "Last Updated: 26 August 2026",
      "By using our website, you acknowledge that you have read, understood, and agreed to this Privacy Policy.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <main className="rl-terms">
        <section className="rl-terms__hero">
          <Breadcrumb
            items={[
              { label: "Home", path: "/" },
              { label: "Privacy Policy" },
            ]}
          />
          <h1 className="rl-terms__title">Privacy Policy</h1>
          <p className="rl-terms__updated">Last updated: {LAST_UPDATED}</p>
        </section>

        <section className="rl-terms__body">
          {SECTIONS.map((section) => (
            <article key={section.title} className="rl-terms__section">
              <h2>{section.title}</h2>
              {section.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              {section.list && (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </section>
      </main>
      <LuxuryCta />
    </>
  );
}
