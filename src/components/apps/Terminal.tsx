'use client';

import { useState, useRef, useEffect } from 'react';
import { config } from '@/lib/config';
import { useDesktop } from '@/context/DesktopContext';

const commands: Record<string, (args: string[]) => string | void> = {
  help: () => `Available commands:\n  'help' - Show this help message\n  'whoami' - Display user information\n  'skills' - List skills\n  'projects' - List projects\n  'contact' - Show contact information\n  'open <app_id>' - Open an application (e.g., open about)\n  'clear' - Clear the terminal screen\n  'neofetch' - Display system information`,
  whoami: () => `${config.user.name} - ${config.user.tagline}`,
  skills: () =>
    config.apps.skills
      .map(
        (s) =>
          `${s.category}:\n  ${s.items.join(', ')}`
      )
      .join('\n\n'),
  projects: () =>
    config.apps.projects
      .map((p) => `- ${p.name}: ${p.description}`)
      .join('\n'),
  contact: () =>
    `Email: ${config.apps.contact.email}\n` +
    config.apps.contact.social
      .map((s) => `${s.name}: ${s.url}`)
      .join('\n'),
  clear: () => { /* handled in component */ },
  neofetch: () => `
    <pre>
                 ,c.
                /\\\'
               /  \\\'
              /    \\\'
             /      \\\'
            /________\\\'
            \'--'''--'
    </pre>
    <div style="padding-left: 2em; display: inline-block; vertical-align: top;">
      <strong>${config.user.name}@wisam-os</strong><br>
      -----------<br>
      <strong>OS:</strong> Wisam OS (Web-based)<br>
      <strong>Host:</strong> Browser<br>
      <strong>Kernel:</strong> Next.js / React<br>
      <strong>Uptime:</strong> ask the browser<br>
      <strong>Shell:</strong> zsh (simulated)<br>
      <strong>Resolution:</strong> your screen size<br>
      <strong>Terminal:</strong> WisamTerm<br>
    </div>
  `,
};


const TerminalApp = () => {
  const [history, setHistory] = useState<string[]>(['Welcome to Term. Type \'help\' for commands.']);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { openWindow } = useDesktop();


  const handleCommand = (cmd: string) => {
    const [command, ...args] = cmd.trim().split(' ');
    const newHistory = [...history, `> ${cmd}`];

    if (command === 'clear') {
      setHistory([]);
      return;
    }
    
    if (command === 'open' && args[0]) {
       try {
        // @ts-ignore
        openWindow(args[0]);
        newHistory.push(`Opening '${args[0]}'...`);
       } catch (error) {
        newHistory.push(`Error: App '${args[0]}' not found.`);
       }
       setHistory(newHistory);
       return;
    }

    if (command in commands) {
      const output = commands[command](args);
      if (output) {
        newHistory.push(output);
      }
    } else if (cmd.trim() !== '') {
      newHistory.push(`Command not found: ${command}. Type 'help' for a list of commands.`);
    }

    setHistory(newHistory);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [history]);

  return (
    <div
      className="h-full w-full bg-black text-white font-code text-sm p-2 overflow-y-auto"
      onClick={() => inputRef.current?.focus()}
      ref={scrollRef}
    >
      {history.map((line, index) => (
        <div key={index} className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: line }} />
      ))}
      <div className="flex items-center">
        <span>&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="bg-transparent border-none text-white w-full focus:outline-none ml-2"
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default TerminalApp;

    