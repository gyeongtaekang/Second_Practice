export default {
  tryLogin(email, password) {
    return new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(user => user.id === email && user.password === password);

      if (user) {
        localStorage.setItem('01bede4653551df3f6f5e17074771100', user.password);
        resolve(user);
      } else {
        reject('Login failed');
      }
    });
  },

  tryRegister(email, password) {
    return new Promise((resolve, reject) => {
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = users.some(existingUser => existingUser.id === email);

        if (userExists) {
          throw new Error('User already exists');
        }

        const newUser = { id: email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        resolve();
      } catch (err) {
        reject(err.message);
      }
    });
  }
};