import { Avatar, Divider, List, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { BookingsObj } from "../../../../../graphql/generated";
import { PAGE_LIMIT } from "../../../User/index";

interface Props {
  bookings: BookingsObj;
  bookingPage: number;
  setBookingPage: (v: number) => void;
}

const { Text, Title } = Typography;
const ListingBookings: React.FC<Props> = ({
  bookings,
  bookingPage,
  setBookingPage,
}) => {
  const listingBookingList = (
    <List
      grid={{
        gutter: 8,
        xs: 1,
        sm: 2,
        lg: 3,
      }}
      dataSource={bookings.result}
      locale={{ emptyText: "This listing doesn't have any bookings yet!" }}
      pagination={{
        current: bookingPage,
        total: bookings.total,
        defaultPageSize: PAGE_LIMIT,
        hideOnSinglePage: true,
        showLessItems: true,
        onChange: (page: number) => setBookingPage(page),
      }}
      renderItem={(booking) => {
        const bookingHistory = (
          <div className="listing-bookings__history">
            <div>
              Check In: <Text strong>{booking.checkIn}</Text>
            </div>
            <div>
              Check Out: <Text strong>{booking.checkOut}</Text>
            </div>
          </div>
        );

        return (
          <List.Item className="listing-bookings__item">
            {bookingHistory}
            <Link to={`/user/${booking.tenant._id}`}>
              <Avatar src={booking.tenant.avatar} size={64} shape="square" />
            </Link>
          </List.Item>
        );
      }}
    />
  );

  return (
    <div className="user-bookings">
      <Divider />
      <div className="listing-bookings__section">
        <Title level={4} className="user-bookings__title">
          Bookings
        </Title>
      </div>
      {listingBookingList}
    </div>
  );
};

export default ListingBookings;
