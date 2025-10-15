import moment, { Moment } from "moment/moment";

import { APIVenue } from "@/types/venue";

export type APIEvent = {
  id: string;
  v_id: string;
  url: string;
  title: string;
  desc: string;
  date: {
    s: string;
    e: string | undefined;
  };
  img:
    | {
        img_s: string;
        img_m: string;
        img_o: string;
      }
    | undefined;
  notify: string | undefined;
  tickets_url: string | undefined;
  vk_url: string | undefined;
  vk_id: string | undefined;
};

export type APIEventExtended = APIEvent & {
  venue: APIVenue | undefined;
  start: Moment;
  end: Moment | null;
};

export function canFavorite(apiEvent: APIEventExtended): boolean {
  return apiEvent.start.diff(moment(), "day") >= 2;
}

export function extend(apiEvent: APIEvent, venues: APIVenue[]): APIEventExtended {
  const e: APIEventExtended = apiEvent as APIEventExtended;

  e.venue = venues.find((venue: APIVenue): boolean => {
    return apiEvent.v_id === venue.id;
  });

  e.start = moment.unix(apiEvent.date.s);
  e.end = apiEvent.date.e ? moment.unix(apiEvent.date.e) : null;

  return e;
}
