import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "POST_REQUEST":
      return { ...state, loading: true };
    case "POST_SUCCESS":
      return { ...state, loading: false, posts: action.payload, error: "" };
    case "POST_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "USERS_REQUEST":
      return { ...state, loadingUsers: true };
    case "USERS_SUCCESS":
      return {
        ...state,
        loadingUsers: false,
        users: action.payload,
        errorUsers: "",
      };
    case "USER_SUCCESS":
      return {
        ...state,
        loadingUsers: false,
        user: action.payload,
        errorUsers: "",
      };
    case "USERS_FAIL":
      return { ...state, loadingUsers: false, errorUsers: action.payload };
    default:
      return state;
  }
};

const HomePage = () => {
  const { query, userId } = useParams();
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    posts: [],
    loadingUsers: false,
    errorUsers: "",
    users: [],
    user: {},
  });

  const { loading, error, posts, loadingUsers, errorUsers, users, user } =
    state;

  const loadPosts = async () => {
    dispatch({ type: "POST_REQUEST" });
    try {
      const { data } = await axios.get(
        userId
          ? "https://jsonplaceholder.typicode.com/posts?userId=" + userId
          : "https://jsonplaceholder.typicode.com/posts"
      );
      console.log("userId", userId);
      console.log("query", query);
      const filteredPosts = query
        ? data.filter(
            (x) => x.title.indexOf(query) !== -1 || x.body.indexOf(query) !== -1
          )
        : data;

      console.log("filteredPosts", filteredPosts);

      dispatch({ type: "POST_SUCCESS", payload: filteredPosts });
    } catch (error) {
      dispatch({ type: "POST_FAIL", payload: error.message });
    }
  };

  const loadUsers = async () => {
    dispatch({ type: "USERS_REQUEST" });
    console.log("userId", userId);
    try {
      const { data } = await axios.get(
        userId
          ? "https://jsonplaceholder.typicode.com/users/" + userId
          : "https://jsonplaceholder.typicode.com/users/"
      );
      console.log("users", data);
      dispatch({
        type: userId ? "USER_SUCCESS" : "USERS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({ type: "USERS_FAIL", payload: error.message });
    }
  };

  useEffect(() => {
    loadPosts();
    loadUsers();
  }, [query, userId]);
  return (
    <div className='blog'>
      <div className='content'>
        <h1>
          {query
            ? `Results for "${query}"`
            : userId
            ? `${user.name}'s Posts`
            : "Posts"}
        </h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error{error}</div>
        ) : posts.length === 0 ? (
          <div>No Post Found</div>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}>
                  <h2>{post.title}</h2>
                </Link>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='sidebar'>
        <h2>Author</h2>
        {loadingUsers ? (
          <div>Loading Users...</div>
        ) : error ? (
          <div>Error{errorUsers}</div>
        ) : users.length === 0 ? (
          <div>No Users Found</div>
        ) : userId ? (
          <div>
            <h2>{user.name}'s profile</h2>
            <ul>
              <li>Email:{user.email}</li>
              <li>Phone:{user.phone}</li>
              <li>Website:{user.website}</li>
            </ul>
          </div>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <Link to={`/user/${user.id}`}>
                  <p>{user.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
