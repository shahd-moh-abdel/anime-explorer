import React from "react";
import { motion } from "framer-motion";

const DetailsPage = ({ anime }) => {
  if (!anime) {
    return (
      <div className="text-center text-gray-600 text-lg">
        No anime selected. Please go back and choose an anime.
      </div>
    );
  }

  const {
    canonicalTitle,
    synopsis,
    averageRating,
    episodeCount,
    startDate,
    endDate,
    ageRating,
    posterImage,
  } = anime.attributes;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <motion.div
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/3"
        >
          <img
            src={posterImage.large}
            alt={canonicalTitle}
            className="w-full rounded-lg shadow-md"
          />
        </motion.div>
        <motion.div
          initial={{ x: 50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-2/3"
        >
          <h2 className="text-3xl font-bold mb-4 text-indigo-700">
            {canonicalTitle}
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">{synopsis}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <strong className="text-indigo-700">Rating:</strong>{" "}
              {averageRating ? `${averageRating}%` : "N/A"}
            </div>
            <div className="bg-indigo-100 p-3 rounded-lg">
              <strong className="text-indigo-700">Episodes:</strong>{" "}
              {episodeCount || "N/A"}
            </div>
            <div className="bg-indigo-100 p-3 rounded-lg">
              <strong className="text-indigo-700">Start Date:</strong>{" "}
              {startDate ? new Date(startDate).toLocaleDateString() : "N/A"}
            </div>
            <div className="bg-indigo-100 p-3 rounded-lg">
              <strong className="text-indigo-700">End Date:</strong>{" "}
              {endDate ? new Date(endDate).toLocaleDateString() : "Ongoing"}
            </div>
            <div className="bg-indigo-100 p-3 rounded-lg">
              <strong className="text-indigo-700">Age Rating:</strong>{" "}
              {ageRating || "N/A"}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DetailsPage;
