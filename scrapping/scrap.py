from pyppeteer import launch
import asyncio
import pandas as pd
import os 

async def main():

    browser = None

    try:
        os.makedirs("./beats", exist_ok=True)

        browser = await launch(headless=True)

        page = await browser.newPage()


        await page._client.send(
            "Page.setDownloadBehavior",
            {
                "behavior": "allow",
                "downloadPath": os.path.abspath("./beats")
            }
        )

        await page.goto(
            'https://www.looperman.com/account/login',
        )

        await page.type("#user_email", "chrahulofficial@gmail.com")
        await page.type("#upass", "Lovecoding@143")

        await page.click('#user_disclaimer')
        await page.click("#user_remember_code")
        await page.click("#submit")

        print("clicked")

        if "account/login" not in page.url:
            print("logged in")
        else:
            print("Login failed")   

        df = pd.read_csv("./links.csv")

        for link in df.iloc[:, 0]:

            link = str(link).strip()

            print("Opening:", link)

            try:
                await page.goto(
                    link,
                    {
                        "waitUntil": "domcontentloaded",
                        "timeout": 60000
                    }
                )

                await page.waitForSelector(
                    'a[data-bs-title="Download this item"]',
                    {
                        "timeout": 60000
                    }
                )

                btn = await page.querySelector(
                    'a[data-bs-title="Download this item"]'
                )

                await btn.click()

                await asyncio.sleep(3)

                print("Downloaded:", link)

            except Exception as e:
                print("Failed:", link)
                print("Error:", e)

    except Exception as e:
        print("Error:", e)

    finally:
        if browser:
            await browser.close()


asyncio.run(main())