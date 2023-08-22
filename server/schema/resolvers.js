const { UserList, MovieList } = require("../fake-data");
const lodash = require("lodash");

const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      args.id = parseInt(args.id);
      const user = lodash.find(UserList, { id: Number(args.id) });
      return user;
    },
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = lodash.find(MovieList, { name: name });
      return movie;
    },
  },
  User: {
    favoriteMovies: () => {
      return lodash.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication > 2000 && movie.yearOfPublication < 2010
      );
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;

      user.id = lastId + 1;

      UserList.push(user);

      return user;
    },
    updateUsername: (parent, args) => {
        const { id, newUsername } = args.input;
        let userUpdated;
        UserList.forEach((user) => {
          if (user.id === Number(id)) {
            user.username = newUsername;
            userUpdated = user;
          }
        });
  
        return userUpdated;
    },
    deleteUser: (parent, args) => {
        const id  = args.id;
        lodash.remove(UserList, (user) => user.id === Number(id));

        return null;
    }
  },
};

module.exports = {
  resolvers,
};
