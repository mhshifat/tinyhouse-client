import { List, Typography } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import { BookingsObj } from "../../../../../graphql/generated";
import ListingCard from "../../../../common/ListingCard";
import { useAuth } from "../../../../providers/components/AuthProvider/index";
import { PAGE_LIMIT } from "../../index";

interface Props {
  bookings: BookingsObj;
  bookingPage: number;
  setBookingPage: (v: number) => void;
}

const { Text, Title, Paragraph } = Typography;
const UserBookings: React.FC<Props> = ({
  bookings,
  bookingPage,
  setBookingPage,
}) => {
  const { authState } = useAuth();
  const params = useParams<{ id: string }>();

  const isAuthenticatedUser = authState.id === params.id;

  const userBookingList = (
    <List
      grid={{
        gutter: 8,
        xs: 1,
        sm: 2,
        lg: 4,
      }}
      dataSource={bookings.result}
      locale={{ emptyText: "You haven't made any bookings yet!" }}
      pagination={{
        position: "top",
        current: bookingPage,
        total: bookings.total,
        defaultPageSize: PAGE_LIMIT,
        hideOnSinglePage: true,
        showLessItems: true,
        onChange: (page: number) => setBookingPage(page),
      }}
      renderItem={(booking) => {
        const bookingHistory = (
          <div className="user-bookings__booking-history">
            <div>
              Check In: <Text strong>{booking.checkIn}</Text>
            </div>
            <div>
              Check Out: <Text strong>{booking.checkOut}</Text>
            </div>
          </div>
        );

        return (
          <List.Item>
            {bookingHistory}
            <ListingCard listing={booking.listing} />
          </List.Item>
        );
      }}
    />
  );

  return isAuthenticatedUser ? (
    <div className="user-bookings">
      <Title level={4} className="user-bookings__title">
        Bookings
      </Title>
      <Paragraph className="user-bookings__description">
        This section highlights the bookings you have made and the
        check-in/check-out dates associated with said bookings.
      </Paragraph>
      {userBookingList}
    </div>
  ) : null;
};

export default UserBookings;
