import Users from "../routes/Users.js";
import Universal from "../routes/Universal.js";


export const v1Routes = [
  { path: "/users", file: Users },
  { path: "/uni_v2/:id", file: Universal },
];
 