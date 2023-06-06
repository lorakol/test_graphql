//const users = []; // Dummy users data
const users = [
  { id: "1", firstName: 'Tom', lastName: 'Coleman' , email : 'test1@example.com' , companyName : 'MS'},
  { id: "2", firstName: 'Sashko', lastName: 'Stubailo', email : 'test2@example.com' , companyName : 'SONY' },
  { id: "3", firstName: 'Mikhail', lastName: 'Smith', email : 'test3@example.com' , companyName : 'TIMY' },
  { id: "4", firstName: 'John', lastName: 'Drump', email : 'test4@example.com' , companyName : 'CHAN' },
  { id: "5", firstName: 'Jon', lastName: 'Bush', email : 'test5@example.com' , companyName : 'WAN' },
  { id: "6", firstName: 'George', lastName: 'Chlinton', email : 'test6@example.com' , companyName : 'BENSE' },
  { id: "7", firstName: 'Niki', lastName: 'Deny', email : 'test7@example.com' , companyName : 'BIDU' },
  { id: "8", firstName: 'Beln', lastName: 'Jack', email : 'test8@example.com' , companyName : 'ADWA' },
  { id: "9", firstName: 'Maya', lastName: 'Washon', email : 'test9@example.com' , companyName : 'AUDI' },
  { id: "10", firstName: 'Jeke', lastName: 'Yeke', email : 'test10@example.com' , companyName : 'TOSHIBA' }
]
//add JWT token middleware
// const dotenv = require('dotenv');
// const jwt = require('jsonwebtoken');
// dotenv.config();

function generateAccessToken() {
  return "Test TOken" ;//jwt.sign("test_token", process.env.TOKEN_SECRET);
}


const getUserAsync = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.id === id);
    if (user) {
      resolve(user);
    }
    else {
      reject(new Error('User not found'));
    }
  })
}

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      
      return await getUserAsync(id);
    },
    //getUser: (_, { kid }) => users.find(({ id }) => kid == id), //users.find(user => user.id === id),
    getUsers: () => users,
    getToken: () => generateAccessToken(),
  },
  Mutation: {
    upsertUser: (_, { input }) => {
      const index = users.findIndex(user => user.id === input.id);
      if (index !== -1) {
        users[index] = input;
        return input;
      } else {
        users.push(input);
        return input;
      }
    },
    deleteUser: (_, { id }) => {
      const index = users.findIndex(user => user.id === id);
      if (index !== -1) {
        users.splice(index, 1);
        return id;
      } else {
        throw new Error('User not found');
      }
    },
  },
};

module.exports = resolvers;