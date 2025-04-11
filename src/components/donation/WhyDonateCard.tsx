
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const WhyDonateCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Why Donate?</CardTitle>
        <CardDescription>Your contribution makes a real difference</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-semibold">Empower Youth</h4>
          <p className="text-sm text-foreground/70">
            Fund educational workshops, mentorship programs, and skills development 
            initiatives for young people.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold">Combat Gender-Based Violence</h4>
          <p className="text-sm text-foreground/70">
            Support awareness campaigns, counseling services, and community dialogues 
            addressing GBV.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold">Mental Health Advocacy</h4>
          <p className="text-sm text-foreground/70">
            Help us break the stigma around mental health and provide resources to those in need.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold">Rural Development</h4>
          <p className="text-sm text-foreground/70">
            Bring educational programs and resources to underserved rural communities.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-foreground/70">
          Ukhamba Communicare is a registered non-profit organization. 
          All donations are tax-deductible.
        </p>
      </CardFooter>
    </Card>
  );
};

export default WhyDonateCard;
