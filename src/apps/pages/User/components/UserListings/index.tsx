import { List, Typography } from "antd";
import React from "react";
import { Listing } from "../../../../../graphql/generated";
import ListingCard from "../../../../common/ListingCard";
import { PAGE_LIMIT } from "../../index";

interface Props {
  listings: any;
  listingPage: number;
  setListingPage: (v: number) => void;
}

const { Paragraph, Title } = Typography;
const UserListings: React.FC<Props> = ({
  listings,
  listingPage,
  setListingPage,
}) => {
  const userListingList = (
    <List
      grid={{
        gutter: 8,
        xs: 1,
        sm: 2,
        lg: 4,
      }}
      dataSource={listings.result}
      locale={{ emptyText: "User doesn't have any listings yet!" }}
      pagination={{
        position: "top",
        current: listingPage,
        total: listings.total,
        defaultPageSize: PAGE_LIMIT,
        hideOnSinglePage: true,
        showLessItems: true,
        onChange: (page: number) => setListingPage(page),
      }}
      renderItem={(listing) => (
        <List.Item>
          <ListingCard listing={listing as Listing} />
        </List.Item>
      )}
    />
  );

  return (
    <div className="user-listings">
      <Title level={4} className="user-listings__title">
        Listings
      </Title>
      <Paragraph className="user-listings__description">
        This section highlights the listings this user currently hosts and has
        available for bookings.
      </Paragraph>
      {userListingList}
    </div>
  );
};

export default UserListings;
