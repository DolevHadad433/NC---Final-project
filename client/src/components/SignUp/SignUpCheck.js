export async function signup({ username, password, phoneNumber }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        username.length > 2 &&
        username.length < 10 &&
        password.length > 2 &&
        password.length <= 10 &&
        phoneNumber[0] === "0" &&
        phoneNumber.length === 10
      ) {
        console.log("good");
        console.log({ username, password, phoneNumber });
        resolve();
      } else {
        console.log({ username, password, phoneNumber });
        reject();
      }
    }, 1000);
  });
}
