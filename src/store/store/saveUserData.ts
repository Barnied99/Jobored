const saveUserData = (store: any) => (next: any) => (action: any) => {

  switch (action.type) {
    case 'user/logout': {
      const savedStore = localStorage.getItem('store');
      const parsedSavedStore = savedStore ? JSON.parse(savedStore) : {};
      const userData = store.getState();
      parsedSavedStore[userData.user.email] = {
        user: userData.user.email,
        // jobored: userData.jobored
      };


      localStorage.setItem('store', JSON.stringify(parsedSavedStore));
      localStorage.removeItem('currentUser');
      localStorage.removeItem('jobored');

      let result = next(action);

      return result;
    }

    case 'user/login': {
      const savedStore = localStorage.getItem('store');
      const parsedSavedStore = savedStore ? JSON.parse(savedStore) : {};
      const userData = parsedSavedStore[action.payload.email];
      // const jobored = JSON.stringify(userData?.jobored)

      if (userData) {
        localStorage.setItem('currentUser', JSON.stringify(userData.user));
        // jobored && localStorage.setItem('jobored', jobored)
      } else {
        alert('We could not find your email. Please, Sign Up.');

        let result = next({
          type: 'user/login',
          payload: {
            error: true,
          },
        });

        return result;
      }
      break;
    }

    case 'user/signup': {
      const savedStore = localStorage.getItem('store');
      const parsedSavedStore = savedStore ? JSON.parse(savedStore) : {};
      const userData = parsedSavedStore[action.payload.email];

      if (userData) {
        alert('This email already exists. Please, Sign In.');

        let result = next({
          type: 'user/signup',
          payload: {
            error: true,
          },
        });

        return result;
      } else {
        localStorage.setItem('currentUser', JSON.stringify(action.payload.email));
        parsedSavedStore[action.payload.email] = { user: { email: action.payload.email } };
        localStorage.setItem('store', JSON.stringify(parsedSavedStore));
      }

      break;
    }

    default:
      break;
  }
  let result = next(action);

  switch (action.type) {

    // case 'jobored/setadd': {
    //   const { jobored } = store.getState();
    //   localStorage.setItem('jobored', JSON.stringify(jobored));
    //   break
    // }

    // case 'jobored/remove': {
    //   const { jobored } = store.getState();
    //   localStorage.setItem('jobored', JSON.stringify(jobored));

    //   break;
    // }
    // case 'jobored/change': {
    //   const { jobored } = store.getState()
    //   localStorage.setItem('jobored', JSON.stringify(jobored));
    //   break
    // }

    default:
      break;
  }
  return result;
};

export default saveUserData;




// const store = {
//   'darkbarnied99@gmailcom': { user: { email: "darkbarnied99@gmailcom" } },
//   'savitskiy.v@inbox.ru': { user: { email: "savitskiy.v@inbox.ru" } }
// }

// store['savitskiy.v@inbox.ru']