
const axios = require('axios').default;

const url = process.env.ELASTIC_NODE_URL

exports.post = () => axios.get('http://localhost:3000/docs?ID=12345')
.then(function (response) {
  // handle success
  console.log(response.data);
})
.catch(function (error) {
  // handle error
  console.log(error);
})
.then(function () {
  // always executed
});