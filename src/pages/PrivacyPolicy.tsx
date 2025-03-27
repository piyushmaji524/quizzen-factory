
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicy = () => {
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
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Privacy Policy</h1>
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
                Welcome to QuizzenFactory. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data when you visit our website 
                and tell you about your privacy rights and how the law protects you.
              </p>
              <p className="text-muted-foreground">
                Please read this privacy policy carefully. If you do not agree with our policies and practices, 
                your choice is not to use our website. By accessing or using this website, you agree to this privacy policy.
              </p>
            </div>
            
            <Separator className="my-8" />
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We collect minimal information to provide and improve our service. The types of information we may collect include:
              </p>
              
              <h3 className="text-xl font-semibold mb-3">Automatically Collected Information</h3>
              <p className="text-muted-foreground mb-4">
                When you visit our website, our servers automatically record information that your browser sends. 
                This data may include:
              </p>
              <ul className="list-disc pl-5 mb-4 text-muted-foreground">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Pages of our website that you visit</li>
                <li>Time and date of your visit</li>
                <li>Time spent on those pages</li>
                <li>Other statistics</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3">Information You Provide</h3>
              <p className="text-muted-foreground mb-4">
                When using our quiz creation service, we collect the category or topic you choose for quiz generation. 
                We do not require you to create an account or provide personal information to use our service.
              </p>
              
              <h3 className="text-xl font-semibold mb-3">Local Storage</h3>
              <p className="text-muted-foreground">
                We use localStorage to improve your experience, such as remembering the time of your last quiz generation 
                and storing daily quizzes. This data is stored only on your device and is not transmitted to our servers.
              </p>
            </div>
            
            <Separator className="my-8" />
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect in various ways, including to:
              </p>
              <ul className="list-disc pl-5 mb-4 text-muted-foreground">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Generate quiz content based on your selected topics</li>
                <li>Monitor and analyze usage patterns and trends</li>
              </ul>
            </div>
            
            <Separator className="my-8" />
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground mb-4">
                We use Google's Gemini API to generate quiz content. When you request a quiz on a specific topic, 
                this topic is shared with Google's API service. Google's use of this information is governed by their 
                own privacy policies, which we encourage you to review.
              </p>
              <p className="text-muted-foreground">
                For more information about Google's data practices, please visit: 
                <a 
                  href="https://policies.google.com/privacy" 
                  className="text-primary hover:underline ml-1"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Google Privacy Policy
                </a>
              </p>
            </div>
            
            <Separator className="my-8" />
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We have implemented appropriate technical and organizational security measures designed to protect 
                the security of any information we process. However, please also remember that we cannot guarantee 
                that the internet itself is 100% secure.
              </p>
              <p className="text-muted-foreground">
                While we strive to use commercially acceptable means to protect your data, we cannot guarantee its 
                absolute security and transmission of information via the internet is not completely secure.
              </p>
            </div>
            
            <Separator className="my-8" />
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our service is suitable for users of all ages, including children. As we do not collect personal 
                information beyond what is automatically collected when visiting any website, no special provisions 
                for children's data are necessary. However, we recommend that parents supervise their children's 
                internet use, including the use of our website.
              </p>
            </div>
            
            <Separator className="my-8" />
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review 
                this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when 
                they are posted on this page.
              </p>
            </div>
            
            <Separator className="my-8" />
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy, please contact us:
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

export default PrivacyPolicy;
