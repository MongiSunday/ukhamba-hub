
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Please enter your full name' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  interests: z.string().min(10, { message: 'Please tell us about your interests' }),
  availability: z.string().min(5, { message: 'Please tell us about your availability' }),
  skills: z.string().min(5, { message: 'Please tell us about your skills' }),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms to volunteer',
  }),
});

type VolunteerFormValues = z.infer<typeof formSchema>;

const VolunteerSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      interests: '',
      availability: '',
      skills: '',
      agreeToTerms: false,
    },
  });

  async function onSubmit(data: VolunteerFormValues) {
    setIsSubmitting(true);
    
    try {
      const { agreeToTerms, interests, ...formData } = data;
      const submissionData = {
        ...formData,
        interests: [interests], // Convert to array format expected by backend
      };

      const { error } = await supabase.functions.invoke('send-volunteer-application', {
        body: submissionData
      });

      if (error) {
        throw error;
      }

      toast.success("Volunteer application submitted! We'll be in touch soon.");
      form.reset();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="volunteer-section" className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Volunteer Opportunities</h2>
            <div className="w-20 h-1 bg-ukhamba-terracotta mb-8"></div>
            <p className="mb-6 text-foreground/80">
              As a volunteer with Ukhamba Communicare, you'll be on the frontlines of positive social change 
              in South African communities. Our volunteers play a crucial role in our programs—from 
              teaching and mentoring to organizing events and providing administrative support.
            </p>
            <p className="mb-6 text-foreground/80">
              We welcome volunteers from all backgrounds and skill sets. Whether you can offer a few hours 
              a week or want to be involved in a more structured, long-term capacity, we have opportunities 
              that match your availability and interests.
            </p>
            <div className="bg-muted p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-4">Current Volunteer Needs:</h3>
              <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                <li>Workshop Facilitators</li>
                <li>Mentors for Youth Programs</li>
                <li>Event Coordinators</li>
                <li>Content Creators</li>
                <li>Administrative Support</li>
                <li>Community Outreach</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-muted p-8 rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-6 text-center">Volunteer Application</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Areas of Interest</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What programs or initiatives are you interested in?" 
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Availability</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="When are you available to volunteer?" 
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills & Experience</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your relevant skills and experience" 
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the volunteer terms and conditions
                        </FormLabel>
                        <FormDescription>
                          By checking this box, you agree to our volunteer code of conduct and privacy policy.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-ukhamba-terracotta hover:bg-ukhamba-terracotta/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;
