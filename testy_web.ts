import {/* Builder,  */Capabilities, until, WebElementCondition} from 'selenium-webdriver';

import { expect } from 'chai';

import { Builder, ThenableWebDriver, Alert, By } from 'mocha-webdriver';

const date_from_the_past = "2020-01-01"


describe('reservation form test', function () {

        // let driver: ThenableWebDriver = undefined;
        const driver = new Builder().forBrowser("firefox").build();
        this.timeout(50000);
        const filePath = `file://${process.cwd()}/plik.html`;
        driver.get(filePath);

    this.afterAll(async () => {
        await driver.close();
    })

    it('button disabled and popup not existing', async () => {
        expect(await driver.find('button[id=submit_button]').getAttribute("disabled") != null);
    });

    it('button not clickable if date is from the past', async () => {
        fill_form(date_from_the_past);
        expect(await driver.find('button[id=submit_button]').getAttribute("disabled") != null);
    });

    it('reset button resets the text fields', async () => {
        await driver.find('button[id=reset_button]').doClick();
        expect (await get_input_by_id("imie") === "");
        expect (await get_input_by_id("nazwisko") === "");
        expect (await get_input_by_id("skad") === "");
        expect (await get_input_by_id("dokad") === "");
    });

    it('button clickable after fields were filled', async () => {
        const present_date = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
        await fill_form(present_date.toLocaleDateString());

        await driver.find('button[id=submit_button]').doClick();
        expect(await driver.find('button[id=submit_button]').getAttribute("disabled") == null);
        //expect (await driver.findElement(By.id("id_potwierdzenia")) != null)
        expect (await driver.find('div[id=id_potwierdzenia]') != null)
    });

    it('links not clickable after the reservations were made', async () => {
      /*   let cant_click_link = false;
        try {
            await driver.find('a[id=korona_link]').doClick();
        } catch (error) {
            cant_click_link = true;
        };
        expect (cant_click_link === true);
 */
        expect(await driver.find('a').click()
            .then(() => {
                return false;
            })
            .catch(() => {
                return true;
            })
        ).to.equal(true);
    });

    it('reservation confirmation is correct', async () => {
        // expect (await driver.findElement(By.id("id_potwierdzenia")).getText() ===
        console.log(typeof(until.elementLocated(By.id('id_potwierdzenia')));
        const popup = await driver.wait(until.elementLocated(By.id('id_potwierdzenia')));
        expect (await popup.getText() ===
        (await get_input_by_id("imie")) + " " +
        (await get_input_by_id("nazwisko")) + ": " +
        "rezerwacja dokonana na dzień " +
        (await get_input_by_id("data_lotu")));
    });

    async function fill_form(date: string) {
        await driver.find('input[type=date]').sendKeys(date);
        await driver.find('input[id=imie]').sendKeys('Jan');
        await driver.find('input[id=nazwisko]').sendKeys('Kowalski');
        await driver.find('input[id=skad]').sendKeys('Wwa');
        await driver.find('input[id=dokad]').sendKeys('Krk');
    }

    async function get_input_by_id(id: string) {
        const arg = 'input[id=' + id + ']';
        return driver.find(arg).getText()
    }

})

