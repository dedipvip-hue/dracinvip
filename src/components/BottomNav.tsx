import { Home, Compass, Crown, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Latest', path: '/latest' },
    { icon: Crown, label: 'VIP', path: '/vip' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#141414]/95 backdrop-blur-lg border-t border-white/10 flex items-center justify-around h-16 px-2">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.label}
            to={item.path}
            className={clsx(
              "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
              isActive ? "text-[#E50914]" : "text-gray-400 hover:text-gray-200"
            )}
          >
            <item.icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
