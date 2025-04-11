
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DonationFormValues } from './DonationFormSchema';

interface DonationAmountSelectorProps {
  form: UseFormReturn<DonationFormValues>;
  customAmount: boolean;
  handleAmountSelect: (value: string) => void;
}

const DonationAmountSelector: React.FC<DonationAmountSelectorProps> = ({
  form,
  customAmount,
  handleAmountSelect,
}) => {
  return (
    <div className="space-y-4">
      <FormLabel>Donation Amount (ZAR)</FormLabel>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {['100', '250', '500', '1000', '2500', 'custom'].map((amount) => (
          <Button
            key={amount}
            type="button"
            variant={form.watch('amount') === amount || (customAmount && amount === 'custom') ? 'default' : 'outline'}
            className={`
              ${form.watch('amount') === amount || (customAmount && amount === 'custom') 
                ? 'bg-ukhamba-terracotta hover:bg-ukhamba-terracotta/90 text-white' 
                : 'border-ukhamba-terracotta text-ukhamba-terracotta hover:bg-ukhamba-terracotta hover:text-white'}
            `}
            onClick={() => handleAmountSelect(amount)}
          >
            {amount === 'custom' ? 'Custom' : `R${amount}`}
          </Button>
        ))}
      </div>
      
      {customAmount && (
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Amount (ZAR)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter amount" 
                  type="number" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default DonationAmountSelector;
