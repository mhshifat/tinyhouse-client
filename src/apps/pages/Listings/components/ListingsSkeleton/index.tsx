import { Card, List, Skeleton } from "antd";
import React from "react";

const ListingsSkeleton = () => {
  const emptyData = [{}, {}, {}, {}, {}, {}, {}, {}];
  return (
    <div>
      <Skeleton paragraph={{ rows: 1 }} />
      <List
        grid={{
          gutter: 8,
          xs: 1,
          sm: 2,
          lg: 4,
        }}
        dataSource={emptyData}
        renderItem={() => (
          <List.Item>
            <Card
              loading
              cover={
                <div
                  className="listings-skeleton__card-cover-img"
                  style={{
                    backgroundImage: `url("/images/listing-loading-card-cover.jpg")`,
                  }}
                />
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ListingsSkeleton;
