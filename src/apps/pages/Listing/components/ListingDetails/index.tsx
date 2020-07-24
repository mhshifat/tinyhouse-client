import { EnvironmentOutlined } from "@ant-design/icons";
import { Avatar, Divider, Tag, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Listing } from "../../../../../graphql/generated";

interface Props {
  listing: Listing;
}

const { Title, Paragraph } = Typography;
const ListingDetails: React.FC<Props> = ({ listing }) => {
  return (
    <div className="listing-details">
      <div
        className="listing-details__image"
        style={{ background: `url("${listing.image}")` }}
      />
      <div className="listing-details__information">
        <Paragraph
          ellipsis
          className="listing-details__city-address"
          type="secondary"
        >
          <Link to={`/listings/${listing.city}`}>
            <EnvironmentOutlined /> {listing.city}
          </Link>
          <Divider type="vertical" />
          {listing.address}
        </Paragraph>
        <Title level={3} className="listing-details__title">
          {listing.title}
        </Title>
      </div>

      <Divider />

      <div className="listing-details__section">
        <Link to={`/user/${listing.host._id}`}>
          <Avatar src={listing.host.avatar} size={64} />
          <Title level={2} className="listing-details__host-name">
            {listing.host.name}
          </Title>
        </Link>
      </div>

      <Divider />

      <div className="listing-details__section">
        <Title level={4}>About this space</Title>
        <div className="listing-details__about-items">
          <Tag color="magenta">{listing.type}</Tag>
          <Tag color="magenta">{listing.numOfGuests} Guests</Tag>
        </div>
        <Paragraph
          ellipsis={{
            rows: 3,
            expandable: true,
          }}
        >
          {listing.description}
        </Paragraph>
      </div>
    </div>
  );
};

export default ListingDetails;
