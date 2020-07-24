import { Avatar, Button, Card, Divider, Typography } from "antd";
import React from "react";
import { GetUserQuery } from "../../../../../graphql/generated";
import { useAuth } from "../../../../providers/components/AuthProvider/index";

interface Props {
  user: GetUserQuery["getUser"];
}

const { Paragraph, Text, Title } = Typography;
const UserProfile: React.FC<Props> = ({ user }) => {
  const { authState } = useAuth();

  const isAuthenticatedUser = authState.id === user!._id;
  const additionalDetailsElement = isAuthenticatedUser && (
    <>
      <Divider />
      <div className="user-profile__details">
        <Title level={4}>Additional Details</Title>
        <Paragraph>
          Interested in becoming a tinyhouse host? Register with your Stripe
          Account!
        </Paragraph>
        <Button type="primary" className="user-profile__details-cta">
          Connect with Stripe
        </Button>
        <Paragraph type="secondary">
          Tinyhouse uses <a href="/">Stripe</a> to help transfer your earnings
          in a secure and truster manner!
        </Paragraph>
      </div>
    </>
  );

  return (
    <div className="user-profile">
      <Card className="user-profile__card">
        <div className="user-profile__avatar">
          <Avatar size={100} src={user!.avatar} />
        </div>
        <Divider />
        <div className="user-profile__details">
          <Title level={4}>Details</Title>
          <Paragraph>
            Name: <Text strong>{user!.name}</Text>
          </Paragraph>
          <Paragraph>
            contact: <Text strong>{user!.contact}</Text>
          </Paragraph>
        </div>
        {additionalDetailsElement}
      </Card>
    </div>
  );
};

export default UserProfile;
