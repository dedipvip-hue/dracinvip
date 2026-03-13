import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDetail } from '../api';
import { Drama, Episode } from '../types';
import { Play, Share2, Plus, ThumbsUp, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Plyr } from 'plyr-react';
import 'plyr-react/plyr.css';

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const [drama, setDrama] = useState<Drama | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getDetail(id);
        setDrama(data);
        
        // Mock episodes based on chapterCount since we don't have the exact endpoint
        if (data) {
          const mockEpisodes: Episode[] = Array.from({ length: data.chapterCount || 10 }).map((_, i) => ({
            id: `${data.bookId}-ep${i + 1}`,
            title: `Episode ${i + 1}`,
            // We use a placeholder video URL for the player
            videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' 
          }));
          setEpisodes(mockEpisodes);
          setActiveEpisode(mockEpisodes[0]);
        }
      } catch (error) {
        console.error("Error fetching detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!drama) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-gray-400">
        <h2 className="text-2xl font-bold mb-4">Drama Not Found</h2>
        <Link to="/" className="text-[#E50914] hover:underline flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20 md:pb-8">
      {/* Video Player Section */}
      <div className="w-full bg-black aspect-video md:h-[60vh] relative">
        {activeEpisode ? (
          <Plyr 
            source={{
              type: 'video',
              sources: [
                {
                  src: activeEpisode.videoUrl || '',
                  type: 'application/x-mpegURL',
                },
              ],
            }}
            options={{
              controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <Play className="w-16 h-16 text-white/20" />
          </div>
        )}
        
        <Link to="/" className="absolute top-4 left-4 z-50 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition-colors md:hidden">
          <ChevronLeft className="w-6 h-6" />
        </Link>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Detail Content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{drama.bookName}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-4">
              <span className="text-green-500 font-semibold">98% Match</span>
              <span>2026</span>
              <span className="border border-gray-600 px-1.5 py-0.5 rounded text-xs">16+</span>
              <span>{drama.chapterCount} Episodes</span>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white hover:bg-gray-200 text-black px-6 py-2.5 rounded font-bold transition-colors">
                <Play className="w-5 h-5 fill-current" />
                Play
              </button>
              <button className="p-2.5 bg-[#2A2A2A] hover:bg-[#3A3A3A] rounded-full text-white transition-colors">
                <Plus className="w-5 h-5" />
              </button>
              <button className="p-2.5 bg-[#2A2A2A] hover:bg-[#3A3A3A] rounded-full text-white transition-colors">
                <ThumbsUp className="w-5 h-5" />
              </button>
              <button className="p-2.5 bg-[#2A2A2A] hover:bg-[#3A3A3A] rounded-full text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              {drama.introduction}
            </p>
          </div>
          
          <div className="text-sm text-gray-400 space-y-2 pt-4 border-t border-white/10">
            {drama.protagonist && (
              <p><span className="text-gray-500">Cast:</span> <span className="text-gray-300">{drama.protagonist}</span></p>
            )}
            {drama.tags && drama.tags.length > 0 && (
              <p><span className="text-gray-500">Genres:</span> <span className="text-gray-300">{drama.tags.join(', ')}</span></p>
            )}
          </div>
        </div>

        {/* Episode List */}
        <div className="lg:col-span-1">
          <div className="bg-[#1A1A1A] rounded-xl p-4 border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Episodes</h3>
              <span className="text-sm text-gray-400">{episodes.length} Episodes</span>
            </div>
            
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {episodes.map((ep, index) => (
                <button
                  key={ep.id}
                  onClick={() => setActiveEpisode(ep)}
                  className={`w-full flex items-center gap-4 p-3 rounded-lg transition-colors text-left ${
                    activeEpisode?.id === ep.id 
                      ? 'bg-[#2A2A2A] border border-white/10' 
                      : 'hover:bg-[#2A2A2A]/50 border border-transparent'
                  }`}
                >
                  <div className="relative w-24 aspect-video bg-gray-800 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={drama.coverWap} 
                      alt={ep.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {activeEpisode?.id === ep.id ? (
                        <Play className="w-6 h-6 text-[#E50914] fill-current" />
                      ) : (
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-medium truncate ${activeEpisode?.id === ep.id ? 'text-white' : 'text-gray-300'}`}>
                      {ep.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">24m</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
