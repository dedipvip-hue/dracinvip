import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#141414] text-white pb-16 md:pb-0">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
