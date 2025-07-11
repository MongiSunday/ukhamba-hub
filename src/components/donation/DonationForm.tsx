
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader } from 'lucide-react';
import { formSchema, DonationFormValues } from './DonationFormSchema';
import DonationAmountSelector from './DonationAmountSelector';
import DonationUserInfo from './DonationUserInfo';
import DonationPaymentMethod from './DonationPaymentMethod';
import DonationSummary from './DonationSummary';

const DonationForm: React.FC = () => {
  const [customAmount, setCustomAmount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '100',
      fullName: '',
      email: '',
      paymentMethod: 'creditCard',
    },
  });

  async function onSubmit(data: DonationFormValues) {
    setIsSubmitting(true);
    try {
      const [firstName, ...lastNameParts] = data.fullName.split(' ');
      const lastName = lastNameParts.join(' ') || firstName;
      
      const donationData = {
        firstName,
        lastName,
        email: data.email,
        amount: data.amount,
        isMonthly: false, // This will be determined by payment processing
      };

      const { error } = await supabase.functions.invoke('send-donation-confirmation', {
        body: donationData
      });

      if (error) {
        throw error;
      }

      toast.success("Thank you for your donation! A confirmation email has been sent.");
      form.reset();
    } catch (error) {
      console.error('Error processing donation:', error);
      toast.error("There was an error processing your donation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleAmountSelect = (value: string) => {
    if (value === 'custom') {
      setCustomAmount(true);
      form.setValue('amount', '');
    } else {
      setCustomAmount(false);
      form.setValue('amount', value);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Make a Donation</CardTitle>
        <CardDescription>
          Choose an amount and payment method below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DonationAmountSelector 
              form={form} 
              customAmount={customAmount} 
              handleAmountSelect={handleAmountSelect} 
            />
            
            <DonationUserInfo form={form} />
            
            <DonationPaymentMethod form={form} />
            
            {/* Show donation summary when an amount is entered */}
            {form.watch('amount') && <DonationSummary amount={form.watch('amount')} />}
            
            <Button 
              type="submit" 
              className="w-full bg-ukhamba-terracotta hover:bg-ukhamba-terracotta/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Complete Donation"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DonationForm;
