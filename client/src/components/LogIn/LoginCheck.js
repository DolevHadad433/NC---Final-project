export async function login({ username, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "dolev" && password === "password") {
        console.log("good");
        console.log({ username, password });
        resolve();
      } else {
        console.log({ username, password });
        reject();
      }
    }, 1000);
  });
}
