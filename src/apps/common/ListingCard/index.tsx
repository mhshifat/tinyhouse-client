import { UserOutlined } from "@ant-design/icons";
import { Card, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Listing } from "../../../graphql/generated";
import { formatListingPrice } from "../../../lib/utils/index";

interface Props {
  listing: Listing;
}

const { Text, Title } = Typography;
const ListingCard: React.FC<Props> = ({ listing }) => {
  return (
    <Link to={`/listing/${listing._id}`}>
      <Card
        hoverable
        cover={
          <div
            className="listing-card__cover-img"
            style={{ background: `url(${listing.image})` }}
          />
        }
      >
        <div className="listing-card__details">
          <div className="listing-card__description">
            <Title level={4} className="listing-card__price">
              ${formatListingPrice(listing.price)}
              <span>/day</span>
            </Title>
            <Text strong ellipsis className="listing-card__title">
              {listing.title}
            </Text>
            <Text ellipsis className="listing-card__address">
              {listing.address}
            </Text>
          </div>
          <div className="listing-card__dimensions listing-card__dimensions--guests">
            <UserOutlined /> <Text>{listing.numOfGuests} guests</Text>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ListingCard;
