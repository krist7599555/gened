import { forEach } from "lodash";
import { FACULTY } from "@config/constant";

export default (user: any) => {
  const rm = ["disable", "uid", "username", "roles"];
  for (const key of rm) {
    if (key in user) {
      delete user[key];
    }
  }
  const cmd = {
    displayname: u => `${u.firstname} ${u.lastname}`,
    รหัสชั้นปี: u => u.ouid.slice(0, 2),
    รหัสคณะ: u => u.ouid.slice(8, 10),
    ชั้นปี: u => 62 - u.รหัสชั้นปี.valueOf(),
    คณะ: u => FACULTY[u.รหัสคณะ].th,
    คณะย่อ: u => FACULTY[u.รหัสคณะ].sh,
    faculty: u => FACULTY[u.รหัสคณะ].en
  };
  forEach(cmd, (func, key) => {
    if (!(key in user)) {
      try {
        user[key] = func(user);
      } catch (e) {}
    }
  });
  return user;
};
