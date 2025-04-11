
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose max-w-none">
            <p className="text-lg mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              Ukhamba Communicare ("we", "our", or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website or use our services.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <p>
              We may collect information about you in various ways, including:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Information you provide directly to us when using our services</li>
              <li>Information we collect automatically when you use our website</li>
              <li>Information from third parties where permitted by law</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>
              We may use the information we collect about you to:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process donations and send receipts</li>
              <li>Send administrative information and updates</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Send you marketing communications about our work, events, and campaigns</li>
              <li>Monitor and analyze trends, usage, and activities</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Sharing of Information</h2>
            <p>
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Service providers who perform functions on our behalf</li>
              <li>Partners and other third parties with whom we collaborate</li>
              <li>As required by law or to protect rights and interests</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights and Choices</h2>
            <p>
              You have certain rights regarding your personal information, including the right to:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Access, correct, or delete your personal information</li>
              <li>Object to our processing of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Set browser cookies preferences</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              Email: <a href="mailto:privacy@ukhamba.org" className="text-ukhamba-terracotta">privacy@ukhamba.org</a><br />
              Address: 123 Community Way, Johannesburg, 2000, South Africa<br />
              Phone: +27 12 345 6789
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
