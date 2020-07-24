import { Pagination } from "antd";
import React from "react";

interface Props {
  total: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
}

const ListingsPagination = ({ total, page, limit, setPage }: Props) => {
  return (
    <Pagination
      current={page}
      total={total}
      defaultPageSize={limit}
      hideOnSinglePage
      showLessItems
      onChange={setPage}
      className="listings-pagination"
    />
  );
};

export default ListingsPagination;
