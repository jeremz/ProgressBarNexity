import request from 'axios'

const updateRequest = () => {
  return new Promise(function(resolve, reject) {
     request
       .get(`http://www.mocky.io/v2/5cac9037300000664f1036f8`)
       .then((response) => {
          resolve(response.data)
      })
  })

}
export default updateRequest