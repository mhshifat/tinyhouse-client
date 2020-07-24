import { KeyOutlined } from "@ant-design/icons";
import { Button, Divider, Modal, Typography } from "antd";
import { Moment } from "moment";
import React from "react";
import { formatListingPrice } from "../../../../../lib/utils/index";

interface Props {
  id: string;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  price: number;
  checkInDate: Moment;
  checkOutDate: Moment;
  clearBookingData: () => void;
  handleListingRefetch: () => Promise<void>;
}

const { Title, Text, Paragraph } = Typography;

export const ListingCreateBookingModal: React.FC<Props> = ({
  id,
  modalVisible,
  setModalVisible,
  price,
  checkInDate,
  checkOutDate,
  clearBookingData,
  handleListingRefetch,
}) => {
  // const [createBooking, { loading }] = useMutation<
  //   CreateBookingData,
  //   CreateBookingVariables
  // >(CREATE_BOOKING, {
  //   onCompleted: () => {
  //     clearBookingData();
  //     displaySuccessNotification(
  //       "You've succesfully booked the listing!",
  //       "Booking history can always be found in your User page."
  //     );
  //     handleListingRefetch();
  //   },
  //   onError: () => {
  //     displayErrorMessage(
  //       "Sorry! We were'nt able to successfully book the listing. Please try again later."
  //     );
  //   }
  // });

  const daysBooked = checkOutDate.diff(checkInDate, "days") + 1;
  const listingPrice = daysBooked * price;

  const handleCreateBooking = async () => {
    // if (!stripe) {
    //   return displayErrorMessage(
    //     "Sorry! We weren't able to connect with Stripe."
    //   );
    // }
    // const { token, error } = await stripe.createToken();
    // if (token) {
    //   createBooking({
    //     variables: {
    //       input: {
    //         source: token.id,
    //         checkIn: checkInDate.format("YYYY-MM-DD"),
    //         checkOut: checkOutDate.format("YYYY-MM-DD"),
    //         id
    //       }
    //     }
    //   });
    // } else {
    //   return displayErrorMessage(
    //     error && error.message
    //       ? error.message
    //       : "Sorry! We weren't able to book the listing. Please try again later."
    //   );
    // }
  };

  return (
    <Modal
      visible={modalVisible}
      centered
      footer={null}
      onCancel={() => setModalVisible(false)}
    >
      <div className="listing-booking-modal">
        <div className="listing-booking-modal__intro">
          <Title className="listing-booking-modal__intro-title">
            <KeyOutlined />
          </Title>
          <Title className="listing-booking-modal__intro-title" level={3}>
            Book your trip
          </Title>
          <Paragraph>
            Enter your payment information to book the listing between{" "}
            <Text strong mark>
              {checkInDate.format("MMMM Do YYYY")}
            </Text>{" "}
            and{" "}
            <Text strong mark>
              {checkOutDate.format("MMMM Do YYYY")}
            </Text>
            , inclusive.
          </Paragraph>
        </div>
        <Divider />

        <div className="listing-booking-modal__charge-summary">
          <Paragraph>
            {formatListingPrice(price, false)} * {daysBooked} days ={" "}
            <Text strong>{formatListingPrice(listingPrice, false)}</Text>
          </Paragraph>

          <Paragraph className="listing-booking-modal__charge-summary-total">
            Total ={" "}
            <Text strong mark>
              {formatListingPrice(listingPrice, false)}
            </Text>
          </Paragraph>
        </div>
        <Divider />
        <div className="listing-booking-modal__stripe-card-section">
          {/* <CardElement
            hidePostalCode
            className="listing-booking-modal__stripe-card"
          /> */}
          <Button
            size="large"
            type="primary"
            className="listing-booking-modal__cta"
            onClick={handleCreateBooking}
            loading={true}
          >
            Book
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export const WrappedListingCreateBookingModal = ListingCreateBookingModal;
