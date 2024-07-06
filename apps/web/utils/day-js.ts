import dayjs from "dayjs";
import UpdateLocale from "dayjs/plugin/updateLocale";
import RelativeTime from "dayjs/plugin/relativeTime";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(RelativeTime);
dayjs.extend(UpdateLocale);
dayjs.extend(LocalizedFormat);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "em %s",
    past: "%s atrás",
    s: "alguns segundos",
    m: "um minuto",
    mm: "%d minutos",
    h: "uma hora",
    hh: "%d horas",
    d: "um dia",
    dd: "%d dias",
    M: "um mês",
    MM: "%d meses",
    y: "um ano",
    yy: "%d anos",
  },
});

export const $dayjs = dayjs;
