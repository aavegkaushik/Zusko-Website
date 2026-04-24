

const PrivacyPolicy = () => {
  return (
    <div className="bg-white mt-20 text-gray-800 px-6 md:px-20 py-16 leading-relaxed">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
          Privacy Policy
        </h1>
        <p className="text-gray-500 text-lg">
          Your privacy matters to us. Learn how Zusko collects, uses, and
          protects your data.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto space-y-10 text-justify">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
          <p>
            This Privacy Policy explains how <strong>Zusko Corporation Private Limited </strong> (“Zusko,” “Company,” “we,” “our,” or “us”)
            collects, uses, shares, and protects personal information obtained
            from users (“you”) through our website, mobile app, and related
            services (collectively, the “Platform”). By using our services, you
            consent to the data practices described in this policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
          <p>
            We collect personal and non-personal information when you interact
            with our Platform or use our Services. The information we may
            collect includes:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>
              <strong>Personal details:</strong> Name, phone number, email
              address, and delivery location.
            </li>
            <li>
              <strong>Account information:</strong> Login credentials, password
              (encrypted), and service preferences.
            </li>
            <li>
              <strong>Payment details:</strong> Transaction information processed
              securely via third-party gateways.
            </li>
            <li>
              <strong>Usage data:</strong> Device information, browser type, IP
              address, and analytics data.
            </li>
            <li>
              <strong>Feedback & Support:</strong> Any information you share
              while contacting our support team or providing feedback.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
          <p>
            We use the collected data to deliver, improve, and personalize your
            experience on our Platform. This includes:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Processing your orders and managing pickup & delivery.</li>
            <li>Providing customer support and resolving queries.</li>
            <li>
              Sending service updates, promotional offers, and notifications
              (only if you opt-in).
            </li>
            <li>Improving our services and operational efficiency.</li>
            <li>
              Detecting and preventing fraudulent or unauthorized activities.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            4. Sharing and Disclosure of Information
          </h2>
          <p>
            We do not sell or rent your personal data. However, we may share
            information with trusted third parties under the following
            circumstances:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>
              <strong>Service providers:</strong> Partners who assist in laundry,
              delivery, payment, or marketing operations.
            </li>
            <li>
              <strong>Legal obligations:</strong> When required by law or
              governmental authority.
            </li>
            <li>
              <strong>Business transfers:</strong> In the event of a merger,
              acquisition, or restructuring.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Data Retention</h2>
          <p>
            We retain your information only for as long as necessary to fulfill
            the purposes outlined in this policy or as required by law. Once the
            retention period expires, your personal data is securely deleted or
            anonymized.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Data Security</h2>
          <p>
            We adopt industry-standard security measures such as encryption,
            firewalls, and secure servers to protect your data. While we strive
            to ensure full security, no online transmission is entirely risk-free.
            By using our Platform, you acknowledge and accept these inherent
            security risks.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. Your Rights</h2>
          <p>
            As a user, you have the following rights regarding your personal
            data:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Right to access your data held by us.</li>
            <li>Right to correct or update inaccurate information.</li>
            <li>
              Right to request deletion of your account and associated data.
            </li>
            <li>
              Right to opt out of promotional messages and newsletters.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">8. Cookies & Tracking Technologies</h2>
          <p>
            Zusko uses cookies, web beacons, and analytics tools to enhance user
            experience and gather insights. You can manage or disable cookies
            through your browser settings, but doing so may affect certain
            functionalities of the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">9. Third-Party Links</h2>
          <p>
            Our Platform may contain links to third-party websites or services.
            We are not responsible for the privacy practices of such third
            parties. Please review their respective policies before sharing
            information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">10. Updates to This Policy</h2>
          <p>
            Zusko may update this Privacy Policy from time to time. Updates will
            be reflected by the “Last Updated” date below. We encourage you to
            periodically review this page for any changes.
          </p>
          <p className="mt-2 italic">Last Updated: October 2025</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">11. Contact Us</h2>
          <p>
            For any questions, concerns, or requests regarding your privacy,
            please contact us:
          </p>
          <ul className="mt-2 space-y-1">
            <li>
              <strong>Email:</strong> info@zusko.in
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

export default PrivacyPolicy;
