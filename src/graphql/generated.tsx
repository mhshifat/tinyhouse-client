import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AppInfo = {
  __typename?: 'AppInfo';
  api: Scalars['String'];
  version: Scalars['String'];
};

export type Booking = {
  __typename?: 'Booking';
  _id: Scalars['ID'];
  checkIn: Scalars['String'];
  checkOut: Scalars['String'];
  tenant: User;
  listing: Listing;
};

export type BookingsObj = {
  __typename?: 'BookingsObj';
  total: Scalars['Int'];
  result: Array<Booking>;
};

export enum FilterListingEnum {
  PriceLowToHigh = 'PRICE_LOW_TO_HIGH',
  PriceHighToLow = 'PRICE_HIGH_TO_LOW'
}

export type Listing = {
  __typename?: 'Listing';
  _id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  host: User;
  type: ListingType;
  address: Scalars['String'];
  country: Scalars['String'];
  admin: Scalars['String'];
  city: Scalars['String'];
  bookings: BookingsObj;
  bookingIndex: Scalars['String'];
  price: Scalars['Int'];
  numOfGuests: Scalars['Int'];
};


export type ListingBookingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type ListingsObj = {
  __typename?: 'ListingsObj';
  total: Scalars['Int'];
  result: Array<Listing>;
};

export enum ListingType {
  Apartment = 'APARTMENT',
  House = 'HOUSE'
}

export type LoginWithGoogleInput = {
  contact?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<User>;
  logout: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  input: LoginWithGoogleInput;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  getUser?: Maybe<User>;
  getBookings: BookingsObj;
  appInfo: AppInfo;
  getListing?: Maybe<Listing>;
  getListings: ListingsObj;
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};


export type QueryGetBookingsArgs = {
  limit: Scalars['Int'];
  page?: Maybe<Scalars['Int']>;
};


export type QueryGetListingArgs = {
  id: Scalars['ID'];
};


export type QueryGetListingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
  filterListing: FilterListingEnum;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  name: Scalars['String'];
  avatar: Scalars['String'];
  contact: Scalars['String'];
  hasWallet: Scalars['Boolean'];
  income?: Maybe<Scalars['Int']>;
  bookings?: Maybe<BookingsObj>;
  listings?: Maybe<ListingsObj>;
};


export type UserBookingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type UserListingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'name' | 'avatar' | 'contact' | 'hasWallet' | 'income'>
);

export type BookingFragmentFragment = (
  { __typename?: 'Booking' }
  & Pick<Booking, '_id' | 'checkIn' | 'checkOut'>
);

export type ListingFragmentFragment = (
  { __typename?: 'Listing' }
  & Pick<Listing, '_id' | 'title' | 'description' | 'image' | 'type' | 'address' | 'country' | 'admin' | 'city' | 'bookingIndex' | 'price' | 'numOfGuests'>
);

export type LoginMutationVariables = Exact<{
  input: LoginWithGoogleInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID'];
  bookingsLimit: Scalars['Int'];
  bookingsPage: Scalars['Int'];
  listingsLimit: Scalars['Int'];
  listingsPage: Scalars['Int'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser?: Maybe<(
    { __typename?: 'User' }
    & { bookings?: Maybe<(
      { __typename?: 'BookingsObj' }
      & Pick<BookingsObj, 'total'>
      & { result: Array<(
        { __typename?: 'Booking' }
        & BookingFragmentFragment
      )> }
    )>, listings?: Maybe<(
      { __typename?: 'ListingsObj' }
      & Pick<ListingsObj, 'total'>
      & { result: Array<(
        { __typename?: 'Listing' }
        & ListingFragmentFragment
      )> }
    )> }
    & UserFragmentFragment
  )> }
);

export type GetListingQueryVariables = Exact<{
  id: Scalars['ID'];
  limit: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type GetListingQuery = (
  { __typename?: 'Query' }
  & { getListing?: Maybe<(
    { __typename?: 'Listing' }
    & { host: (
      { __typename?: 'User' }
      & UserFragmentFragment
    ), bookings: (
      { __typename?: 'BookingsObj' }
      & Pick<BookingsObj, 'total'>
      & { result: Array<(
        { __typename?: 'Booking' }
        & BookingFragmentFragment
      )> }
    ) }
    & ListingFragmentFragment
  )> }
);

export type GetListingsQueryVariables = Exact<{
  filterListing: FilterListingEnum;
  limit: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type GetListingsQuery = (
  { __typename?: 'Query' }
  & { getListings: (
    { __typename?: 'ListingsObj' }
    & Pick<ListingsObj, 'total'>
    & { result: Array<(
      { __typename?: 'Listing' }
      & ListingFragmentFragment
    )> }
  ) }
);

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  _id
  name
  avatar
  contact
  hasWallet
  income
}
    `;
export const BookingFragmentFragmentDoc = gql`
    fragment BookingFragment on Booking {
  _id
  checkIn
  checkOut
}
    `;
export const ListingFragmentFragmentDoc = gql`
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
export const LoginDocument = gql`
    mutation Login($input: LoginWithGoogleInput!) {
  login(input: $input) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    
export type LoginProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>
    } & TChildProps;
export function withLogin<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps, TDataName>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;
export type LogoutComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LogoutMutation, LogoutMutationVariables>, 'mutation'>;

    export const LogoutComponent = (props: LogoutComponentProps) => (
      <ApolloReactComponents.Mutation<LogoutMutation, LogoutMutationVariables> mutation={LogoutDocument} {...props} />
    );
    
export type LogoutProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>
    } & TChildProps;
export function withLogout<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LogoutMutation,
  LogoutMutationVariables,
  LogoutProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, LogoutMutation, LogoutMutationVariables, LogoutProps<TChildProps, TDataName>>(LogoutDocument, {
      alias: 'logout',
      ...operationOptions
    });
};

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const GetMeDocument = gql`
    query GetMe {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export type GetMeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMeQuery, GetMeQueryVariables>, 'query'>;

    export const GetMeComponent = (props: GetMeComponentProps) => (
      <ApolloReactComponents.Query<GetMeQuery, GetMeQueryVariables> query={GetMeDocument} {...props} />
    );
    
export type GetMeProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetMeQuery, GetMeQueryVariables>
    } & TChildProps;
export function withGetMe<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetMeQuery,
  GetMeQueryVariables,
  GetMeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetMeQuery, GetMeQueryVariables, GetMeProps<TChildProps, TDataName>>(GetMeDocument, {
      alias: 'getMe',
      ...operationOptions
    });
};

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, baseOptions);
      }
export function useGetMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, baseOptions);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = ApolloReactCommon.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: ID!, $bookingsLimit: Int!, $bookingsPage: Int!, $listingsLimit: Int!, $listingsPage: Int!) {
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
    ${UserFragmentFragmentDoc}
${BookingFragmentFragmentDoc}
${ListingFragmentFragmentDoc}`;
export type GetUserComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUserQuery, GetUserQueryVariables>, 'query'> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetUserComponent = (props: GetUserComponentProps) => (
      <ApolloReactComponents.Query<GetUserQuery, GetUserQueryVariables> query={GetUserDocument} {...props} />
    );
    
export type GetUserProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetUserQuery, GetUserQueryVariables>
    } & TChildProps;
export function withGetUser<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUserQuery,
  GetUserQueryVariables,
  GetUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetUserQuery, GetUserQueryVariables, GetUserProps<TChildProps, TDataName>>(GetUserDocument, {
      alias: 'getUser',
      ...operationOptions
    });
};

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *      bookingsLimit: // value for 'bookingsLimit'
 *      bookingsPage: // value for 'bookingsPage'
 *      listingsLimit: // value for 'listingsLimit'
 *      listingsPage: // value for 'listingsPage'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetListingDocument = gql`
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
    ${ListingFragmentFragmentDoc}
${UserFragmentFragmentDoc}
${BookingFragmentFragmentDoc}`;
export type GetListingComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetListingQuery, GetListingQueryVariables>, 'query'> & ({ variables: GetListingQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetListingComponent = (props: GetListingComponentProps) => (
      <ApolloReactComponents.Query<GetListingQuery, GetListingQueryVariables> query={GetListingDocument} {...props} />
    );
    
export type GetListingProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetListingQuery, GetListingQueryVariables>
    } & TChildProps;
export function withGetListing<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetListingQuery,
  GetListingQueryVariables,
  GetListingProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetListingQuery, GetListingQueryVariables, GetListingProps<TChildProps, TDataName>>(GetListingDocument, {
      alias: 'getListing',
      ...operationOptions
    });
};

/**
 * __useGetListingQuery__
 *
 * To run a query within a React component, call `useGetListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListingQuery({
 *   variables: {
 *      id: // value for 'id'
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetListingQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetListingQuery, GetListingQueryVariables>) {
        return ApolloReactHooks.useQuery<GetListingQuery, GetListingQueryVariables>(GetListingDocument, baseOptions);
      }
export function useGetListingLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetListingQuery, GetListingQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetListingQuery, GetListingQueryVariables>(GetListingDocument, baseOptions);
        }
export type GetListingQueryHookResult = ReturnType<typeof useGetListingQuery>;
export type GetListingLazyQueryHookResult = ReturnType<typeof useGetListingLazyQuery>;
export type GetListingQueryResult = ApolloReactCommon.QueryResult<GetListingQuery, GetListingQueryVariables>;
export const GetListingsDocument = gql`
    query GetListings($filterListing: FilterListingEnum!, $limit: Int!, $page: Int!) {
  getListings(limit: $limit, page: $page, filterListing: $filterListing) {
    total
    result {
      ...ListingFragment
    }
  }
}
    ${ListingFragmentFragmentDoc}`;
export type GetListingsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetListingsQuery, GetListingsQueryVariables>, 'query'> & ({ variables: GetListingsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetListingsComponent = (props: GetListingsComponentProps) => (
      <ApolloReactComponents.Query<GetListingsQuery, GetListingsQueryVariables> query={GetListingsDocument} {...props} />
    );
    
export type GetListingsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetListingsQuery, GetListingsQueryVariables>
    } & TChildProps;
export function withGetListings<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetListingsQuery,
  GetListingsQueryVariables,
  GetListingsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetListingsQuery, GetListingsQueryVariables, GetListingsProps<TChildProps, TDataName>>(GetListingsDocument, {
      alias: 'getListings',
      ...operationOptions
    });
};

/**
 * __useGetListingsQuery__
 *
 * To run a query within a React component, call `useGetListingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListingsQuery({
 *   variables: {
 *      filterListing: // value for 'filterListing'
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetListingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetListingsQuery, GetListingsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetListingsQuery, GetListingsQueryVariables>(GetListingsDocument, baseOptions);
      }
export function useGetListingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetListingsQuery, GetListingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetListingsQuery, GetListingsQueryVariables>(GetListingsDocument, baseOptions);
        }
export type GetListingsQueryHookResult = ReturnType<typeof useGetListingsQuery>;
export type GetListingsLazyQueryHookResult = ReturnType<typeof useGetListingsLazyQuery>;
export type GetListingsQueryResult = ApolloReactCommon.QueryResult<GetListingsQuery, GetListingsQueryVariables>;