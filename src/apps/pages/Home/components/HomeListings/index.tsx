import { List, Typography } from "antd";
import React from "react";
import { Listing } from "../../../../../graphql/generated";
import ListingCard from "../../../../common/ListingCard";

interface Props {
  title: string;
  listings: Listing[];
}

const { Title } = Typography;

export const HomeListings = ({ title, listings }: Props) => {
  return (
    <div className="home-listings">
      <Title level={4} className="home-listings__title">
        {title}
      </Title>
      <List
        grid={{
          gutter: 8,
          xs: 1,
          sm: 2,
          lg: 4,
        }}
        dataSource={listings}
        renderItem={(listing) => (
          <List.Item>
            <ListingCard listing={listing as Listing} />
          </List.Item>
        )}
      />
    </div>
  );
};
