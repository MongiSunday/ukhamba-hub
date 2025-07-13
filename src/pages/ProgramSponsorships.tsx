import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, GraduationCap, Users, Megaphone, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scrollToTop } from '@/hooks/useScrollToTop';

const ProgramSponsorships = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-ukhamba-cream to-ukhamba-sand">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Program Sponsorships</h1>
              <div className="w-24 h-1 bg-ukhamba-terracotta mx-auto mb-8"></div>
              <p className="text-lg text-foreground/80 mb-8">
                Support specific initiatives that align with your values and make a direct impact 
                on youth development, community empowerment, and social change in South Africa.
              </p>
            </div>
          </div>
        </section>

        {/* Sponsorship Programs */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Available Sponsorship Programs</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                <Card className="card-hover">
                  <CardHeader>
                    <GraduationCap className="h-12 w-12 text-ukhamba-terracotta mb-4" />
                    <CardTitle>Youth Development Workshops</CardTitle>
                    <CardDescription>Sponsor comprehensive workshop series in schools and communities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Leadership and life skills training</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Career guidance and mentorship</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Educational support programs</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Reach: 500+ youth annually</p>
                    </div>
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <p className="font-semibold text-ukhamba-terracotta">Sponsorship: R50,000 - R150,000</p>
                      <p className="text-sm text-foreground/80">Covers materials, facilitator training, and program delivery</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardHeader>
                    <Users className="h-12 w-12 text-ukhamba-terracotta mb-4" />
                    <CardTitle>Community Dialogue Programs</CardTitle>
                    <CardDescription>Fund community conversations on critical social issues</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Gender-based violence prevention</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Rural community empowerment</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Faith-based community engagement</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Reach: 1,000+ community members</p>
                    </div>
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <p className="font-semibold text-ukhamba-terracotta">Sponsorship: R30,000 - R100,000</p>
                      <p className="text-sm text-foreground/80">Covers venue, materials, and community outreach</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardHeader>
                    <Megaphone className="h-12 w-12 text-ukhamba-terracotta mb-4" />
                    <CardTitle>Media & Communication Campaigns</CardTitle>
                    <CardDescription>Support awareness campaigns on social issues</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Radio program production</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Digital content creation</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Community storytelling initiatives</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Reach: 10,000+ people monthly</p>
                    </div>
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <p className="font-semibold text-ukhamba-terracotta">Sponsorship: R40,000 - R120,000</p>
                      <p className="text-sm text-foreground/80">Covers production, distribution, and impact measurement</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardHeader>
                    <Heart className="h-12 w-12 text-ukhamba-terracotta mb-4" />
                    <CardTitle>Special Initiative Sponsorships</CardTitle>
                    <CardDescription>Fund targeted interventions and pilot programs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Crisis response programs</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Innovation pilot projects</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Research and evaluation studies</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                      <p className="text-sm">Customized reach and impact</p>
                    </div>
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <p className="font-semibold text-ukhamba-terracotta">Sponsorship: R20,000 - R200,000</p>
                      <p className="text-sm text-foreground/80">Customized based on program scope and objectives</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsorship Benefits */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">What You Get as a Sponsor</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle>Brand Recognition</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm">Logo placement on program materials</p>
                    <p className="text-sm">Social media recognition</p>
                    <p className="text-sm">Website acknowledgment</p>
                    <p className="text-sm">Event co-branding opportunities</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <CardTitle>Impact Reporting</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm">Quarterly progress reports</p>
                    <p className="text-sm">Beneficiary stories and testimonials</p>
                    <p className="text-sm">Photo and video documentation</p>
                    <p className="text-sm">Annual impact assessment</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <CardTitle>Engagement Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm">Site visits and program participation</p>
                    <p className="text-sm">Meet the beneficiaries</p>
                    <p className="text-sm">Employee volunteer opportunities</p>
                    <p className="text-sm">Stakeholder presentation materials</p>
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
              <h2 className="text-3xl font-bold mb-6">Sponsor a Program Today</h2>
              <p className="text-lg text-foreground/80 mb-8">
                Choose a program that resonates with your organization's values and make a direct, 
                measurable impact on South African communities. Our team will guide you through 
                the sponsorship process and ensure maximum impact for your investment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-ukhamba-terracotta hover:bg-ukhamba-terracotta/90 text-white"
                  asChild
                >
                  <Link to="/contact" onClick={scrollToTop}>Discuss Sponsorship Options</Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-ukhamba-teal text-ukhamba-teal hover:bg-ukhamba-teal hover:text-white"
                  asChild
                >
                  <Link to="/programs" onClick={scrollToTop}>View All Programs</Link>
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

export default ProgramSponsorships;