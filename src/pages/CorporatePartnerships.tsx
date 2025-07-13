import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, Building, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scrollToTop } from '@/hooks/useScrollToTop';

const CorporatePartnerships = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-ukhamba-cream to-ukhamba-sand">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Corporate Partnerships</h1>
              <div className="w-24 h-1 bg-ukhamba-terracotta mx-auto mb-8"></div>
              <p className="text-lg text-foreground/80 mb-8">
                Partner with Ukhamba Communicare to create meaningful impact while strengthening your 
                corporate social responsibility initiatives and building stronger community connections.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Partnership Benefits</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                <Card className="text-center">
                  <CardHeader>
                    <Users className="h-12 w-12 text-ukhamba-terracotta mx-auto mb-4" />
                    <CardTitle>CSR Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80">
                      Demonstrate genuine corporate social responsibility with measurable community impact
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Building className="h-12 w-12 text-ukhamba-terracotta mx-auto mb-4" />
                    <CardTitle>Brand Visibility</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80">
                      Gain positive brand exposure through event partnerships and community programs
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <TrendingUp className="h-12 w-12 text-ukhamba-terracotta mx-auto mb-4" />
                    <CardTitle>Employee Engagement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80">
                      Boost employee morale through meaningful volunteer opportunities and team building
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Award className="h-12 w-12 text-ukhamba-terracotta mx-auto mb-4" />
                    <CardTitle>Impact Reporting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80">
                      Receive detailed reports on partnership outcomes for stakeholder communication
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Options */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Partnership Opportunities</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle>Strategic Partnership</CardTitle>
                    <CardDescription>Long-term collaboration across multiple programs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Multi-year partnership agreements</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Co-branded program development</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Executive board representation opportunities</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Comprehensive impact measurement</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle>Employee Volunteer Programs</CardTitle>
                    <CardDescription>Engage your workforce in meaningful community service</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Structured volunteer days</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Skills-based volunteering opportunities</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Team building through social impact</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Employee recognition programs</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle>Event Partnerships</CardTitle>
                    <CardDescription>Sponsor and participate in community events</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Youth development conferences</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Community dialogue forums</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Educational workshops and seminars</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Annual fundraising events</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle>Innovation Partnerships</CardTitle>
                    <CardDescription>Leverage technology and innovation for social good</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Digital platform development</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Data analytics for impact measurement</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Educational technology solutions</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Innovation lab collaborations</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Partner With Us?</h2>
              <p className="text-lg text-foreground/80 mb-8">
                Let's discuss how your organization can make a meaningful impact through partnership 
                with Ukhamba Communicare. Our team will work with you to develop a customized 
                partnership that aligns with your corporate values and objectives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-ukhamba-terracotta hover:bg-ukhamba-terracotta/90 text-white"
                  asChild
                >
                  <Link to="/contact" onClick={scrollToTop}>Contact Partnership Team</Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-ukhamba-teal text-ukhamba-teal hover:bg-ukhamba-teal hover:text-white"
                  asChild
                >
                  <Link to="/donate" onClick={scrollToTop}>Make a Donation</Link>
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

export default CorporatePartnerships;