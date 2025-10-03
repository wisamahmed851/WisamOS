'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { config } from '@/lib/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Github, Linkedin, Send } from 'lucide-react';
import Link from 'next/link';
import { sendEmail } from '@/app/actions';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

const iconMap = {
  Github: Github,
  Linkedin: Linkedin,
};

const Contact = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await sendEmail(values);
    if (result.success) {
      toast({
        title: 'Message Sent!',
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: result.message || 'There was a problem sending your message.',
      });
    }
  };

  return (
    <ScrollArea className="h-full bg-background">
      <div className="p-4 md:p-8">
        <div className="mb-8 text-center">
          <h1 className="font-headline text-2xl font-bold mb-2">Get in Touch</h1>
          <p className="text-sm text-muted-foreground">
            Have a question or want to work together? Drop me a line.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your message..." {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Sending...' : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
            </Button>
          </form>
        </Form>

        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <h3 className="font-headline text-lg font-semibold mb-4">Find me on</h3>
          <div className="flex justify-center gap-4">
            {config.apps.contact.social.map((social) => {
              const Icon = iconMap[social.icon as keyof typeof iconMap] || Github;
              return (
                <Button key={social.name} variant="outline" size="icon" asChild>
                  <Link href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                    <Icon className="h-5 w-5" />
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Contact;
