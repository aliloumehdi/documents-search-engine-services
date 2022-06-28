
const axios = require('axios').default;
require('dotenv').config();
const url = process.env.ELASTIC_NODE_URL

exports.post = (data) => axios.post(url+'/doc_index4/_doc/?pretty',data)
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