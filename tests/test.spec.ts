import { test } from "@playwright/test";
import list from "../data/list.json";
import { HtmlEditor } from "./html-editor";
import { DateGetter } from "./date-getter";

test.describe("Generating allure reports dashboard", () => {
  test("Generating allure reports dashboard", async ({
    page,
  }) => {
    page.goto("link");
    let htmlEditor = new HtmlEditor();
    let dateGetter = new DateGetter();

    const loginInput = page.locator("#user_login");
    const passwordInput = page.locator("#user_password");
    const signInButton = page.locator('[data-testid="sign-in-button"]');
    const chartCaption = page.locator(".chart__caption");
    const chartPlot = page.locator(".chart__plot");
    const splashTitle = page.locator(".splash__title");
    const suiteName = page.locator(
      '//*[@data-id="suites"]//a[@class="table__row" and contains(@href, "#suites/")]/div[@class="table__col" and not(*)]'
    );

    await loginInput.fill("username");
    await passwordInput.fill("password");
    await signInButton.click();

    let htmlContent = "";

    for (let i = 0; i < list.length; i++) {
      // Navigate to the specific report page
      await page.goto(list[i].link);
      let percentage = await chartCaption.textContent();
      let testCount = await splashTitle.textContent();
      let chartCaptionValue = await chartCaption.textContent();
      let dateNow = await dateGetter.getFormattedDateNow();
      let isOutdatedTest = false;

      let suiteNameValue = "";
      try {
        suiteNameValue = (await suiteName.textContent()) || "";
      } catch (error) {
        console.log(error);
      }

      let dateRegex = new RegExp(
        "^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), \\d{2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \\d{4} \\d{2}:\\d{2}:\\d{2} GMT$"
      );
      let suiteDate = new Date(suiteNameValue);
      let currentDate = new Date(dateNow);
      let timeDifference = (currentDate.getTime() - suiteDate.getTime()) / (1000 * 60 * 60);
      
      if (chartCaptionValue === "NaN%" || !dateRegex.test(suiteNameValue) || timeDifference >= 2) {
        isOutdatedTest = true;
      }

      // Need that bc of animation of the element
      // Try to remove timeout to see how it works without it
      await page.waitForTimeout(2000);
      let imgPath = "../temp-img/" + list[i].name + ".png";
      await chartPlot.screenshot({ path: imgPath });

      console.log(" ");
      console.log(list[i].name);
      console.log(percentage);
      console.log(" ");

      // Generate HTML card
      let dashboardCard = await htmlEditor.generateDashboardCard(
        list[i].name,
        list[i].link,
        percentage!,
        imgPath!,
        testCount,
        isOutdatedTest
      );
      // Add the card's HTML content to the overall content string
      htmlContent += dashboardCard;
    }
    await htmlEditor.saveHTMLFile(htmlContent, "generated_dashboard.html");
  });
});
