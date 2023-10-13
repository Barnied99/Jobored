import { clearToken, getToken, setToken } from '@/components/common/services';

const saveUserData = (store: any) => (next: any) => (action: any) => {

  switch (action.type) {
    case 'user/logout': {
      const savedStore = localStorage.getItem('store');
      const parsedSavedStore = savedStore ? JSON.parse(savedStore) : {};
      const userData = store.getState();
      parsedSavedStore[userData.user.email] = {
        user: userData.user.email,
        jobored_favorite_vacancies: userData.jobored
      };


      localStorage.setItem('store', JSON.stringify(parsedSavedStore));
      localStorage.removeItem('currentUser');
      // localStorage.removeItem('jobored');
      localStorage.removeItem('jobored-favorite-vacancies');

      let result = next(action);

      return result;
    }

    case 'user/login': {
      const savedStore = localStorage.getItem('store');
      const parsedSavedStore = savedStore ? JSON.parse(savedStore) : {};
      const userData = parsedSavedStore[action.payload.email];
      const jobored = JSON.stringify(userData?.jobored_favorite_vacancies)

      if (userData) {
        localStorage.setItem('currentUser', JSON.stringify(userData.user));
        jobored && localStorage.setItem('jobored', jobored)
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

    // case 'jobored/setaddFavoriteVacancy': {
    //   const { jobored } = store.getState();
    //   localStorage.setItem('jobored', JSON.stringify(jobored));
    //   break
    // }

    // case 'jobored/setdeleteFavoriteVacancy': {
    //   const { jobored } = store.getState();
    //   localStorage.setItem('jobored', JSON.stringify(jobored));

    //   break;
    // }
    // case 'jobored/setresetFavoriteVacancies': {
    //   const { jobored } = store.getState();
    //   localStorage.setItem('jobored', JSON.stringify(jobored));
    //   break;
    // }

    default:
      break;
  }
  return result;
};

export default saveUserData;




