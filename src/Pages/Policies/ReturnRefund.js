import React from "react";
import "./Policy.css";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import LuxuryCta from "../../Components/LuxuryCta/LuxuryCta";

const LAST_UPDATED = "26 August 2026";

const SECTIONS = [
  {
    title: "Our Return & Refund Policy",
    body: [
      "At Flucke Luxury Skincare, we are committed to delivering high-quality skincare products. Due to hygiene and product safety standards, all products are non-returnable and non-refundable once delivered, except in the eligible cases mentioned below.",
    ],
  },

  {
    title: "Eligible Returns & Replacements",
    body: [
      "Returns or replacements are accepted only under the following circumstances:",
    ],
    list: [
      "You received the wrong product.",
      "The product was damaged, defective, or broken upon delivery.",
    ],
  },

  {
    title: "Mandatory Unboxing Video",
    body: [
      "A clear, uninterrupted unboxing video is mandatory for all return or replacement requests.",
      "The video must begin before opening the package and clearly show the shipping label, sealed package, and the product inside.",
      "Claims submitted without a valid unboxing video cannot be accepted.",
    ],
  },

  {
    title: "Request Timeline & Conditions",
    body: [
      "To be eligible for a return or replacement request, all of the following conditions must be met:",
    ],
    list: [
      "Report the issue within 48 hours of delivery.",
      "The product must be unused and unopened.",
      "The product must remain in its original packaging with all labels, accessories, and inserts intact.",
      "Provide your order number, photographs, a valid unboxing video, and a detailed description of the issue.",
      "Our support team will review your request and respond within 3–5 business days.",
    ],
  },

  {
    title: "Refunds & Replacements",
    body: [
      "If your request is approved after verification, we may provide either a replacement or a refund depending on product availability and the nature of the issue.",
      "Approved refunds will be processed to the original payment method within 7–10 business days.",
      "Shipping charges are non-refundable unless the error occurred on our side.",
    ],
  },

  {
    title: "Non-Eligible Cases",
    body: [
      "Returns, replacements, or refunds will not be accepted in the following situations:",
    ],
    list: [
      "Change of mind or personal preference.",
      "Dissatisfaction with product results.",
      "Products that have been opened, used, or tampered with.",
      "Claims submitted without a valid unboxing video.",
      "Requests made after 48 hours of delivery.",
      "Incorrect shipping information provided by the customer.",
    ],
  },

  {
    title: "Contact Us",
    body: [
      "For any questions regarding returns or refunds, please contact our customer support team:",
    ],
    list: [
      "Flucke Luxury Skincare",
      "Email: fluckeskincare@gmail.com",
      "Phone: +91 8766226077",
      "Business Hours: Monday – Saturday, 10:00 AM – 6:00 PM",
    ],
  },

  {
    title: "Acceptance of Policy",
    body: [
      "By placing an order with Flucke Luxury Skincare, you acknowledge that you have read, understood, and agreed to this Return & Refund Policy.",
      "Last Updated: 26 August 2026",
    ],
  },
];

export default function ReturnRefund() {
  return (
    <>
      <main className="rl-terms">
        <section className="rl-terms__hero">
          <Breadcrumb
            items={[
              { label: "Home", path: "/" },
              { label: "Shipping & Return" },
            ]}
          />
          <h1 className="rl-terms__title">Shipping & Return </h1>
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
