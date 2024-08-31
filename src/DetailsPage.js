import React from "react";

const DetailsPage = ({ item }) => {
  if (!item) {
    return (
      <div className="text-center">Please select an item to view details.</div>
    );
  }

  const {
    canonicalTitle,
    synopsis,
    averageRating,
    episodeCount,
    chapterCount,
    startDate,
    endDate,
    ageRating,
    posterImage,
  } = item.attributes;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3">
        <img
          src={posterImage.large}
          alt={canonicalTitle}
          className="w-full rounded-lg shadow-lg"
        />
      </div>
      <div className="md:w-2/3">
        <h2 className="text-2xl font-bold mb-4">{canonicalTitle}</h2>
        <p className="text-gray-700 mb-4">{synopsis}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Rating:</strong>{" "}
            {averageRating ? `${averageRating}%` : "N/A"}
          </div>
          <div>
            <strong>{episodeCount ? "Episodes:" : "Chapters:"}</strong>{" "}
            {episodeCount || chapterCount || "N/A"}
          </div>
          <div>
            <strong>Start Date:</strong>{" "}
            {startDate ? new Date(startDate).toLocaleDateString() : "N/A"}
          </div>
          <div>
            <strong>End Date:</strong>{" "}
            {endDate ? new Date(endDate).toLocaleDateString() : "Ongoing"}
          </div>
          <div>
            <strong>Age Rating:</strong> {ageRating || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
