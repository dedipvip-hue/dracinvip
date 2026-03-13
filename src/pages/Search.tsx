import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchDramas, getPopularSearch } from '../api';
import { Drama } from '../types';
import { Search as SearchIcon, Play, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { getDramaId, getDramaTitle, getDramaCover } from '../utils';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<Drama[]>([]);
  const [popular, setPopular] = useState<Drama[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const data = await getPopularSearch();
        setPopular(data);
      } catch (error) {
        console.error("Error fetching popular searches:", error);
      }
    };
    fetchPopular();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        return;
      }
      
      setLoading(true);
      try {
        const data = await searchDramas(query);
        setResults(data || []);
      } catch (error) {
        console.error("Error searching dramas:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <form onSubmit={handleSearch} className="mb-8 relative max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search for dramas, genres, or actors..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full bg-[#2A2A2A] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] transition-all"
        />
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
        <button 
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#E50914] hover:bg-[#f40612] text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : query ? (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-200">
            Results for "{query}" <span className="text-gray-500 text-sm font-normal">({results.length} found)</span>
          </h2>
          
          {Array.isArray(results) && results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {results.map((drama, index) => {
                const id = getDramaId(drama);
                if (!id) return null;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={id}
                  >
                    <Link 
                      to={`/detail/${id}`}
                      className="flex flex-col group"
                    >
                      <div className="aspect-[2/3] rounded-lg overflow-hidden relative bg-gray-800 mb-2">
                        <img 
                          src={getDramaCover(drama)} 
                          alt={getDramaTitle(drama)}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="w-12 h-12 text-white fill-white/20" />
                        </div>
                        {drama.chapterCount && (
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded">
                            {drama.chapterCount} Eps
                          </div>
                        )}
                      </div>
                      <h3 className="text-sm font-medium text-gray-200 line-clamp-2 group-hover:text-[#E50914] transition-colors">
                        {getDramaTitle(drama)}
                      </h3>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <SearchIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-lg">No results found for "{query}"</p>
              <p className="text-sm mt-2">Try checking your spelling or using different keywords.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-200 flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#E50914]" />
            Popular Searches
          </h2>
          
          <div className="flex flex-wrap gap-3">
            {Array.isArray(popular) && popular.slice(0, 10).map((drama) => {
              const id = getDramaId(drama);
              const title = getDramaTitle(drama);
              if (!id) return null;
              return (
                <Link
                  key={id}
                  to={`/search?q=${encodeURIComponent(title)}`}
                  className="bg-[#2A2A2A] hover:bg-[#3A3A3A] border border-white/5 text-gray-300 px-4 py-2 rounded-full text-sm transition-colors"
                >
                  {title}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
