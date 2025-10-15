import moment, { Moment } from "moment/moment";

export type APIArticle = {
  id: string;
  url: string;
  date_p: string;
  title: string;
  desc: string | undefined;
  img:
    | {
        img_s: string;
        img_m: string;
        img_o: string;
      }
    | undefined;
  ext_url: string | undefined;
};

export type APIArticleExtended = APIArticle & {
  published: Moment;
};

export function extend(article: APIArticle): APIArticleExtended {
  const a: APIArticleExtended = article as APIArticleExtended;

  a.published = moment.unix(article.date_p);

  return a;
}
