import { Affix, Layout, List, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FilterListingEnum,
  Listing,
  useGetListingsQuery,
} from "../../../graphql/generated";
import ErrorBanner from "../../common/ErrorBanner";
import { useScrollToTop } from "../../common/hooks/useScrollToTop/index";
import ListingCard from "../../common/ListingCard";
import ListingsFilters from "./components/ListingFilters";
import ListingsPagination from "./components/ListingsPagination";
import ListingsSkeleton from "./components/ListingsSkeleton";

interface MatchParams {
  location: string;
}

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const PAGE_LIMIT = 8;

const Listings = () => {
  const { location } = useParams<MatchParams>();
  const locationRef = useRef(location);
  const [filter, setFilter] = useState<FilterListingEnum>(
    FilterListingEnum.PriceLowToHigh
  );
  const [page, setPage] = useState(1);

  const { loading, data, error } = useGetListingsQuery({
    variables: {
      filterListing: filter,
      limit: PAGE_LIMIT,
      page,
    },
    skip: locationRef.current !== location && page !== 1, // check lesson 57
  });

  useScrollToTop();

  useEffect(() => {
    setPage(1);
    locationRef.current = location;
  }, [location]);

  if (loading) {
    return (
      <Content className="listings">
        <ListingsSkeleton />
      </Content>
    );
  }

  if (error) {
    return (
      <Content className="listings">
        <ErrorBanner description="We either couldn't find anything matching your search or we've encountered an error. If you're searching for a unique location, try searching again with more common keywords." />
        <ListingsSkeleton />
      </Content>
    );
  }

  const listings = data ? data.getListings : null;

  const listingsSectionElement =
    listings && listings.result.length > 0 ? (
      <div>
        <Affix offsetTop={64}>
          <>
            <ListingsPagination
              limit={PAGE_LIMIT}
              total={listings.total}
              page={page}
              setPage={setPage}
            />
            <ListingsFilters filter={filter} setFilter={setFilter} />
          </>
        </Affix>

        <List
          grid={{
            gutter: 8,
            lg: 4,
            sm: 2,
            xs: 1,
          }}
          dataSource={listings.result}
          renderItem={(item) => (
            <List.Item>
              <ListingCard listing={item as Listing} />
            </List.Item>
          )}
        />
      </div>
    ) : (
      <div>
        <Paragraph>
          It appears that no listings have been created for{" "}
          <Text mark>{location}</Text>
        </Paragraph>
        <Paragraph>
          Be the first person to create a{" "}
          <Link to="/host">listing in this area!</Link>
        </Paragraph>
      </div>
    );

  const listingsRegionElement = location ? (
    <Title level={3} className="listings__title">
      Results for "{location}"
    </Title>
  ) : null;

  return (
    <Content className="listings">
      {listingsRegionElement}
      {listingsSectionElement}
    </Content>
  );
};

export default Listings;
