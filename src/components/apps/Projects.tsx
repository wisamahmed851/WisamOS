import { config } from '@/lib/config';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, PlayCircle, Download, Smartphone, Info } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const Projects = () => {
  const { projects } = config.apps;

  return (
    <ScrollArea className="h-full bg-background">
      <div className="p-8">
        <h1 className="font-headline text-2xl font-bold mb-4">Projects</h1>
        <Alert className="mb-6 border-accent/30 bg-accent/10">
            <Info className="h-4 w-4" />
            <AlertTitle className="font-headline text-accent/90">Note on Private Projects</AlertTitle>
            <AlertDescription className='text-accent/80'>
            This portfolio showcases a selection of my public and personal projects. Many professional works are not listed due to Non-Disclosure Agreements (NDAs). I will continue to update this list as permissions are granted.
            </AlertDescription>
        </Alert>

        <div className="grid gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="bg-card/50 border-border/60 overflow-hidden">
              <CardHeader>
                <CardTitle className="font-headline flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <Github className="w-5 h-5" />
                     {project.name}
                   </div>
                   {project.video && (
                     <Dialog>
                       <DialogTrigger asChild>
                         <Button variant="ghost" size="icon">
                           <PlayCircle className="w-6 h-6 text-accent" />
                         </Button>
                       </DialogTrigger>
                       <DialogContent className="max-w-4xl p-0">
                          <DialogHeader className="p-4">
                            <DialogTitle>{project.name} - Tutorial</DialogTitle>
                          </DialogHeader>
                          <div className="flex justify-center bg-black/50">
                            <video controls autoPlay className="w-full h-full max-w-[80vw] max-h-[80vh] rounded-b-lg">
                              <source src={project.video} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                       </DialogContent>
                     </Dialog>
                   )}
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {project.image && (
                  <div className="relative w-full h-auto flex justify-center bg-black/20 rounded-md p-4 border border-border/50">
                    <Image 
                      src={project.image} 
                      alt={project.name} 
                      width={600}
                      height={400}
                      className="object-contain rounded-md max-h-80 w-auto"
                    />
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="font-normal">{tech}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className='flex gap-4'>
                {project.link && project.link.endsWith('.apk') ? (
                   <Button asChild variant="link" className="px-0 text-accent hover:text-accent/90">
                     <Link href={project.link} target="_blank" rel="noopener noreferrer" download>
                       Download APK
                       <Download className="ml-2 h-4 w-4" />
                     </Link>
                   </Button>
                ) : project.link && (!project.playStoreUrl || project.link !== project.playStoreUrl) ? (
                  <Button asChild variant="link" className="px-0 text-accent hover:text-accent/90">
                    <Link href={project.link} target={project.link.startsWith('/') ? '_self' : '_blank'} rel="noopener noreferrer">
                      View Project
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : null }
                {project.appLinks && project.appLinks.map(appLink => (
                  <Button key={appLink.label} asChild variant="link" className="px-0 text-accent hover:text-accent/90">
                    <Link href={appLink.url} target="_blank" rel="noopener noreferrer" download>
                      {appLink.label}
                      {appLink.label.includes('Download') ? <Download className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
                    </Link>
                  </Button>
                ))}
                { 'playStoreUrl' in project && project.playStoreUrl && (
                    <Button asChild variant="link" className="px-0 text-accent hover:text-accent/90">
                        <Link href={project.playStoreUrl} target="_blank" rel="noopener noreferrer">
                            Google Play
                            <Smartphone className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default Projects;
