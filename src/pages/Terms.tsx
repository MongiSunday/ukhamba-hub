
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose max-w-none">
            <p className="text-lg mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Ukhamba Communicare website and services, you agree to be bound 
              by these Terms of Service and all applicable laws and regulations. If you do not agree with 
              any of these terms, you are prohibited from using or accessing this site.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on Ukhamba Communicare's 
              website for personal, non-commercial transitory viewing only. This is the grant of a license, 
              not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Disclaimer</h2>
            <p>
              The materials on Ukhamba Communicare's website are provided on an 'as is' basis. Ukhamba Communicare 
              makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties 
              including, without limitation, implied warranties or conditions of merchantability, fitness for a 
              particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitations</h2>
            <p>
              In no event shall Ukhamba Communicare or its suppliers be liable for any damages (including, without 
              limitation, damages for loss of data or profit, or due to business interruption) arising out of the 
              use or inability to use the materials on Ukhamba Communicare's website, even if Ukhamba Communicare 
              or a Ukhamba Communicare authorized representative has been notified orally or in writing of the 
              possibility of such damage.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Revisions and Errata</h2>
            <p>
              The materials appearing on Ukhamba Communicare's website could include technical, typographical, or 
              photographic errors. Ukhamba Communicare does not warrant that any of the materials on its website 
              are accurate, complete or current. Ukhamba Communicare may make changes to the materials contained on 
              its website at any time without notice.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Links</h2>
            <p>
              Ukhamba Communicare has not reviewed all of the sites linked to its website and is not responsible 
              for the contents of any such linked site. The inclusion of any link does not imply endorsement by 
              Ukhamba Communicare of the site. Use of any such linked website is at the user's own risk.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="mt-2">
              Email: <a href="mailto:legal@ukhamba.org" className="text-ukhamba-terracotta">legal@ukhamba.org</a><br />
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

export default Terms;
