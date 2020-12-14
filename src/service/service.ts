import request from './api'

const getAddress = (postcode:string) => {
  return request({
    url: `${postcode}?api-key=QWwdE_JzM0SlczMl5s_ziA29535`,
    method: 'GET'
  });
}

const Service = {
  getAddress,
}

export default Service;