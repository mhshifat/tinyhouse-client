import { Col, Layout, Row, Typography } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  FilterListingEnum,
  Listing,
  useGetListingsQuery,
} from "../../../graphql/generated";
import { displayErrorMessage } from "../../../lib/utils/index";
import { useScrollToTop } from "../../common/hooks/useScrollToTop/index";
import { HomeHero } from "./components/HomeHero/index";
import { HomeListings } from "./components/HomeListings/index";
import { HomeListingsSkeleton } from "./components/HomeListingSkeleton/index";

const { Content } = Layout;
const { Paragraph, Title } = Typography;

const PAGE_LIMIT = 4;
const PAGE_NUMBER = 1;

const Home = () => {
  const { loading, data } = useGetListingsQuery({
    variables: {
      filterListing: FilterListingEnum.PriceHighToLow,
      limit: PAGE_LIMIT,
      page: PAGE_NUMBER,
    },
    fetchPolicy: "cache-and-network",
  });
  const history = useHistory();
  useScrollToTop();

  const onSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      history.push(`/listings/${trimmedValue}`);
    } else {
      displayErrorMessage("Please enter a valid search!");
    }
  };

  const renderListingsSection = () => {
    if (loading) {
      return <HomeListingsSkeleton />;
    }
    if (data) {
      return (
        <HomeListings
          title="Premium Listings"
          listings={data.getListings.result as Listing[]}
        />
      );
    }
    return null;
  };

  return (
    <Content
      className="home"
      style={{
        backgroundImage: 'url("/images/map-background.jpg")',
      }}
    >
      <HomeHero onSearch={onSearch} />

      <div className="home__cta-section">
        <Title level={2} className="home__cta-section-title">
          Your guide for all things rental
        </Title>
        <Paragraph>
          Helping you make the best decisions in renting your last minute
          locations.
        </Paragraph>
        <Link
          to="/listings"
          className="ant-btn ant-btn-primary ant-btn-large home__cta-section-button"
        >
          All listings
        </Link>
      </div>

      {renderListingsSection()}

      <div className="home__listings">
        <Title level={4} className="home__listings-title">
          Listings of any kind
        </Title>
        <Row gutter={12}>
          <Col xs={24} lg={12} style={{ marginBottom: 12 }}>
            <Link to="/listings/san%20fransisco">
              <div className="home__listings-img-cover">
                <img
                  src="/images/san-fransisco.jpg"
                  alt="San Fransisco"
                  className="home__listings-img"
                  loading="lazy"
                />
              </div>
            </Link>
          </Col>
          <Col xs={24} lg={12} style={{ marginBottom: 12 }}>
            <Link to="/listings/cancún">
              <div className="home__listings-img-cover">
                <img
                  src="/images/cancun.jpg"
                  alt="Cancún"
                  className="home__listings-img"
                  loading="lazy"
                />
              </div>
            </Link>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default Home;
