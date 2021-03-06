import { Button, Card, DatePicker, Divider, Typography } from "antd";
import moment, { Moment } from "moment";
import React from "react";
import { Listing } from "../../../../../graphql/generated";
import {
  displayErrorMessage,
  formatListingPrice,
} from "../../../../../lib/utils/index";
import { useAuth } from "../../../../providers/components/AuthProvider/index";

interface Props {
  checkInDate: Moment | null;
  checkOutDate: Moment | null;
  setCheckInDate: (checkInDate: Moment | null) => void;
  setCheckOutDate: (checkOutDate: Moment | null) => void;
  listing: Listing;
  setModalVisible: (modalVisible: boolean) => void;
}

const { Paragraph, Title, Text } = Typography;

export const ListingCreateBooking: React.FC<Props> = ({
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
  listing,
  setModalVisible,
}) => {
  const { authState } = useAuth();

  const bookingsIndexJson = JSON.parse(listing.bookingIndex);
  const dateIsBooked = (currentDate: Moment): boolean => {
    const year = currentDate.year();
    const month = currentDate.month();
    const day = currentDate.date();

    if (bookingsIndexJson[year] && bookingsIndexJson[year][month]) {
      return Boolean(bookingsIndexJson[year][month][day]);
    }

    return false;
  };

  const disabledDate = (currentDate: Moment | null): boolean => {
    if (currentDate) {
      const dateIsBeforeEndOfDay = currentDate.isBefore(moment().endOf("day"));
      return dateIsBeforeEndOfDay || dateIsBooked(currentDate);
    }
    return false;
  };

  const verifyAndSetCheckOutDate = (selectedCheckOutDate: Moment | null) => {
    if (checkInDate && selectedCheckOutDate) {
      if (moment(selectedCheckOutDate).isBefore(checkInDate, "days")) {
        return displayErrorMessage(
          `You can't book date of check out to be prior to check in!`
        );
      }
      let dateCursor = checkInDate;
      while (moment(dateCursor).isBefore(selectedCheckOutDate, "days")) {
        dateCursor = moment(dateCursor).add(1, "days");
        const year = dateCursor.year();
        const month = dateCursor.month();
        const day = dateCursor.date();

        if (
          bookingsIndexJson[year] &&
          bookingsIndexJson[year][month] &&
          bookingsIndexJson[year][month][day]
        ) {
          return displayErrorMessage(
            "you can't book a period of time that overlaps existing bookings. Please try again!"
          );
        }
      }
    }
    setCheckOutDate(selectedCheckOutDate);
  };

  const viewerIsHost = authState.id === listing.host._id;
  const checkInInputDisabled =
    !authState.id || viewerIsHost || !listing.host.hasWallet;
  const checkOutInputDisabled = !checkInDate;
  const buttonDisabled = !checkInDate || !checkOutDate;

  let buttonMessage = authState.id
    ? "You won't be charged yet"
    : "You have to be signed in to book a listing!";

  if (viewerIsHost) {
    buttonMessage = "You can't book your own listing!";
  }

  if (!listing.host.hasWallet) {
    buttonMessage =
      "The host has disconnected from Stripe and thus won't be able to receive payments!";
  }

  return (
    <div className="listing-booking">
      <Card className="listing-booking__card">
        <div>
          <Paragraph>
            <Title level={2} className="listing-booking__card-title">
              {formatListingPrice(listing.price)}
              <span>/day</span>
            </Title>
          </Paragraph>
          <Divider />
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check In</Paragraph>
            <DatePicker
              value={checkInDate}
              disabledDate={disabledDate}
              disabled={checkInInputDisabled}
              format="YYYY/MM/DD"
              onChange={setCheckInDate}
              showToday={false}
              onOpenChange={() => setCheckOutDate(null)}
            />
          </div>
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check Out</Paragraph>
            <DatePicker
              value={checkOutDate}
              format="YYYY/MM/DD"
              disabledDate={disabledDate}
              onChange={verifyAndSetCheckOutDate}
              showToday={false}
              disabled={checkOutInputDisabled}
            />
          </div>
        </div>
        <Divider />
        <Button
          size="large"
          type="primary"
          className="listing-booking__card-cta"
          disabled={buttonDisabled}
          onClick={() => setModalVisible(true)}
        >
          Request to book!
        </Button>
        <Text type="secondary" mark>
          {buttonMessage}
        </Text>
      </Card>
    </div>
  );
};
