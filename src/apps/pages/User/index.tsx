import { Col, Layout, Row } from "antd";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useGetUserQuery } from "../../../graphql/generated";
import ErrorBanner from "../../common/ErrorBanner";
import PageSkeleton from "../../common/PageSkeleton";
import UserBookings from "./components/UserBookings";
import UserListings from "./components/UserListings";
import UserProfile from "./components/UserProfile";

const { Content } = Layout;
export const PAGE_LIMIT = 4;
const User: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const [listingPage, setListingPage] = useState<number>(1);
  const [bookingPage, setBookingPage] = useState<number>(1);
  const { data, loading, error } = useGetUserQuery({
    variables: {
      id: match.params.id,
      bookingsLimit: PAGE_LIMIT,
      bookingsPage: bookingPage,
      listingsLimit: PAGE_LIMIT,
      listingsPage: listingPage,
    },
  });

  const user = data?.getUser;
  const userListings = user && user.listings;
  const userBookings = user && user.bookings;
  const userProfileElement = user && <UserProfile user={user} />;
  const userListingsElement = userListings && (
    <UserListings
      listings={userListings}
      listingPage={listingPage}
      setListingPage={setListingPage}
    />
  );
  const userBookingsElement = userBookings && (
    <UserBookings
      bookings={{ total: 0, result: [] }}
      bookingPage={bookingPage}
      setBookingPage={setBookingPage}
    />
  );

  if (loading) {
    return (
      <Content className="user">
        <PageSkeleton />
      </Content>
    );
  }
  if (error) {
    return (
      <Content className="user">
        <ErrorBanner description="This user may not exist, please try again later!" />
        <PageSkeleton />
      </Content>
    );
  }
  return (
    <Content className="user">
      <Row gutter={12} justify="space-between">
        <Col xs={24}>{userProfileElement}</Col>
        <Col xs={24}>
          {userListingsElement}
          {userBookingsElement}
        </Col>
      </Row>
    </Content>
  );
};

export default User;
