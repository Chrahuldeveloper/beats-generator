from pyppeteer import launch
import asyncio

async def main():
    browser = None

    try:
        browser = await launch(headless=True)

        page = await browser.newPage()

        await page.goto(
            'https://www.looperman.com/account/login',
        )

        await page.type("#user_email", "chrahulofficial@gmail.com")
        await page.type("#upass", "Lovecoding@143")

        await page.click('#user_disclaimer')
        await page.click("#user_remember_code")
        await page.click("#submit")

        print("Logged in")


        await asyncio.sleep(3)

        await page.goto(
            "https://www.looperman.com/loops",
        )

        players = await page.querySelectorAll('.player-wrapper')

        for player in players:
            data_hash = await page.evaluate(
                '(element) => element.getAttribute("data-hash")',
                player
            )
            print(data_hash)


    except Exception as e:
        print("Error:", e)

    finally:
        if browser:
            await browser.close()


asyncio.run(main())