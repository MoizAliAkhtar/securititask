import {
  usersData,
  loginData,
  queryData,
  responseTimeData,
  firewallData,
} from "../data/mockdata";

// Simulate network delay
function simulateDelay(data, fail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) {
        reject("Network Error");
      } else {
        resolve(data);
      }
    }, 1000);
  });
}

// Fake API
export const fetchDashboardData = () => {
  return Promise.all([
    simulateDelay(usersData),
    simulateDelay(loginData),
    simulateDelay(queryData),
    simulateDelay(responseTimeData),
    simulateDelay(firewallData),
  ]).then(
    ([users, logins, queries, response, firewall]) => ({
      users,
      logins,
      queries,
      response,
      firewall,
    })
  );
};
