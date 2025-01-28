/** @format */
import { NavLink } from "react-router-dom";

// Sidebar items generator function
export const sidebarItemsGenerator = (items, role) => {
   return items.reduce((acc, item) => {
      if (item.path && item.name) {
         acc.push({
            key: item.path,
            // label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
            label: <NavLink to={`/dashboard/${item.path}`}>{item.name}</NavLink>,
         });
      }

      if (item.children) {
         acc.push({
            key: item.name,
            label: item.name,
            children: item.children.map((child) => ({
               key: child.path,
               label: (
                //   <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
                  <NavLink to={`/dashboard/${child.path}`}>{child.name}</NavLink>
               ),
            })),
         });
      }

      return acc;
   }, []);
};
