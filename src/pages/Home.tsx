import { useEffect, useState } from 'react';
import { getTrending, getLatest, getForYou, getVip } from '../api';
import { Drama } from '../types';
import { Link } from 'react-router-dom';
import { Play, Info, ChevronRight, Crown } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const [trending, setTrending] = useState<Drama[]>([]);
  const [latest, setLatest] = useState<Drama[]>([]);
  const [forYou, setForYou] = useState<Drama[]>([]);
  const [vip, setVip] = useState<Drama[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingData, latestData, forYouData, vipData] = await Promise.all([
          getTrending(),
          getLatest(),
          getForYou(),
          getVip(),
        ]);
        setTrending(trendingData);
        setLatest(latestData);
        setForYou(forYouData);
        setVip(vipData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const heroDrama = trending[0];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      {heroDrama && (
        <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/50 to-transparent z-10" />
          
          <img 
            src={heroDrama.coverWap} 
            alt={heroDrama.bookName}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-70"
          />
          
          <div className="absolute bottom-0 left-0 z-20 p-6 md:p-16 w-full md:w-2/3">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white"
            >
              {heroDrama.bookName}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-300 text-sm md:text-base line-clamp-3 mb-6 max-w-2xl"
            >
              {heroDrama.introduction}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <Link 
                to={`/detail/${heroDrama.bookId}`}
                className="flex items-center gap-2 bg-[#E50914] hover:bg-[#f40612] text-white px-6 py-3 rounded-md font-bold transition-colors"
              >
                <Play className="w-5 h-5 fill-current" />
                Play Now
              </Link>
              <Link 
                to={`/detail/${heroDrama.bookId}`}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-md font-bold backdrop-blur-sm transition-colors"
              >
                <Info className="w-5 h-5" />
                More Info
              </Link>
            </motion.div>
          </div>
        </div>
      )}

      <div className="px-4 md:px-12 -mt-10 relative z-20 space-y-12">
        <Section title="Trending Now" dramas={trending.slice(1)} />
        <Section title="Latest Releases" dramas={latest} />
        <Section title="For You" dramas={forYou} />
        <Section title="DramaBox VIP" dramas={vip} isVip />
      </div>
    </div>
  );
}

function Section({ title, dramas, isVip = false }: { title: string, dramas: Drama[], isVip?: boolean }) {
  if (!dramas || !Array.isArray(dramas) || dramas.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          {title}
          {isVip && <Crown className="w-5 h-5 text-yellow-500" />}
        </h2>
        <Link to="#" className="text-sm text-gray-400 hover:text-white flex items-center">
          See All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        {dramas.map((drama) => (
          <Link 
            key={drama.bookId} 
            to={`/detail/${drama.bookId}`}
            className="flex-none w-[140px] md:w-[200px] snap-start group relative"
          >
            <div className="aspect-[2/3] rounded-lg overflow-hidden relative bg-gray-800">
              <img 
                src={drama.coverWap} 
                alt={drama.bookName}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play className="w-12 h-12 text-white fill-white/20" />
              </div>
              {isVip && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
                  VIP
                </div>
              )}
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded">
                {drama.chapterCount} Eps
              </div>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-200 line-clamp-2 group-hover:text-[#E50914] transition-colors">
              {drama.bookName}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}


