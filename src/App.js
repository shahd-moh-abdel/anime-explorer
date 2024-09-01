import React, { useState, useEffect, useRef, useCallback } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PopularList from "./PopularList";
import DetailsPage from "./DetailsPage";

const API_BASE_URL = "https://kitsu.io/api/edge";

const App = () => {
  const [animeList, setAnimeList] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animeOffset, setAnimeOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchData = async (offset) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/anime?sort=-averageRating&page[limit]=20&page[offset]=${offset}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setError(error.message);
      return null;
    }
  };

  useEffect(() => {
    const initialFetch = async () => {
      setLoading(true);
      const animeData = await fetchData(0);

      if (animeData) {
        setAnimeList(animeData.data);
        setAnimeOffset(20);
      }
      setLoading(false);
    };

    initialFetch();
  }, []);

  const loadMore = async () => {
    setLoading(true);
    const newAnimeData = await fetchData(animeOffset);

    if (newAnimeData) {
      setAnimeList((prev) => [...prev, ...newAnimeData.data]);
      setAnimeOffset((prev) => prev + 20);
      setHasMore(newAnimeData.data.length > 0);
    }
    setLoading(false);
  };

  const handleAnimeClick = (anime) => {
    setSelectedAnime(anime);
  };

  const handleBackClick = () => {
    setSelectedAnime(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center text-indigo-700"
      >
        Anime Explorer
      </motion.h1>
      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <AnimatePresence mode="wait">
          {selectedAnime ? (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={handleBackClick}
                className="mb-4 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              >
                <ArrowLeft className="mr-2" size={20} />
                Back to List
              </button>
              <DetailsPage anime={selectedAnime} />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <PopularList
                items={animeList}
                onItemClick={handleAnimeClick}
                lastItemRef={lastItemRef}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <Loader2 className="animate-spin h-8 w-8 text-indigo-500" />
        </div>
      )}
    </div>
  );
};

export default App;
