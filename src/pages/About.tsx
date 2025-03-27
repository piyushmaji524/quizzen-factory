
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Check, Shield, UserCheck, Award, BookOpen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
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
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">About QuizzenFactory</h1>
            <p className="text-lg text-muted-foreground">
              Learn more about our AI-powered quiz platform and our mission
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-16"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground mb-4">
                    At QuizzenFactory, we believe that learning should be engaging, accessible, and fun. 
                    Our mission is to provide a platform where anyone can create and take quizzes on any 
                    topic, without the barriers of technical knowledge or expensive subscriptions.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    By leveraging the power of artificial intelligence, we're democratizing quiz creation 
                    and making it available to everyone, from educators to trivia enthusiasts.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild>
                      <Link to="/create-quiz">Create a Quiz</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/daily-quiz">Explore Daily Quizzes</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-lg blur-lg opacity-75"></div>
                  <div className="relative rounded-lg overflow-hidden border border-border/50">
                    <img 
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                      alt="Knowledge sharing concept"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">How It Works</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-border/40 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">AI-Powered Generation</h3>
                  <p className="text-muted-foreground">
                    Our platform uses advanced AI from Google's Gemini to create high-quality, 
                    contextually relevant quizzes on any topic you can imagine.
                  </p>
                </div>
                
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-border/40 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserCheck className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Free & No Login Required</h3>
                  <p className="text-muted-foreground">
                    We believe in making knowledge accessible to everyone. That's why our platform 
                    is completely free to use and doesn't require any registration.
                  </p>
                </div>
                
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-border/40 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Daily Fresh Content</h3>
                  <p className="text-muted-foreground">
                    Every 24 hours, our system automatically generates new quiz levels across 
                    various topics, ensuring fresh challenges every day.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-16"
            >
              <div className="bg-primary/5 rounded-xl p-8 border border-primary/10">
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Why Choose QuizzenFactory?</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Educational Value</h3>
                      <p className="text-muted-foreground">
                        Each quiz includes detailed explanations for answers, turning every question into a learning opportunity.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Diverse Categories</h3>
                      <p className="text-muted-foreground">
                        With over 100 built-in categories and the ability to create custom topics, there's something for everyone.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">No Limits</h3>
                      <p className="text-muted-foreground">
                        Create a new custom quiz every 10 minutes, with no monthly limits or hidden paywalls.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Responsive Design</h3>
                      <p className="text-muted-foreground">
                        Enjoy a seamless experience across all devices, from desktop to mobile.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Quality Content</h3>
                      <p className="text-muted-foreground">
                        Our AI is trained to generate factually accurate and engaging questions across all subjects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">Our Technology</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-border/40">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-primary" />
                    Google Gemini AI
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    We leverage Google's advanced Gemini AI to generate high-quality quiz content. This state-of-the-art 
                    language model ensures that our quizzes are informative, engaging, and factually accurate.
                  </p>
                  <a 
                    href="https://deepmind.google/technologies/gemini/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    Learn more about Gemini
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>
                
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-border/40">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-primary" />
                    Quality & Safety
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    We've implemented extensive safeguards to ensure that all generated content is appropriate, 
                    accurate, and educational. Our system continuously monitors and improves the quality of quizzes.
                  </p>
                  <p className="text-muted-foreground">
                    While we strive for 100% accuracy, AI-generated content may occasionally contain errors. 
                    We're constantly refining our systems to improve quality.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Meet the Developer</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  QuizzenFactory was created by Piyush Maji, a full-stack developer passionate about 
                  educational technology and AI applications.
                </p>
                
                <Button asChild size="lg">
                  <Link to="/developer">Learn About the Developer</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
