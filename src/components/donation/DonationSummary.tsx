
import React from 'react';
import { Info, DollarSign, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface DonationSummaryProps {
  amount: string;
}

const DonationSummary: React.FC<DonationSummaryProps> = ({ amount }) => {
  // Calculate tax deduction (33% of donation in South Africa)
  const numericAmount = parseFloat(amount) || 0;
  const taxDeduction = (numericAmount * 0.33).toFixed(2);
  const formattedAmount = numericAmount.toLocaleString('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
  });

  if (numericAmount <= 0) return null;

  return (
    <Card className="bg-muted/50 border-dashed border-muted-foreground/20 mt-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium flex items-center mb-4">
          <Info className="h-5 w-5 mr-2 text-ukhamba-terracotta" />
          Donation Summary
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Donation Amount:</span>
            <span className="font-medium text-lg flex items-center">
              <DollarSign className="h-4 w-4 mr-1 text-ukhamba-terracotta" />
              {formattedAmount}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center">
              Potential Tax Benefit:
              <span className="inline-block ml-1 text-xs bg-muted rounded-full px-2 py-0.5">
                33% deductible
              </span>
            </span>
            <span className="font-medium text-success flex items-center">
              <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
              R{taxDeduction}
            </span>
          </div>
          
          <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
            <p>According to South African tax laws, donations to registered non-profit organizations 
            may qualify for tax deductions of up to 10% of your taxable income.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationSummary;
