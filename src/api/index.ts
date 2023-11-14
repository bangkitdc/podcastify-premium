import auth from './auth';
import user from './user';
import error from './error';
import episode from './episode';
import subscription from './subscription';
import category from './category';

// const tryCatchWrapper = (module:any) => {
//   for (const key in module) {
//     const fn = module[key];

//     module[key] = async (...args: any[]) => {
//       try {
//         const res = await fn(...args);
//         if (res.status === "error") {
//           throw new Error(res.message);
//         }
//         return res;
//       } catch (error) {
//         console.error(error);
//         if (error instanceof Error) {
//           return {
//             status: "error",
//             message: error.message,
//             data: null,
//           };
//         } else {
//           return {
//             status: "error",
//             message: "Unknown error",
//             data: null,
//           };
//         }
//       }
//     };
//   }
// }

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
