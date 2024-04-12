import { NextResponse } from "next/server";
import puppeteer from "puppeteer-extra";
import Adblocker from "puppeteer-extra-plugin-adblocker";
import UserAgent from "user-agents";

import { JSDOM } from "jsdom";
import { setTimeout } from "timers/promises";
import { IConference, ITeam } from "interfaces";
import { closeBrowser, initialBrowser } from "../utils";

const url = `https://www.basketball-reference.com/leagues/`;

const getTeams = ({
  teamsHTML,
}: {
  teamsHTML: NodeListOf<Element>;
}): ITeam[] => {
  const teams = [...teamsHTML].map((el) => {
    const href = el?.querySelector("td>a")?.getAttribute("href");
    const code = href?.split("/")[2].toLowerCase() || "";
    const regex = /\(|\)/g;
    const textContentSplit =
      el?.textContent?.replace("F$", "").replace(regex, "-").split("-") || [];
    const name = textContentSplit[0];
    const victories = Number(textContentSplit[1]) || 0;
    const defeats = Number(textContentSplit[2]) || 0;
    return {
      name,
      victories,
      defeats,
      code: code,
    };
  });
  return teams;
};

const getConferences = (el: Document): IConference => {
  const name = el.querySelector("h4")?.textContent;
  const teamsElements = el.querySelectorAll("table>tbody>tr");
  const teams: ITeam[] = getTeams({ teamsHTML: teamsElements }).sort((a, b) =>
    a.victories < b.victories ? 1 : -1
  );
  return {
    name,
    teams,
  };
};

const Puppeteer: () => Promise<IConference[]> = async () => {
  // puppeteer.use(Adblocker({ blockTrackers: true }));
  // const browser = await puppeteer.launch({ headless: false });
  const browser = await initialBrowser();
  const page = await browser.newPage();
  const userAgent = new UserAgent();
  await page.setUserAgent(userAgent.toString());
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  await page.goto(url);
  await page.hover("#header_teams");
  setTimeout(300);
  const elements: string[] = await page.$$eval(
    "#header_teams>div>.list",
    (el: Element[]) => el.map((item) => item.outerHTML)
  );
  const res: IConference[] = elements.map((el) => {
    const DOM = new JSDOM(el);
    return getConferences(DOM.window.document);
  });
  closeBrowser({ browser });
  return res;
};

export async function GET(request: Request) {
  const response = await Puppeteer();
  return NextResponse.json(response);
}
