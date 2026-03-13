import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';
import React, { useState } from 'react';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#141414]/90 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-black tracking-tighter text-[#E50914]">
            TUBE<span className="text-white">DRACIN</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/latest" className="hover:text-white transition-colors">Latest</Link>
            <Link to="/vip" className="hover:text-white transition-colors">VIP</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <input
              type="text"
              placeholder="Search dramas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#E50914] w-64 transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </form>
          
          <Link to="/search" className="md:hidden p-2 text-gray-300 hover:text-white">
            <Search className="w-5 h-5" />
          </Link>
          <button className="p-2 text-gray-300 hover:text-white">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-300 hover:text-white">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
