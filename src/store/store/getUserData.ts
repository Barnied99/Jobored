const getUserData = () => {
  try {
    let currentUser = localStorage.getItem('currentUser');
    let tasklist = localStorage.getItem('tasklist');
    currentUser = currentUser ? JSON.parse(currentUser) : undefined;

    if (currentUser) {
      const initialUserData = {
        user: { email: currentUser },
        tasklist: tasklist ? JSON.parse(tasklist) : [],
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
