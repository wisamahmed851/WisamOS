'use client';

import { config } from '@/lib/config';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Download, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';

const Resume = () => {
  const { user, apps } = config;

  const prioritizedProjects = [...apps.projects].sort((a, b) => {
    const aHasPriority = a.tech.some(t => t.toLowerCase().includes('laravel') || t.toLowerCase().includes('asp.net'));
    const bHasPriority = b.tech.some(t => t.toLowerCase().includes('laravel') || t.toLowerCase().includes('asp.net'));
    if (aHasPriority && !bHasPriority) return -1;
    if (!aHasPriority && bHasPriority) return 1;
    return 0;
  }).slice(0,3);

  return (
    <div className="h-full bg-background flex flex-col">
      <div className="p-4 bg-card/80 border-b border-border flex justify-center items-center">
        <Button asChild>
          <Link href="/Resume.pdf" download="Wisam_Ahmed_Resume.pdf">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Link>
        </Button>
      </div>
      <ScrollArea className="flex-grow">
        <div className="bg-[#0a0a0a] p-4 md:p-8">
          <div 
            className="max-w-4xl mx-auto text-foreground p-8 bg-card rounded-lg shadow-2xl border border-border/20"
          >
            {/* Header */}
            <header className="flex items-center justify-between pb-6 border-b border-border/50">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold font-headline text-accent">{user.name}</h1>
                  <p className="text-lg text-muted-foreground">{user.tagline}</p>
                </div>
              </div>
              <div className="text-xs text-right space-y-1 text-muted-foreground">
                {user.email && <div className="flex items-center justify-end gap-2"><Mail size={14} /><span>{user.email}</span></div>}
                {user.phone && <div className="flex items-center justify-end gap-2"><Phone size={14} /><span>{user.phone}</span></div>}
                {user.address && <div className="flex items-center justify-end gap-2"><MapPin size={14} /><span>{user.address}</span></div>}
                {apps.contact.social.map(social => {
                   const Icon = social.icon === 'Github' ? Github : Linkedin;
                   return <div key={social.name} className="flex items-center justify-end gap-2"><Icon size={14} /><a href={social.url} target="_blank" rel="noreferrer" className="hover:text-accent">{social.url.replace('https://', '')}</a></div>
                })}
              </div>
            </header>

            {/* Summary */}
            <section className="mt-6">
              <h2 className="text-xl font-headline font-semibold border-b-2 border-accent pb-2 mb-3">Summary</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{apps.about.content}</p>
            </section>

            {/* Experience */}
            <section className="mt-6">
              <h2 className="text-xl font-headline font-semibold border-b-2 border-accent pb-2 mb-4">Experience</h2>
              <div className="space-y-4">
                {apps.experience.map(job => (
                  <div key={job.company}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-semibold">{job.role}</h3>
                      <p className="text-sm text-muted-foreground">{job.duration}</p>
                    </div>
                    <p className="text-md font-medium text-accent">{job.company}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{job.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section className="mt-6">
              <h2 className="text-xl font_headline font-semibold border-b-2 border-accent pb-2 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {apps.skills.flatMap(cat => cat.items).map(skill => (
                  <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full font-medium">{skill}</span>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="mt-6">
                <h2 className="text-xl font-headline font-semibold border-b-2 border-accent pb-2 mb-4">Recent Projects</h2>
                <div className="space-y-4">
                    {prioritizedProjects.map(proj => (
                        <div key={proj.id}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-lg font-semibold">{proj.name}</h3>
                            </div>
                             <p className="text-md font-medium text-accent">{proj.tech.join(' | ')}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{proj.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education */}
            <section className="mt-6">
              <h2 className="text-xl font-headline font-semibold border-b-2 border-accent pb-2 mb-4">Education</h2>
              <div className="space-y-3">
                {apps.education.map(edu => (
                  <div key={edu.institution}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-semibold">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">{edu.duration}</p>
                    </div>
                    <p className="text-md font-medium text-accent">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Resume;
