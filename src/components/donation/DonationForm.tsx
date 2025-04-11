
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
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
  const { toast } = useToast();
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
      // Simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(data);
      toast({
        title: "Thank you for your donation!",
        description: "Your contribution will help support our programs and initiatives.",
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
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
