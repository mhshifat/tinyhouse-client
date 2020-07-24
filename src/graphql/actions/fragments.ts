import gql from "graphql-tag";

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    _id
    name
    avatar
    contact
    hasWallet
    income
  }
`;

export const BOOKING_FRAGMENT = gql`
  fragment BookingFragment on Booking {
    _id
    checkIn
    checkOut
  }
`;

export const LISTING_FRAGMENT = gql`
  fragment ListingFragment on Listing {
    _id
    title
    description
    image
    type
    address
    country
    admin
    admin
    city
    bookingIndex
    price
    numOfGuests
  }
`;
