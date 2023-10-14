const getUserData = () => {
  try {
    let currentUser = localStorage.getItem('currentUser');
    let jobored = localStorage.getItem('jobored_favorite_vacancies');
    currentUser = currentUser ? JSON.parse(currentUser) : undefined;

    if (currentUser) {
      const initialUserData = {
        user: { email: currentUser },
        jobored: jobored ? JSON.parse(jobored) : [],
      };
      return initialUserData;
    } else {
      return { user: { email: null } };
    }
  } catch (e) {
    return { user: { email: null } };
  }
};

export default getUserData;
