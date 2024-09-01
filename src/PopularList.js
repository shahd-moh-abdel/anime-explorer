import React from "react";

const PopularList = ({ items, onItemClick, lastItemRef }) => {
  if (!items || items.length === 0) {
    return <div className="text-center">No items to display.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((item, index) => (
        <div
          key={item.id}
          ref={index === items.length - 1 ? lastItemRef : null}
          className="cursor-pointer hover:opacity-75 transition-opacity duration-200"
          onClick={() => onItemClick(item)}
        >
          <img
            src={item.attributes.posterImage?.small || "placeholder-image-url"}
            alt={item.attributes.canonicalTitle}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <h3 className="mt-2 text-sm font-semibold text-gray-900 truncate">
            {item.attributes.canonicalTitle}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default PopularList;
