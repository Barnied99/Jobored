const getUserData = () => {
  try {
    let currentUser = localStorage.getItem('currentUser');
    // let jobored = localStorage.getItem('jobored');
    currentUser = currentUser ? JSON.parse(currentUser) : undefined;

    if (currentUser) {
      const initialUserData = {
        user: { email: currentUser },
        // jobored: jobored ? JSON.parse(jobored) : [],
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
