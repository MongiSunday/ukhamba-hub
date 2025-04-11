
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgramDetail from '@/components/ProgramDetail';
import { programsData } from '@/data/programs';

const ProgramDetailPage = () => {
  const { programId } = useParams();
  const program = programsData.find(p => p.id === programId);

  if (!program) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold mb-4">Program Not Found</h1>
            <p className="text-lg text-foreground/80">
              The program you're looking for doesn't exist or has been moved.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ProgramDetail
          id={program.id}
          title={program.title}
          description={program.description}
          image={program.image}
          longDescription={program.longDescription}
          impact={program.impact}
          location={program.location}
          date={program.date}
          participants={program.participants}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ProgramDetailPage;
