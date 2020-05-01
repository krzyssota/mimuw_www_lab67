import {Capabilities} from 'selenium-webdriver';

import { expect } from 'chai';

import { Builder, driver, ThenableWebDriver } from 'mocha-webdriver';
import { doesNotMatch } from 'assert';
// export TS_NODE_COMPILER_OPTIONS='{"lib": ["ES2015"]}';
// npx mocha -r ts-node/register --timeout 5000 testy_web.ts

const date_from_the_past = "2020-01-01"
const TIMEOUT = 50000;


describe('reservation form test', function () {

    let driver: ThenableWebDriver = undefined;
    const filePath = `file://${process.cwd()}/plik.html`;

    beforeEach(async () => {
        this.timeout(TIMEOUT);
        driver = new Builder().forBrowser("firefox").build();
        await driver.get(filePath);
    })

    this.afterEach(async () => {
        await driver.close();
        driver = undefined;
    })

    it('button disabled and popup not existing', async () => {
        expect (await driver.find('button[id=submit_button]').getAttribute("disabled")).to.be.equal("true");

    });

    it('button not clickable if date is from the past', async () => {
        await fill_form(date_from_the_past);
        expect (await driver.find('button[id=submit_button]').getAttribute("disabled")).to.be.equal("true");
    });

    it('reset button resets the text fields', async () => {
        await driver.find('button[id=reset_button]').doClick();
        expect (await get_input_by_id("imie")).to.equal("");
        expect (await get_input_by_id("nazwisko")).to.equal("");
        expect (await get_input_by_id("skad")).to.equal("");
        expect (await get_input_by_id("dokad")).to.equal("");
    });

    it('links not clickable after the reservations were made', async () => {
        const present_date = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
        await fill_form(present_date.toLocaleDateString());
        await driver.find('button[id=submit_button]').doClick();

        // reservation info correct
        expect(await driver.find("div[id=potwierdzenie_rezerwacji]").getAttribute("innerHTML")).
        to.equal(
        (await get_input_by_id("imie")) + " " +
        (await get_input_by_id("nazwisko")) + ": " +
        "rezerwacja dokonana na dzień " +
        (await get_input_by_id("data_lotu")));

        // link not clickable
        expect(await driver.find('a').click()
            .then(() => {
                return false;
            })
            .catch(() => {
                return true;
            })
        ).to.equal(true);
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
        return (await driver.find(arg).getText())
    }

})

