import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileText, Users, Target, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scrollToTop } from '@/hooks/useScrollToTop';

const GrantCollaborations = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-ukhamba-cream to-ukhamba-sand">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Grant Collaborations</h1>
              <div className="w-24 h-1 bg-ukhamba-terracotta mx-auto mb-8"></div>
              <p className="text-lg text-foreground/80 mb-8">
                Partner with Ukhamba Communicare on joint grant applications to leverage combined 
                expertise, expand program reach, and maximize funding opportunities for greater social impact.
              </p>
            </div>
          </div>
        </section>

        {/* Why Collaborate Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Partner on Grants?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                <Card className="text-center">
                  <CardHeader>
                    <Target className="h-12 w-12 text-ukhamba-terracotta mx-auto mb-4" />
                    <CardTitle>Stronger Proposals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80">
                      Combined expertise and track records create more competitive grant applications
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Globe className="h-12 w-12 text-ukhamba-terracotta mx-auto mb-4" />
                    <CardTitle>Expanded Reach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80">
                      Access to larger funding amounts and broader geographic coverage
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Users className="h-12 w-12 text-ukhamba-terracotta mx-auto mb-4" />
                    <CardTitle>Shared Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80">
                      Pool resources, knowledge, and networks for maximum program effectiveness
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <FileText className="h-12 w-12 text-ukhamba-terracotta mx-auto mb-4" />
                    <CardTitle>Risk Mitigation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80">
                      Shared responsibility reduces individual organizational risk and burden
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Grant Opportunities */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Grant Collaboration Opportunities</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle>Government Grant Applications</CardTitle>
                    <CardDescription>Partner on national and provincial funding opportunities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Department of Social Development grants</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">National Youth Development Agency funding</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Provincial community development programs</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Skills development and training grants</p>
                    </div>
                    <div className="mt-6 p-4 bg-white rounded-lg">
                      <p className="font-semibold text-ukhamba-terracotta">Typical Grant Size: R500,000 - R5,000,000</p>
                      <p className="text-sm text-foreground/80">Multi-year funding for sustainable programs</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle>Foundation Partnerships</CardTitle>
                    <CardDescription>Collaborate on private foundation and donor proposals</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">International development foundations</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Corporate foundation partnerships</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Family foundation collaborations</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Community foundation initiatives</p>
                    </div>
                    <div className="mt-6 p-4 bg-white rounded-lg">
                      <p className="font-semibold text-ukhamba-terracotta">Typical Grant Size: R100,000 - R2,000,000</p>
                      <p className="text-sm text-foreground/80">Focused funding for specific initiatives</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle>International Development Grants</CardTitle>
                    <CardDescription>Access global funding for development programs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">UN agency funding opportunities</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">European Union development grants</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">USAID and other bilateral funding</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Global thematic funding initiatives</p>
                    </div>
                    <div className="mt-6 p-4 bg-white rounded-lg">
                      <p className="font-semibold text-ukhamba-terracotta">Typical Grant Size: R1,000,000 - R10,000,000</p>
                      <p className="text-sm text-foreground/80">Large-scale, multi-year development programs</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle>Research & Innovation Grants</CardTitle>
                    <CardDescription>Partner on research and innovation funding</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">National Research Foundation grants</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Innovation and technology funding</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Social innovation challenges</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Academic-NGO collaboration grants</p>
                    </div>
                    <div className="mt-6 p-4 bg-white rounded-lg">
                      <p className="font-semibold text-ukhamba-terracotta">Typical Grant Size: R200,000 - R3,000,000</p>
                      <p className="text-sm text-foreground/80">Research and pilot project funding</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Collaboration Process */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Collaboration Process</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-ukhamba-terracotta text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                  <h3 className="font-semibold mb-2">Initial Discussion</h3>
                  <p className="text-sm text-foreground/80">Explore mutual interests and identify suitable grant opportunities</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-ukhamba-terracotta text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                  <h3 className="font-semibold mb-2">Proposal Development</h3>
                  <p className="text-sm text-foreground/80">Co-develop grant proposals leveraging both organizations' strengths</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-ukhamba-terracotta text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                  <h3 className="font-semibold mb-2">Joint Application</h3>
                  <p className="text-sm text-foreground/80">Submit collaborative applications with clear roles and responsibilities</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-ukhamba-terracotta text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                  <h3 className="font-semibold mb-2">Implementation</h3>
                  <p className="text-sm text-foreground/80">Execute funded programs with shared management and reporting</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Collaborate?</h2>
              <p className="text-lg text-foreground/80 mb-8">
                Let's explore how we can work together to secure funding for impactful programs. 
                Our experienced grant writing team is ready to collaborate with organizations 
                that share our commitment to youth development and community empowerment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-ukhamba-terracotta hover:bg-ukhamba-terracotta/90 text-white"
                  asChild
                >
                  <Link to="/contact" onClick={scrollToTop}>Discuss Grant Opportunities</Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-ukhamba-teal text-ukhamba-teal hover:bg-ukhamba-teal hover:text-white"
                  asChild
                >
                  <Link to="/about" onClick={scrollToTop}>Learn About Our Work</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GrantCollaborations;