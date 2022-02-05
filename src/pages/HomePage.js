import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";

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
    case "USERS_FAIL":
      return { ...state, loadingUsers: false, errorUsers: action.payload };
    default:
      return state;
  }
};

const HomePage = () => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    posts: [],
    loadingUsers: false,
    errorUsers: "",
    users: [],
  });

  const { loading, error, posts, loadingUsers, errorUsers, users } = state;

  const loadPosts = async () => {
    dispatch({ type: "POST_REQUEST" });
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      dispatch({ type: "POST_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "POST_FAIL", payload: error.message });
    }
  };

  const loadUsers = async () => {
    dispatch({ type: "USERS_REQUEST" });
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      console.log(data);
      dispatch({ type: "USERS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "USERS_FAIL", payload: error.message });
    }
  };

  useEffect(() => {
    loadPosts();
    loadUsers();
  }, []);
  return (
    <div className='blog'>
      <div className='content'>
        <h1>Posts</h1>
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
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <p>{user.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
