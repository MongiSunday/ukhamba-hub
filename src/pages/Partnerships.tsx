import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scrollToTop } from '@/hooks/useScrollToTop';

const Partnerships = () => {
  const partnershipTypes = [
    {
      title: "Corporate Partnerships",
      subtitle: "Strategic collaboration opportunities",
      benefits: [
        "Corporate Social Responsibility (CSR) initiatives",
        "Employee volunteer programs",
        "Brand visibility at events and programs",
        "Tailored impact reporting for stakeholders"
      ],
      buttonText: "Explore Corporate Partnerships",
      buttonVariant: "default" as const
    },
    {
      title: "Program Sponsorships",
      subtitle: "Support specific initiatives",
      benefits: [
        "Sponsor a school workshop series",
        "Fund a community dialogue program",
        "Support media campaigns on critical issues",
        "Exclusive recognition for sponsored programs"
      ],
      buttonText: "View Sponsorship Opportunities",
      buttonVariant: "secondary" as const
    },
    {
      title: "Grant Collaborations",
      subtitle: "Joint funding applications",
      benefits: [
        "Partner on government grant applications",
        "Collaborate on foundation proposals",
        "Shared expertise and resources",
        "Expanded reach and impact reporting"
      ],
      buttonText: "Discuss Grant Opportunities",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-ukhamba-cream to-ukhamba-sand">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Partnerships & Sponsorships
              </h1>
              <div className="w-24 h-1 bg-ukhamba-terracotta mx-auto mb-8"></div>
              <p className="text-lg text-foreground/80 mb-8">
                Strategic partnerships are essential to our mission. By partnering with Ukhamba Communicare, 
                your organization can make a meaningful impact while aligning with values of social responsibility 
                and community development.
              </p>
            </div>
          </div>
        </section>

        {/* Partnership Types Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {partnershipTypes.map((partnership, index) => (
                <Card key={index} className="h-full flex flex-col">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl font-bold mb-2">
                      {partnership.title}
                    </CardTitle>
                    <CardDescription className="text-ukhamba-terracotta font-medium">
                      {partnership.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <div className="space-y-3 mb-6 flex-grow">
                      {partnership.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-ukhamba-teal mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant={partnership.buttonVariant}
                      className="w-full mt-auto"
                      asChild
                    >
                      <Link to="/contact" onClick={scrollToTop}>
                        {partnership.buttonText}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-ukhamba-teal/10">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Partner With Us?</h2>
              <p className="text-lg text-foreground/80 mb-8">
                Join us in creating lasting change in South African communities. Together, we can 
                amplify our impact and reach more youth and families in need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-ukhamba-terracotta hover:bg-ukhamba-terracotta/90"
                  asChild
                >
                  <Link to="/contact" onClick={scrollToTop}>
                    Get In Touch
                  </Link>
                </Button>
                <Button 
                  variant="outline"
                  className="border-ukhamba-teal text-ukhamba-teal hover:bg-ukhamba-teal hover:text-white"
                  asChild
                >
                  <Link to="/about" onClick={scrollToTop}>
                    Learn About Our Mission
                  </Link>
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

export default Partnerships;