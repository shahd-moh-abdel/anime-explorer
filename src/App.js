import React, { useState, useEffect, useRef, useCallback } from "react";
import { Tab } from "@headlessui/react";
import { Loader2 } from "lucide-react";
import PopularList from "./PopularList";
import DetailsPage from "./DetailsPage";

const API_BASE_URL = "https://kitsu.io/api/edge";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const App = () => {
  const [animeList, setAnimeList] = useState([]);
  const [mangaList, setMangaList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animeOffset, setAnimeOffset] = useState(0);
  const [mangaOffset, setMangaOffset] = useState(0);
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

  const fetchData = async (type, offset) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/${type}?sort=-averageRating&page[limit]=20&page[offset]=${offset}`
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
      const animeData = await fetchData("anime", 0);
      const mangaData = await fetchData("manga", 0);

      if (animeData && mangaData) {
        setAnimeList(animeData.data);
        setMangaList(mangaData.data);
        setAnimeOffset(20);
        setMangaOffset(20);
      }
      setLoading(false);
    };

    initialFetch();
  }, []);

  const loadMore = async () => {
    setLoading(true);
    const newAnimeData = await fetchData("anime", animeOffset);
    const newMangaData = await fetchData("manga", mangaOffset);

    if (newAnimeData && newMangaData) {
      setAnimeList((prev) => [...prev, ...newAnimeData.data]);
      setMangaList((prev) => [...prev, ...newMangaData.data]);
      setAnimeOffset((prev) => prev + 20);
      setMangaOffset((prev) => prev + 20);
      setHasMore(newAnimeData.data.length > 0 || newMangaData.data.length > 0);
    }
    setLoading(false);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Anime and Manga Explorer
      </h1>
      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-4">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Popular Anime & Manga
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Details
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Popular Anime</h2>
                  <PopularList
                    items={animeList}
                    onItemClick={handleItemClick}
                    lastItemRef={lastItemRef}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Popular Manga</h2>
                  <PopularList
                    items={mangaList}
                    onItemClick={handleItemClick}
                    lastItemRef={lastItemRef}
                  />
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <DetailsPage item={selectedItem} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      )}
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
        </div>
      )}
    </div>
  );
};

export default App;
