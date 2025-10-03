import { config } from '@/lib/config';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Briefcase } from 'lucide-react';

const Experience = () => {
  const { experience } = config.apps;

  return (
    <ScrollArea className="h-full bg-background">
      <div className="p-8">
        <h1 className="font-headline text-2xl font-bold mb-6">Work Experience</h1>
        <div className="relative border-l-2 border-accent/20 pl-8 space-y-10">
          {experience.map((job) => (
            <div key={job.company} className="relative">
              <div className="absolute -left-[41px] top-0 h-8 w-8 rounded-full bg-card border-2 border-accent/50 flex items-center justify-center">
                 <Briefcase className="w-4 h-4 text-accent" />
              </div>
              <p className="text-sm text-muted-foreground">{job.duration}</p>
              <h3 className="font-headline text-lg font-semibold mt-1">{job.role}</h3>
              <p className="text-md font-medium text-accent">{job.company}</p>
              <p className="mt-2 text-sm text-muted-foreground max-w-prose">{job.description}</p>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default Experience;
