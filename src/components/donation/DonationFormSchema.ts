
import { z } from 'zod';

export const formSchema = z.object({
  amount: z.string().min(1, { message: 'Please select or enter a donation amount' }),
  fullName: z.string().min(2, { message: 'Please enter your full name' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  paymentMethod: z.enum(['creditCard', 'directDeposit', 'paypal'], {
    required_error: 'Please select a payment method',
  }),
});

export type DonationFormValues = z.infer<typeof formSchema>;
