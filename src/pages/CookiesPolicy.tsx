
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const CookiesPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4 mt-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Cookies Policy</h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto prose prose-slate prose-headings:font-heading"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-muted-foreground mb-4">
                QuizzenFactory ("we" or "us" or "our") may use cookies, web beacons, tracking pixels, and other tracking technologies when you visit our website quizzenfactory.com, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site") to help customize the Site and improve your experience.
              </p>
              <p className="text-muted-foreground">
                We reserve the right to make changes to this Cookie Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Cookie Policy. Any changes or modifications will be effective immediately upon posting the updated Cookie Policy on the Site, and you waive the right to receive specific notice of each such change or modification.
              </p>
            </div>
            
            <Separator className="my-8" />
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Use of Cookies</h2>
              <p className="text-muted-foreground mb-4">
                A "cookie" is a string of information which assigns you a unique identifier that we store on your computer. Your browser then provides that unique identifier to use each time you submit a query to the Site. We use cookies to help us keep track of your preferences and to deliver content specific to your interests.
              </p>
              
              <h3 className="text-xl font-semibold mb-3">Cookies We Use</h3>
              <p className="text-muted-foreground mb-4">
                Our website primarily uses the following types of cookies:
              </p>
              
              <ul className="list-disc pl-5 mb-4 text-muted-foreground">
                <li><strong>Necessary Cookies:</strong> These cookies are essential for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.</li>
                <li><strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3">Local Storage</h3>
              <p className="text-muted-foreground mb-4">
                In addition to cookies, we use localStorage, a similar mechanism that stores data in your browser without an expiration date. We use localStorage for the following purposes:
              </p>
              
              <ul className="list-disc pl-5 mb-4 text-muted-foreground">
                <li>Storing the time of your last quiz generation to enforce our 10-minute limitation between quiz generations</li>
                <li>Storing generated quiz content for faster loading and offline access</li>
                <li>Saving your last selected categories for a better user experience</li>
                <li>Storing daily quiz data to prevent unnecessary API calls</li>
              </ul>
              
              <p className="text-muted-foreground">
                Unlike cookies, localStorage data is not automatically transmitted to our servers with every request. The data remains only on your device until you clear your browser's data storage or we programmatically remove it.
              </p>
            </div>
            
            <Separator className="my-8" />
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Control of Cookies</h2>
              <p className="text-muted-foreground mb-4">
                Most browsers are set to accept cookies by default. However, you can remove or reject cookies in your browser's settings. Please be aware that such action could affect the availability and functionality of the Site.
              </p>
              <p className="text-muted-foreground">
                For more information on how to control cookies, check your browser or device's settings for how you can control or reject cookies, or visit the following links:
              </p>
              
              <ul className="list-disc pl-5 mb-4 text-muted-foreground">
                <li>
                  <a 
                    href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Apple Safari
                  </a>
                </li>
                <li>
                  <a 
                    href="https://support.google.com/chrome/answer/95647?hl=en" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a 
                    href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Microsoft Edge
                  </a>
                </li>
                <li>
                  <a 
                    href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Mozilla Firefox
                  </a>
                </li>
              </ul>
              
              <p className="text-muted-foreground">
                To clear localStorage data, you can use the same controls in your browser that you use to clear cookies, usually found under "Clear browsing data" or similar options.
              </p>
            </div>
            
            <Separator className="my-8" />
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
              <p className="text-muted-foreground">
                For more information about how we use information collected by cookies and other tracking technologies, please refer to our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>. This Cookie Policy is part of and is incorporated into our Privacy Policy. By using the Site, you agree to be bound by this Cookie Policy and our Privacy Policy.
              </p>
            </div>
            
            <Separator className="my-8" />
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions or comments about this Cookie Policy, please contact us at:
              </p>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>By email: <a href="mailto:contact@piyushmaji.com" className="text-primary hover:underline">contact@piyushmaji.com</a></li>
                <li>By visiting the Developer page on our website</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CookiesPolicy;
