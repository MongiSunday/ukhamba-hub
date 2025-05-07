
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { RefreshCcw, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GalleryErrorMessageProps {
  error: string | null;
  onRetry: () => void;
}

const GalleryErrorMessage = ({ error, onRetry }: GalleryErrorMessageProps) => {
  const { toast } = useToast();
  
  if (!error) return null;

  const reportIssue = () => {
    toast({
      title: "Issue Reported",
      description: "Thank you for reporting this issue. Our team has been notified.",
    });
    // In a real application, this would send a report to the server
  };

  return (
    <div className="container-custom py-8">
      <Alert variant="default" className="bg-amber-50 border border-amber-200">
        <AlertTriangle className="h-5 w-5 text-amber-600" />
        <AlertDescription className="text-amber-800 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <span>Images couldn't be loaded. Please try again later.</span>
          <div className="flex gap-3 mt-3 sm:mt-0">
            <Button 
              variant="outline" 
              onClick={onRetry}
              size="sm"
              className="gap-1 border-amber-300 text-amber-800 hover:bg-amber-100"
            >
              <RefreshCcw size={14} />
              Try Again
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="bg-amber-200 text-amber-800 hover:bg-amber-300"
              onClick={reportIssue}
            >
              Report This Issue
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default GalleryErrorMessage;
