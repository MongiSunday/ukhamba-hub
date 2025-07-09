import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CheckCircle } from 'lucide-react';
import { scrollToTop } from '@/hooks/useScrollToTop';

const PartnershipSection = () => {
  return (
    <section id="partnership-section" className="py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Partnerships & Sponsorships</h2>
          <div className="w-20 h-1 bg-ukhamba-terracotta mx-auto mb-8"></div>
          <p className="mb-6 text-foreground/80">
            Strategic partnerships are essential to our mission. By partnering with Ukhamba Communicare, 
            your organization can make a meaningful impact while aligning with values of social 
            responsibility and community development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Corporate Partnerships</CardTitle>
              <CardDescription>Strategic collaboration opportunities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                <p className="text-sm">Corporate Social Responsibility (CSR) initiatives</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                <p className="text-sm">Employee volunteer programs</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                <p className="text-sm">Brand visibility at events and programs</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                <p className="text-sm">Tailored impact reporting for stakeholders</p>
              </div>
              <div className="mt-6">
                <Button className="w-full bg-ukhamba-terracotta hover:bg-ukhamba-terracotta/90 text-white" asChild>
                  <Link to="/contact" onClick={scrollToTop}>Explore Corporate Partnerships</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Program Sponsorships</CardTitle>
              <CardDescription>Support specific initiatives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                <p className="text-sm">Sponsor a school workshop series</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                <p className="text-sm">Fund a community dialogue program</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                <p className="text-sm">Support media campaigns on critical issues</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                <p className="text-sm">Exclusive recognition for sponsored programs</p>
              </div>
              <div className="mt-6">
                <Button className="w-full bg-ukhamba-terracotta hover:bg-ukhamba-terracotta/90 text-white" asChild>
                  <Link to="/contact" onClick={scrollToTop}>View Sponsorship Opportunities</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Grant Collaborations</CardTitle>
              <CardDescription>Joint funding applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                <p className="text-sm">Partner on government grant applications</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                <p className="text-sm">Collaborate on foundation proposals</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                <p className="text-sm">Shared expertise and resources</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-ukhamba-terracotta mr-2 mt-0.5" />
                <p className="text-sm">Expanded reach and impact reporting</p>
              </div>
              <div className="mt-6">
                <Button className="w-full bg-ukhamba-terracotta hover:bg-ukhamba-terracotta/90 text-white" asChild>
                  <Link to="/contact" onClick={scrollToTop}>Discuss Grant Opportunities</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-muted p-8 rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Become a Partner</h3>
              <p className="mb-6 text-foreground/80">
                We believe in the power of collaboration to create meaningful, lasting change. Our partners 
                benefit from association with a trusted non-profit organization working directly with communities 
                across South Africa.
              </p>
              <p className="mb-6 text-foreground/80">
                To discuss potential partnerships or sponsorship opportunities, please contact our partnerships 
                team. We'll work with you to develop a collaboration that aligns with your organization's 
                values and objectives while making a real difference in the communities we serve.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-xl font-bold mb-4">Contact Our Partnership Team</h4>
              <p className="mb-6 text-foreground/80">
                Fill out the form below, and our partnerships coordinator will get in touch with you within 
                48 hours to discuss potential collaboration opportunities.
              </p>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="orgName" className="text-sm font-medium">Organization Name</label>
                    <Input id="orgName" placeholder="Your organization" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contactPerson" className="text-sm font-medium">Contact Person</label>
                    <Input id="contactPerson" placeholder="Your name" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                    <Input id="phone" placeholder="Your phone number" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="interestArea" className="text-sm font-medium">Partnership Interest</label>
                  <textarea 
                    id="interestArea" 
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Tell us about your organization and how you'd like to partner with us"
                  ></textarea>
                </div>
                
                <Button className="w-full bg-ukhamba-terracotta hover:bg-ukhamba-terracotta/90 text-white">
                  Submit Partnership Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;
