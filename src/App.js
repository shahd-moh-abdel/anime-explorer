import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [animeResponse, mangaResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/anime?sort=-averageRating&page[limit]=20`),
          fetch(`${API_BASE_URL}/manga?sort=-averageRating&page[limit]=20`),
        ]);

        if (!animeResponse.ok || !mangaResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const animeData = await animeResponse.json();
        const mangaData = await mangaResponse.json();

        setAnimeList(animeData.data);
        setMangaList(mangaData.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Anime Explorer</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
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
              Popular Anime
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
          <Tab.Panels className="mt-2">
            <Tab.Panel>
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Popular Anime</h2>
                  <PopularList
                    items={animeList}
                    onItemClick={handleItemClick}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Popular Manga</h2>
                  <PopularList
                    items={mangaList}
                    onItemClick={handleItemClick}
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
    </div>
  );
};

export default App;
