import { config } from '@/lib/config';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Skills = () => {
  const { skills } = config.apps;

  return (
    <ScrollArea className="h-full bg-background">
      <div className="p-8 space-y-8">
        <h1 className="font-headline text-2xl font-bold">Skills</h1>
        {skills.map((category) => (
          <div key={category.category}>
            <h2 className="font-headline text-lg font-semibold mb-4">{category.category}</h2>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <Badge key={item} variant="secondary" className="text-sm font-medium">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default Skills;
