import { DesktopProvider } from '@/context/DesktopContext';
import Desktop from '@/components/desktop/Desktop';
import Taskbar from '@/components/desktop/Taskbar';

export default function Home() {
  return (
    <DesktopProvider>
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        <Desktop />
        <Taskbar />
      </div>
    </DesktopProvider>
  );
}
