import { $dayjs } from "../utils";

export const useTime = () => ({
  timeFromNow: (time?: string) => {
    return $dayjs(time).fromNow();
  },
});
