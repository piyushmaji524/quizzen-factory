
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, PlusCircle, List, BookOpen, Layers, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const FeatureCard = ({ icon, title, description, className }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}) => (
  <motion.div 
    variants={itemVariants}
    className={cn(
      "group relative overflow-hidden rounded-xl glassmorphism p-6 hover-scale",
      className
    )}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
      {icon}
    </div>
    
    <h3 className="mb-2 text-xl font-semibold">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
          
          <div className="container mx-auto px-4 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Quiz Creation</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-tight">
                Create Engaging Quizzes in Seconds with <span className="text-gradient">QuizzenFactory</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Effortlessly generate custom quizzes on any topic using cutting-edge AI technology. 
                Perfect for education, entertainment, or testing knowledge.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gap-2 h-12 px-6">
                  <Link to="/create-quiz">
                    Create a Quiz <PlusCircle className="w-5 h-5" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="gap-2 h-12 px-6">
                  <Link to="/daily-quiz">
                    Explore Daily Quizzes <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-16 relative max-w-4xl mx-auto"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg border border-border/40">
                <img 
                  src="https://images.unsplash.com/photo-1581544291234-31340be4b1b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                  alt="QuizzenFactory Dashboard"
                  className="w-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-12 bg-black/20 blur-2xl rounded-full" />
            </motion.div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/40">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Powerful Features for Quiz Creation
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to create, share, and take amazing quizzes without any technical skills
              </p>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <FeatureCard 
                icon={<Brain className="w-6 h-6" />}
                title="AI-Powered Generation"
                description="Create detailed quizzes on any topic with a single click using advanced AI technology"
              />
              
              <FeatureCard 
                icon={<Layers className="w-6 h-6" />}
                title="Daily Quiz Levels"
                description="Explore 10 new quiz levels every day with varying difficulties and topics"
              />
              
              <FeatureCard 
                icon={<List className="w-6 h-6" />}
                title="100+ Categories"
                description="Choose from over 100 predefined categories or create your own custom topic"
              />
              
              <FeatureCard 
                icon={<BookOpen className="w-6 h-6" />}
                title="Educational Value"
                description="Each question includes detailed explanations to help users learn while they play"
              />
              
              <FeatureCard 
                icon={<PlusCircle className="w-6 h-6" />}
                title="Custom Quiz Creation"
                description="Generate personalized quizzes based on specific interests or learning objectives"
              />
              
              <FeatureCard 
                icon={<Sparkles className="w-6 h-6" />}
                title="No Login Required"
                description="Enjoy all features completely free without creating an account or signing in"
              />
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gradient-to-br from-primary/80 to-primary p-8 md:p-12 text-white text-center"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Ready to Create Your First Quiz?
              </h2>
              
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Start generating engaging quizzes in seconds with our AI-powered platform.
                No sign-up required!
              </p>
              
              <Button asChild size="lg" variant="secondary" className="gap-2 px-8">
                <Link to="/create-quiz">
                  Create a Quiz Now <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
