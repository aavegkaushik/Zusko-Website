
const TermsAndConditions = () => {
  return (
    <div className="bg-white mt-20 text-gray-800 px-6 md:px-20 py-16 leading-relaxed">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
          Terms & Conditions
        </h1>
        <p className="text-gray-500 text-lg">
          Please read these terms carefully before using zusko's Service.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto space-y-10 text-justify">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
          <p>
            Welcome to <strong>Zusko</strong>. These Terms & Conditions (the
            “Terms”) govern your access to and use of our platform — including
            website, mobile app, and any services offered by Zusko (collectively,
            the “Service”). By using the Service, you acknowledge that you have
            read, understood, and agreed to these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Definitions</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>User</strong> means any individual or entity using the
              Service.
            </li>
            <li>
              <strong>Services</strong> means pickup, cleaning, delivery,
              laundry, dry-cleaning, ironing and related offerings.
            </li>
            <li>
              <strong>Platform</strong> means the website or mobile application
              operated by Zusko.
            </li>
            <li>
              <strong>Order</strong> means your request placed for Service
              through the Platform.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. User Responsibilities</h2>
          <p>
            You agree to provide accurate, complete and up-to-date information
            when registering, placing Orders or otherwise using the Service. You
            must ensure your items are suitable for cleaning, and that you have
            the right to hand them over. You must comply with all applicable
            laws and avoid any misuse of the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Service Process</h2>
          <p>
            Once you place an Order, Zusko arranges pickup, cleaning and delivery.
            Service time may vary based on location, item type and other factors.
            While we handle your items with care, we cannot guarantee perfect
            results in every case. Zusko may engage third-party cleaning partners
            to fulfill your orders.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Pricing & Payment</h2>
          <p>
            All prices are displayed in INR and include applicable taxes unless
            stated otherwise. Zusko reserves the right to modify prices or fees
            anytime. You agree to make payments through authorized methods only.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Pickup & Delivery</h2>
          <p>
            Please ensure your items are ready at the scheduled pickup time and
            that your delivery address is correct. Zusko is not responsible for
            delays caused by factors beyond control, such as traffic or weather.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. Cancellation & Refunds</h2>
          <p>
            You may cancel or reschedule an Order before pickup. Once items are
            collected, cancellations may not be possible. Refunds (if eligible)
            are processed within 5–7 business days to the original payment
            method.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            8. Liability & Limitations
          </h2>
          <p>
            Zusko shall not be liable for damages caused by pre-existing
            conditions, colour fading, or weak fabrics. Maximum liability for any
            claim will be limited to five times the cleaning cost of the affected
            item.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">9. Use of the Platform</h2>
          <p>
            You must be at least 18 years old and legally capable to enter into
            contracts. Your account credentials must be secure, and you are
            responsible for all activity under your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">10. Intellectual Property</h2>
          <p>
            All trademarks, designs, logos, and content on the Platform are the
            property of Zusko or its licensors. Unauthorized use or reproduction
            is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">11. Privacy & Data Protection</h2>
          <p>
            Your personal data is collected and processed according to our{" "}
            <a href="/privacy" className="text-yellow-500 underline">
              Privacy Policy
            </a>
            . We will not share your data except as required by law or to fulfill
            service requirements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">12. Amendments to Terms</h2>
          <p>
            Zusko may update these Terms anytime. Updated Terms will be notified
            via our Platform or email. Continued use of our Service implies
            acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            13. Governing Law & Dispute Resolution
          </h2>
          <p>
            These Terms are governed by the laws of India. All disputes shall be
            subject to the exclusive jurisdiction of the courts in your operating
            city.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">14. Contact Information</h2>
          <p>
            For any questions or concerns about these Terms, contact us at:
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

export default TermsAndConditions;
