import React from "react";

const CookiePolicy = () => {
  return (
    <div className="bg-white mt-20 text-gray-800 px-6 md:px-20 py-16 leading-relaxed">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
          Cookie Policy
        </h1>
        <p className="text-gray-500 text-lg">
          This Cookie Policy explains how Zusko uses cookies and similar
          technologies to enhance your experience.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto space-y-10 text-justify">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
          <p>
            Welcome to <strong>Zusko</strong>. This Cookie Policy outlines how we
            use cookies, web beacons, and similar tracking technologies when you
            visit our website or mobile application (collectively, the “Platform”).
            This policy should be read together with our{" "}
            <a
              href="/privacy"
              className="text-yellow-500 hover:underline font-medium"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="/terms"
              className="text-yellow-500 hover:underline font-medium"
            >
              Terms & Conditions
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            2. What Are Cookies?
          </h2>
          <p>
            Cookies are small text files placed on your device (computer,
            smartphone, or tablet) when you visit a website. They are widely used
            to make websites work efficiently, remember preferences, and collect
            analytical data to improve services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            3. Types of Cookies We Use
          </h2>
          <p>
            Zusko uses different types of cookies to deliver the best experience:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>
              <strong>Essential Cookies:</strong> These are required for the
              website to function properly, such as enabling secure login and
              maintaining session data.
            </li>
            <li>
              <strong>Performance Cookies:</strong> These cookies help us
              understand how users interact with our website by collecting
              anonymous analytics data (e.g., pages visited, time spent).
            </li>
            <li>
              <strong>Functional Cookies:</strong> They remember your
              preferences—like location, language, or saved settings—to enhance
              usability.
            </li>
            <li>
              <strong>Advertising Cookies:</strong> These cookies deliver
              relevant advertisements and track the effectiveness of marketing
              campaigns. They may be set by third-party advertising networks.
            </li>
            <li>
              <strong>Third-Party Cookies:</strong> Some cookies come from
              third-party analytics or advertising partners (like Google
              Analytics or Meta Ads) to help us analyze trends and improve user
              experience.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            4. How We Use Cookies
          </h2>
          <p>
            We use cookies for various purposes, including but not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Enhancing the functionality and security of our Platform.</li>
            <li>Analyzing traffic and user behavior to improve our services.</li>
            <li>Providing a personalized browsing and booking experience.</li>
            <li>
              Remembering your preferences and previously selected options.
            </li>
            <li>
              Showing relevant promotions, offers, and advertisements.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            5. Managing or Disabling Cookies
          </h2>
          <p>
            You can manage or disable cookies through your browser settings. Most
            browsers allow you to block or delete cookies, but doing so may
            affect certain functionalities of our website or mobile application.
            Instructions for managing cookies vary by browser:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>
              <strong>Google Chrome:</strong> Settings → Privacy and Security →
              Cookies and other site data.
            </li>
            <li>
              <strong>Mozilla Firefox:</strong> Options → Privacy & Security →
              Cookies and Site Data.
            </li>
            <li>
              <strong>Safari:</strong> Preferences → Privacy → Manage Website
              Data.
            </li>
            <li>
              <strong>Microsoft Edge:</strong> Settings → Cookies and Site
              Permissions.
            </li>
          </ul>
          <p className="mt-3">
            For more details, you can visit{" "}
            <a
              href="https://www.allaboutcookies.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:underline"
            >
              www.allaboutcookies.org
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            6. Third-Party Analytics and Advertising
          </h2>
          <p>
            Zusko may use third-party analytics tools like Google Analytics and
            Meta Pixel to understand website usage patterns. These tools may use
            cookies to track user interactions and generate reports for us. You
            can opt out of Google Analytics tracking through{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:underline"
            >
              this browser add-on
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            7. Updates to This Policy
          </h2>
          <p>
            Zusko may revise this Cookie Policy from time to time to reflect
            changes in law, technology, or our business practices. Any updates
            will be posted on this page with a revised “Last Updated” date.
          </p>
          <p className="mt-2 italic">Last Updated: October 2025</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
          <p>
            If you have questions or concerns about this Cookie Policy, please
            contact us at:
          </p>
          <ul className="mt-2 space-y-1">
            <li>
              <strong>Email:</strong> privacy@zusko.in
            </li>
            <li>
              <strong>Phone:</strong> +91 63968 64741
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;
