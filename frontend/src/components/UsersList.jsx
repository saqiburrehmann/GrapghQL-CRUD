import { useQuery } from "@apollo/client/react";
import { GET_USERS } from "../graphql/queries";

const UsersList = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  return (
    <div className="users-list">
      <div className="panel-heading">
        <h2>Users</h2>
        <p>All users fetched from Apollo Client query.</p>
      </div>

      {loading ? <p className="status-text">Loading users...</p> : null}
      {error ? <p className="status-text error-text">Error: {error.message}</p> : null}

      {!loading && !error && data?.getUsers?.length === 0 ? (
        <p className="status-text">No users available yet. Create your first user.</p>
      ) : null}

      {!loading && !error ? (
        <div className="users-scroll">
          <div className="users-grid">
            {data.getUsers.map((user) => (
              <article className="user-card" key={user.id}>
                <div className="user-avatar-wrap">
                  {user.profileImage ? (
                    <img className="user-avatar" src={user.profileImage} alt={user.name} />
                  ) : (
                    <div className="user-avatar placeholder">
                      {user.name.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="user-meta">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <span>{user.age} years old</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UsersList;
