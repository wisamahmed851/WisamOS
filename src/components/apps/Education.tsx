import { config } from '@/lib/config';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GraduationCap } from 'lucide-react';

const Education = () => {
  const { education } = config.apps;

  return (
    <ScrollArea className="h-full bg-background">
      <div className="p-8">
        <h1 className="font-headline text-2xl font-bold mb-6">Education</h1>
        <div className="relative border-l-2 border-accent/20 pl-8 space-y-10">
          {education.map((edu) => (
            <div key={edu.institution} className="relative">
              <div className="absolute -left-[41px] top-0 h-8 w-8 rounded-full bg-card border-2 border-accent/50 flex items-center justify-center">
                 <GraduationCap className="w-4 h-4 text-accent" />
              </div>
                <p className="text-sm text-muted-foreground">{edu.duration}</p>
                <h3 className="font-headline text-lg font-semibold mt-1">{edu.degree}</h3>
              <p className="text-md font-medium text-accent mt-1">{edu.institution}</p>
              <p className="mt-2 text-sm text-muted-foreground max-w-prose">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default Education;
