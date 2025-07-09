
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scrollToTop } from '@/hooks/useScrollToTop';

interface ProgramCardProps {
  title: string;
  description: string;
  image: string;
  programId: string;
}

const ProgramCard = ({ title, description, image, programId }: ProgramCardProps) => {
  return (
    <Card className="overflow-hidden card-hover border-none shadow-md">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-foreground/70 text-base">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          className="p-0 text-ukhamba-terracotta hover:text-ukhamba-terracotta/80 hover:bg-transparent"
          asChild
        >
          <Link to={`/programs/${programId}`} onClick={scrollToTop}>
            Learn More <ChevronRight size={16} className="ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProgramCard;
