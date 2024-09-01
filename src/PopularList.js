import React from "react";
import { motion } from "framer-motion";

const PopularList = ({ items, onItemClick, lastItemRef }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center text-gray-600 text-lg">
        No anime to display.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          ref={index === items.length - 1 ? lastItemRef : null}
          className="cursor-pointer hover:scale-105 transition-all duration-200"
          onClick={() => onItemClick(item)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={
                item.attributes.posterImage?.small || "placeholder-image-url"
              }
              alt={item.attributes.canonicalTitle}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {item.attributes.canonicalTitle}
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Rating:{" "}
                {item.attributes.averageRating
                  ? `${item.attributes.averageRating}%`
                  : "N/A"}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PopularList;
