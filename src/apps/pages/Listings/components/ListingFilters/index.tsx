import { Select } from "antd";
import React from "react";
import { FilterListingEnum } from "../../../../../graphql/generated";

interface Props {
  filter: FilterListingEnum;
  setFilter: (filter: FilterListingEnum) => void;
}

const { Option } = Select;

const ListingsFilters = ({ filter, setFilter }: Props) => {
  return (
    <div className="listings-filters">
      <span>Filter By</span>
      <Select value={filter} onChange={setFilter}>
        <Option value={FilterListingEnum.PriceLowToHigh}>
          Price: Low to High
        </Option>
        <Option value={FilterListingEnum.PriceHighToLow}>
          Price: High to Low
        </Option>
      </Select>
    </div>
  );
};

export default ListingsFilters;
