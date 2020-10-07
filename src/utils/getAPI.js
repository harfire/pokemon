import axios from 'axios';

export default async function getAPI(method, url, params) {
  const config = {
    url,
    method,
    params
  };

  const result = await axios(config)
    .then((res) => {
      if (res) {
        return res;
      }

      return {};
    })
    .catch((error) => {
      return error;
    });

  return result;
}
