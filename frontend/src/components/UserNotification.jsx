import { useSubscription } from "@apollo/client/react";
import { USER_CREATED } from "../graphql/subscriptions";

const UserNotification = () => {
  const { data } = useSubscription(USER_CREATED);

  if (!data) {
    return (
      <div className="notification-bar muted">
        Subscription connected. Waiting for new users.
      </div>
    );
  }

  return (
    <div className="notification-bar">
      New user created: <strong>{data.userCreated.name}</strong>
    </div>
  );
};

export default UserNotification;
