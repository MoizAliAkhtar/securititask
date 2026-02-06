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

export const fetchDashboardData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        users: usersData,
        logins: loginData,
        queries: queryData,
        response: responseTimeData,
        firewall: firewallData,
      });
    }, 500);
  });
};