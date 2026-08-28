import React from "react";
import "./Policy.css";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import LuxuryCta from "../../Components/LuxuryCta/LuxuryCta";

const LAST_UPDATED = "December 31, 2025";

const SECTIONS = [
  {
    title: "Products & Information",
    body: [
      "We make reasonable efforts to ensure that product descriptions, images, shades, ingredients, and other information on our website are accurate. However, slight variations in colour or appearance may occur due to lighting, photography, or individual screen settings.",
    ],
  },

  {
    title: "Orders & Acceptance",
    body: [
      "Placing an order does not guarantee acceptance. We reserve the right to cancel or refuse an order in cases such as product unavailability, pricing errors, suspected fraudulent activity, or incorrect order information.",
    ],
  },

  {
    title: "Pricing & Payments",
    body: [
      "All prices displayed on the website are subject to change without prior notice. Orders must be paid through the payment methods available on our website.",
      "We are not responsible for delays or failures caused by third-party payment providers.",
    ],
  },

  {
    title: "Shipping & Delivery",
    body: [
      "Orders are shipped to the address provided by the customer. Customers are responsible for providing accurate delivery information.",
      "Delivery timelines are estimates and may be affected by courier delays, weather conditions, public holidays, or other circumstances beyond our control.",
    ],
  },

  {
    title: "Returns & Refunds",
    body: [
      "Due to the hygienic nature of skincare products, products are generally non-returnable and non-refundable except in eligible cases.",
      "Please refer to our Return & Refund Policy for complete details.",
    ],
    list: [
      "Wrong product received",
      "Damaged or defective product",
      "Broken product received",
      "Mandatory unboxing video required for claims",
      "Claims must be reported within 48 hours of delivery",
    ],
  },

  {
    title: "Product Use & Safety",
    body: [
      "Customers should carefully read the product packaging, ingredients, usage directions, and warnings before using any product.",
      "Perform a patch test before first use wherever appropriate and discontinue use immediately if irritation or any adverse reaction occurs.",
      "Flucke Luxury Skincare does not guarantee that every product will be suitable for every individual's skin type or produce identical results.",
    ],
  },

  {
    title: "Intellectual Property",
    body: [
      "All website content including logos, brand names, product images, photographs, graphics, text, designs, and other materials are the exclusive property of Flucke Luxury Skincare or their respective owners.",
      "Unauthorized copying, reproduction, modification, distribution, or commercial use is strictly prohibited without prior written permission.",
    ],
  },

  {
    title: "Prohibited Use",
    body: [
      "You agree not to misuse our website or services.",
    ],
    list: [
      "Use the website for unlawful or fraudulent purposes",
      "Attempt unauthorized access to our systems",
      "Copy or misuse our content, branding, or product information",
      "Interfere with the operation, security, or functionality of the website",
    ],
  },

  {
    title: "Third-Party Services",
    body: [
      "Our website may use third-party service providers including payment gateways, courier companies, analytics providers, and other business partners.",
      "These services are governed by their own respective terms and privacy policies.",
    ],
  },

  {
    title: "Limitation of Liability",
    body: [
      "To the maximum extent permitted by applicable law, Flucke Luxury Skincare shall not be liable for indirect, incidental, consequential, or special damages arising from the use of our website or products.",
      "Nothing in these Terms limits any statutory rights or protections that cannot legally be excluded under applicable law.",
    ],
  },

  {
    title: "Changes to These Terms",
    body: [
      "We reserve the right to modify these Terms & Conditions at any time.",
      "Updated terms will become effective immediately upon publication on this website. Continued use of the website after such changes constitutes your acceptance of the revised Terms.",
    ],
  },

  {
    title: "Governing Law",
    body: [
      "These Terms & Conditions shall be governed by the applicable laws of India. Any disputes arising from these Terms or your use of our website shall be subject to the exclusive jurisdiction of the competent courts in India.",
    ],
  },

  {
    title: "Contact Us",
    body: [
      "For any questions regarding these Terms & Conditions, please contact us:",
    ],
    list: [
      "Flucke Luxury Skincare",
      "Email: fluckeskincare@gmail.com",
      "Phone: +91 8766226077",
      "Business Hours: Monday – Saturday, 10:00 AM – 6:00 PM",
    ],
  },

  {
    title: "Acceptance of Terms",
    body: [
      "By accessing our website or placing an order with Flucke Luxury Skincare, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.",
      "Last Updated: 26 August 2026",
    ],
  },
];

export default function TermCondition() {
  return (
    <>
      <main className="rl-terms">
        <section className="rl-terms__hero">
          <Breadcrumb
            items={[
              { label: "Home", path: "/" },
              { label: "Terms & Conditions" },
            ]}
          />
          <h1 className="rl-terms__title">Terms & Conditions</h1>
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
