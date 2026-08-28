import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as Sentry from "@sentry/react";

const useSentryUser = () => {
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      Sentry.setUser({
        id: user._id || user.id,
      });

      if (user.role) {
        Sentry.setTag("role", user.role);
      }
    } else {
      Sentry.setUser(null);
    }
  }, [user]);
};

export default useSentryUser;