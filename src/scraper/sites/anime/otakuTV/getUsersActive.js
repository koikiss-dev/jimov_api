import axios from "axios";
import * as ch from "cheerio";

async function getUsersActive() {
  try {
    const { data } = await axios.get("https://www1.otakustv.com");
    const $ = ch.load(data);

    const users = [];

    //const test = $('div.user_act div.item ').html()
    const test = $("div.user_act div.item ").each((i, j) => {
      // console.log($(j).find('img').attr('src'))

      users.push({
        linkToPerfil: $(j)
          .find("a")
          .attr("href")
          .replace(
            "https://www1.otakustv.com/perfil/",
            "/anime/otakuTV/profile/"
          ),
        name: $(j).find("h2").text(),
        ranking: $(j).find("p").text(),
      });
    });

    return users;
  } catch (error) {
    return error;
  }
}

export default { getUsersActive };
