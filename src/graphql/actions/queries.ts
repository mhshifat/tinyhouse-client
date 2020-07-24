import gql from "graphql-tag";
import { BOOKING_FRAGMENT, LISTING_FRAGMENT, USER_FRAGMENT } from "./fragments";

export const GET_ME = gql`
  query GetMe {
    me {
      ...UserFragment
    }
  }

  ${USER_FRAGMENT}
`;

export const GET_USER = gql`
  query GetUser(
    $id: ID!
    $bookingsLimit: Int!
    $bookingsPage: Int!
    $listingsLimit: Int!
    $listingsPage: Int!
  ) {
    getUser(id: $id) {
      ...UserFragment
      bookings(limit: $bookingsLimit, page: $bookingsPage) {
        total
        result {
          ...BookingFragment
        }
      }
      listings(limit: $listingsLimit, page: $listingsPage) {
        total
        result {
          ...ListingFragment
        }
      }
    }
  }

  ${USER_FRAGMENT}
  ${BOOKING_FRAGMENT}
  ${LISTING_FRAGMENT}
`;

export const GET_LISTING = gql`
  query GetListing($id: ID!, $limit: Int!, $page: Int!) {
    getListing(id: $id) {
      ...ListingFragment
      host {
        ...UserFragment
      }
      bookings(limit: $limit, page: $page) {
        total
        result {
          ...BookingFragment
        }
      }
    }
  }

  ${USER_FRAGMENT}
  ${BOOKING_FRAGMENT}
  ${LISTING_FRAGMENT}
`;

export const GET_LISTINGS = gql`
  query GetListings(
    $filterListing: FilterListingEnum!
    $limit: Int!
    $page: Int!
  ) {
    getListings(limit: $limit, page: $page, filterListing: $filterListing) {
      total
      result {
        ...ListingFragment
      }
    }
  }

  ${LISTING_FRAGMENT}
`;
