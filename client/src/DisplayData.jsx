import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
        id
        name
        age
        username
        nationality
    }
  }
`;

export const DisplayData = () => {
  //GET ALL USERS
  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
  //GET ALL MOVIES
  const { data: dataMovies } = useQuery(QUERY_ALL_MOVIES);
  // USE MUTATION HOOK
  const [createUser] = useMutation(CREATE_USER);

  const [movieSearched, setMovieSearched] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  const [fetchMovie, { data: movieFetched, error }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  return (
    <>
      <div className="container">
        <div className="input-group mb-2 mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="input-group mb-2 mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="input-group mb-2 mt-4">
          <input
            type="number"
            className="form-control"
            placeholder="Age"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>

        <div className="input-group mb-2 mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Nationality"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              setNationality(e.target.value.toUpperCase());
            }}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary mt-5 mb-3"
          onClick={() => {
            createUser({
              variables: { input: { name, username, age: Number(age), nationality } },
            });
            refetch();
          }}
        >
          Create User
        </button>
        <h1> USUARIOS </h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">UserName</th>
              <th scope="col">Age</th>
            </tr>
          </thead>
          {data &&
            data.users.map((user) => (
              <tbody>
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.age}</td>
                </tr>
              </tbody>
            ))}
        </table>

        <h1 style={{ paddingTop: "2%" }}> MOVIES </h1>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Year</th>
            </tr>
          </thead>
          {dataMovies &&
            dataMovies.movies.map((movies) => (
              <tbody>
                <tr key={movies.id}>
                  <th scope="row">{movies.id}</th>
                  <td>{movies.name}</td>
                  <td>{movies.yearOfPublication}</td>
                </tr>
              </tbody>
            ))}
        </table>

        <div>
          <input
            type="text"
            placeholder="Los Vergadores"
            onChange={(e) => {
              setMovieSearched(e.target.value);
            }}
          />
          <button
            onClick={() => {
              fetchMovie({
                variables: {
                  name: movieSearched,
                },
              });
            }}
            type="button"
            className="btn btn-primary"
          >
            Fetch Data
          </button>
          <div>
            {" "}
            {movieFetched && <h1>{movieFetched.movie.name}</h1>}
            {movieFetched && <h1>{movieFetched.movie.yearOfPublication}</h1>}
          </div>
        </div>
      </div>
    </>
  );
};
