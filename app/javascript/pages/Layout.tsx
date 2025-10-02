import { usePage } from "@inertiajs/react";
import Navbar from "../components/ui/Navbar.tsx";
import isEmpty from "lodash/isEmpty";
import { capitalize, toPairs } from "lodash";

export const Layout = ({ children }: { children: any }) => {
  const { errors } = usePage().props;

  return (
    <>
      <Navbar></Navbar>
      {!isEmpty(errors) && (
        <div className="m-2 p-2 border border-red-300 bg-red-100 text-red-700 rounded">
          <ul>
            {toPairs(errors).map(([key, errorMessages]) => {
              const messages = Array.isArray(errorMessages)
                ? errorMessages
                : [errorMessages];
              return (
                <li key={key}>
                  {capitalize(key)} {messages.join(", ")}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className="m-4">{children}</div>
    </>
  );
};
