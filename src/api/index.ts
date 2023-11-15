import auth from './auth';
import user from './user';
import error from './error';
import episode from './episode';
import subscription from './subscription';
import category from './category';

const apiBase = () => {
  return {
    auth,
    user,
    episode,
    category,
    subscription,
    error,
  };
};

export default apiBase;
