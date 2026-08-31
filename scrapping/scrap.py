from pyppeteer import launch
import asyncio
import pandas as pd
import os 



# async def main():
#     browser = None

#     try:
#         browser = await launch(headless=True)

#         page = await browser.newPage()

#         await page._client.send("Page.setDownloadBehavior",{
#                 "behavior": "allow",
#                 "downloadPath": "/beats"
#         })


#         await page.goto(
#             'https://www.looperman.com/account/login',
#         )

#         await page.type("#user_email", "chrahulofficial@gmail.com")
#         await page.type("#upass", "Lovecoding@143")

#         await page.click('#user_disclaimer')
#         await page.click("#user_remember_code")
#         await page.click("#submit")

#         print("Logged in")


#         await asyncio.sleep(3)

#         for i in range(200):
#             await page.goto(
#             f"https://www.looperman.com/loops?page={i}",
#             {
#             "waitUntil": "domcontentloaded",
#             "timeout": 518400000
#             }
            
#          )

#             pages = await page.querySelectorAll("a.btn.btn-secondary.btn-sm.btn-inline")
#             for page_element in pages:
#                 text = await page.evaluate(
#                     "(element) => element.href",
#                     page_element
#                 )


#                 with open("links.txt","a",encoding="utf-8") as file:
#                     file.write(text + "\n")

#                 print(text)

#     except Exception as e:
#         print("Error:", e)

#     finally:
#         if browser:
#             await browser.close()





import asyncio
import os
import pandas as pd
from pyppeteer import launch


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

        print("Logged in")


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
                        "timeout": 30000
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