import { expect, test } from "@playwright/test";

test("public navigation works", async ({ page }) => {
  await page.goto("/fr");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.getByRole("link", { name: "Destinations" }).first().click();
  await expect(page).toHaveURL(/\/fr\/destinations/);
  await expect(page.getByRole("heading", { name: "Destinations" })).toBeVisible();
});
