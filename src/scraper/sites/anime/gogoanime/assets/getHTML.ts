import { load } from "cheerio";
import axios from "axios";

export async function getHTML(url: string) {

  const { data } = await axios.get(`${url}`);
  const pageHTML = load(data);

  return pageHTML;

}





