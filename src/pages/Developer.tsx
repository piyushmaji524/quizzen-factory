
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Linkedin, Twitter, Globe, FileText, Code, Award, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Developer = () => {
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
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Developer</h1>
            <p className="text-lg text-muted-foreground">
              Meet the mind behind QuizzenFactory
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="sticky top-28"
                >
                  <div className="text-center">
                    <div className="relative w-48 h-48 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-primary/40 animate-pulse-soft blur-lg"></div>
                      <img
                        src="https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=200&h=200" 
                        alt="Piyush Maji"
                        className="rounded-full object-cover w-full h-full border-4 border-white shadow-md"
                      />
                    </div>
                    
                    <h2 className="text-2xl font-heading font-bold mb-1">Piyush Maji</h2>
                    <p className="text-primary font-medium mb-3">Full-Stack Developer</p>
                    
                    <div className="flex justify-center space-x-3 mb-6">
                      <a
                        href="https://github.com/piyushmaji524"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a
                        href="mailto:contact@piyushmaji.com"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Email"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                      <a
                        href="https://linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href="https://twitter.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    </div>
                    
                    <Button className="w-full mb-3" asChild>
                      <a href="mailto:contact@piyushmaji.com">
                        Contact Me
                      </a>
                    </Button>
                    
                    <Button variant="outline" className="w-full" asChild>
                      <a 
                        href="https://github.com/piyushmaji524" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        View Portfolio
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </div>
              
              <div className="md:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card className="mb-8 border-border/50 overflow-hidden">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-primary" />
                        About Me
                      </h3>
                      
                      <p className="mb-4">
                        Hi there! I'm Piyush Maji, a passionate Full-Stack Developer with expertise in 
                        building modern web applications. I specialize in creating intuitive and responsive 
                        user interfaces that provide exceptional user experiences.
                      </p>
                      
                      <p className="mb-4">
                        With a strong foundation in both front-end and back-end technologies, I enjoy 
                        tackling complex problems and turning innovative ideas into reality. QuizzenFactory 
                        is one of my projects that combines my interest in education with my technical skills.
                      </p>
                      
                      <p>
                        I'm always open to new opportunities and collaborations. Feel free to reach out 
                        if you'd like to discuss a project or just chat about technology!
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="mb-8 border-border/50 overflow-hidden">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Code className="w-5 h-5 mr-2 text-primary" />
                        Skills & Expertise
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Frontend Development</h4>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">React</Badge>
                            <Badge variant="secondary">Next.js</Badge>
                            <Badge variant="secondary">TypeScript</Badge>
                            <Badge variant="secondary">Tailwind CSS</Badge>
                            <Badge variant="secondary">HTML5</Badge>
                            <Badge variant="secondary">CSS3</Badge>
                            <Badge variant="secondary">JavaScript</Badge>
                            <Badge variant="secondary">Redux</Badge>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h4 className="font-medium mb-2">Backend Development</h4>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">Node.js</Badge>
                            <Badge variant="secondary">Express</Badge>
                            <Badge variant="secondary">PHP</Badge>
                            <Badge variant="secondary">MySQL</Badge>
                            <Badge variant="secondary">MongoDB</Badge>
                            <Badge variant="secondary">Firebase</Badge>
                            <Badge variant="secondary">REST APIs</Badge>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h4 className="font-medium mb-2">Tools & Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">Git</Badge>
                            <Badge variant="secondary">Docker</Badge>
                            <Badge variant="secondary">AWS</Badge>
                            <Badge variant="secondary">Vercel</Badge>
                            <Badge variant="secondary">Netlify</Badge>
                            <Badge variant="secondary">Hostinger</Badge>
                            <Badge variant="secondary">AI Integration</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="mb-8 border-border/50 overflow-hidden">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-primary" />
                        Featured Projects
                      </h3>
                      
                      <div className="space-y-6">
                        <div className="rounded-lg border border-border/60 p-4 hover:border-border transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-lg">QuizzenFactory</h4>
                            <Badge>Latest</Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">
                            An AI-powered quiz generation platform that creates custom quizzes on any topic using Google's Gemini API.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">React</Badge>
                            <Badge variant="outline">Tailwind CSS</Badge>
                            <Badge variant="outline">AI Integration</Badge>
                            <Badge variant="outline">TypeScript</Badge>
                          </div>
                        </div>
                        
                        <div className="rounded-lg border border-border/60 p-4 hover:border-border transition-colors">
                          <h4 className="font-semibold text-lg mb-2">E-Commerce Platform</h4>
                          <p className="text-muted-foreground mb-3">
                            A full-featured online store with product management, cart functionality, and payment integration.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">Next.js</Badge>
                            <Badge variant="outline">Node.js</Badge>
                            <Badge variant="outline">MongoDB</Badge>
                            <Badge variant="outline">Stripe</Badge>
                          </div>
                        </div>
                        
                        <div className="rounded-lg border border-border/60 p-4 hover:border-border transition-colors">
                          <h4 className="font-semibold text-lg mb-2">Task Management App</h4>
                          <p className="text-muted-foreground mb-3">
                            A collaborative task tracking system with real-time updates and team management features.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">React</Badge>
                            <Badge variant="outline">Firebase</Badge>
                            <Badge variant="outline">Material UI</Badge>
                            <Badge variant="outline">JavaScript</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-border/50 overflow-hidden">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 text-primary" />
                        Get In Touch
                      </h3>
                      
                      <p className="mb-6">
                        I'm always interested in hearing about new projects and opportunities. 
                        Whether you need a new website, want to improve an existing one, or just 
                        want to connect, feel free to reach out!
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 mr-3 text-primary" />
                          <a 
                            href="mailto:contact@piyushmaji.com" 
                            className="hover:underline"
                          >
                            contact@piyushmaji.com
                          </a>
                        </div>
                        
                        <div className="flex items-center">
                          <Globe className="w-5 h-5 mr-3 text-primary" />
                          <a 
                            href="https://github.com/piyushmaji524" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            github.com/piyushmaji524
                          </a>
                        </div>
                        
                        <div className="flex items-center">
                          <Linkedin className="w-5 h-5 mr-3 text-primary" />
                          <span>Piyush Maji</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Developer;
