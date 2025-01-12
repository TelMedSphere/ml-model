import React, { useContext } from "react";
import { BiSort, BiFilterAlt } from "react-icons/bi";
import filtersContext from "../../contexts/filters/filterContext";
import FilterBarOptions from "./FilterBarOptions";

const FilterBar = () => {
  const { handleMobSortVisibility, handleMobFilterVisibility } =
    useContext(filtersContext);

  return (
    <>
      {/*===== Filterbar-default =====*/}
      <aside
        id="filterbar"
        className="bg-white p-6 max-h-[82vh] overflow-y-auto hidden lg:block"
      >
        <div className="grid gap-10 text-sm">
          <FilterBarOptions />
        </div>
      </aside>

      {/*===== Filterbar-mobile =====*/}
      <div
        id="filterbar_mob"
        className="fixed bottom-0 left-0 z-[999] w-full p-4 bg-white shadow-[0_-8px_15px_rgba(0,0,0,0.5)] lg:hidden"
      >
        <div className="flex justify-around items-center text-sm">
          <h3
            className="flex items-center cursor-pointer"
            onClick={() => handleMobSortVisibility(true)}
          >
            <BiSort className="w-5 h-5" />
            <span className="ml-2">Sort</span>
          </h3>
          <span>|</span>
          <h3
            className="flex items-center cursor-pointer"
            onClick={() => handleMobFilterVisibility(true)}
          >
            <BiFilterAlt className="w-5 h-5" />
            <span className="ml-2">Filter</span>
          </h3>
        </div>
        <FilterBarOptions />
      </div>
    </>
  );
};

export default FilterBar;