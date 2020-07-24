import { Col, Layout, Row } from "antd";
import { Moment } from "moment";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  BookingsObj,
  Listing as ListingData,
  useGetListingQuery,
} from "../../../graphql/generated";
import ErrorBanner from "../../common/ErrorBanner";
import PageSkeleton from "../../common/PageSkeleton";
import { PAGE_LIMIT } from "../User/index";
import ListingBookings from "./components/ListingBookings";
import { ListingCreateBooking } from "./components/ListingCreateBooking";
import { WrappedListingCreateBookingModal } from "./components/ListingCreateBookingModal/index";
import ListingDetails from "./components/ListingDetails";

const { Content } = Layout;
const Listing: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const [bookingPage, setBookingPage] = useState<number>(1);
  const [checkInDate, setCheckInDate] = useState<Moment | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Moment | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { data, loading, error, refetch } = useGetListingQuery({
    variables: {
      id: match.params.id,
      limit: PAGE_LIMIT,
      page: bookingPage,
    },
  });

  const clearBookingData = () => {
    setModalVisible(false);
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  const handleListingRefetch = async () => {
    await refetch();
  };

  const listing = data?.getListing;
  const listingBookings = listing && listing.bookings;
  const listingDetailsElement = listing && (
    <ListingDetails listing={listing as ListingData} />
  );
  const listingBookingsElement = listingBookings && (
    <ListingBookings
      bookings={listingBookings as BookingsObj}
      bookingPage={bookingPage}
      setBookingPage={setBookingPage}
    />
  );
  const createListingBookingElement = listing && (
    <ListingCreateBooking
      checkInDate={checkInDate}
      setCheckInDate={setCheckInDate}
      checkOutDate={checkOutDate}
      setCheckOutDate={setCheckOutDate}
      listing={listing as ListingData}
      setModalVisible={setModalVisible}
    />
  );
  const listingCreateBookingModalElement =
    listing && checkInDate && checkOutDate ? (
      <WrappedListingCreateBookingModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        price={listing.price}
        id={listing._id}
        clearBookingData={clearBookingData}
        handleListingRefetch={handleListingRefetch}
      />
    ) : null;

  if (loading) {
    return (
      <Content className="listings">
        <PageSkeleton />
      </Content>
    );
  }
  if (error) {
    return (
      <Content className="listings">
        <ErrorBanner description="This listing may not exist, or try again later!" />
        <PageSkeleton />
      </Content>
    );
  }
  return (
    <Content className="listings">
      <Row gutter={12} justify="space-between">
        <Col xs={24} lg={14}>
          {listingDetailsElement}
          {listingBookingsElement}
        </Col>
        <Col xs={24} lg={10}>
          {createListingBookingElement}
        </Col>
      </Row>
      {listingCreateBookingModalElement}
    </Content>
  );
};

export default Listing;
