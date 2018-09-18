import axios from "axios";

const BaseURI = "https://news-summary-ziweigamepoch.c9users.io";

class Api {
  static getusercumulate = dateArray =>
    axios
      .get(
        `${BaseURI}/api/wechat/gamepoch/getusercumulate?startDate=${
          dateArray[0]
        }&endDate=${[...dateArray].pop()}`
      )
      .then(res => res.data)
      .catch(e => {
        throw e;
      });

  static getusersummary = dateArray =>
    axios
      .get(
        `${BaseURI}/api/wechat/gamepoch/getusersummary?startDate=${
          dateArray[0]
        }&endDate=${[...dateArray].pop()}`
      )
      .then(res => res.data)
      .catch(e => {
        throw e;
      });

  static getuserread = dateArray =>
    axios
      .get(
        `${BaseURI}/api/wechat/gamepoch/getuserread?startDate=${
          dateArray[0]
        }&endDate=${[...dateArray].pop()}`
      )
      .then(res => res.data)
      .catch(e => {
        throw e;
      });

  static getarticletotal = dateArray =>
    axios
      .get(
        `${BaseURI}/api/wechat/gamepoch/getarticletotal?startDate=${
          dateArray[0]
        }&endDate=${[...dateArray].pop()}`
      )
      .then(res => res.data)
      .catch(e => {
        throw e;
      });
}

export default Api;
