//import {Builder, Capabilities} from 'selenium-webdriver';

import { expect } from 'chai';

import { Builder, ThenableWebDriver, Alert } from 'mocha-webdriver';


describe('reservation form test', function () {
    let driver: ThenableWebDriver = undefined;

    this.beforeAll(async function() {
        driver = new Builder().forBrowser("firefox").build();
        this.timeout(50000);
        const filePath = `file://${process.cwd()}/plik.html`;
        await driver.get(filePath);
    })

    this.afterAll(async function() {
        await driver.close();
    })

    it('button disabled and popup not existing', async function() {
        expect(await driver.find('button[id=submit_button]').getAttribute("disabled") != null);
    });
    it('button not clickable if date from the past', async function() {
        await driver.find('input[type=date]').sendKeys('2020-01-01');
        await driver.find('input[id=imie]').sendKeys('Jan');
        await driver.find('input[id=nazwisko]').sendKeys('Kowalski');
        await driver.find('input[id=skad]').sendKeys('Wwa');
        await driver.find('input[id=dokad]').sendKeys('Krk');
        expect(await driver.find('button[id=submit_button]').getAttribute("disabled") != null);
    });
    it('reset button resets the text fields', async function() {
        await driver.find('button[id=reset_button]').doClick();
        expect (await driver.find('input[id=imie]').getText() === "");
        expect (await driver.find('input[id=nazwisko]').getText() === "");
        expect (await driver.find('input[id=skad]').getText() === "");
        expect (await driver.find('input[id=dokad]').getText() === "");
    
    });
    it('button clickable after fields were filled', async function() {
        await driver.find('input[type=date]').sendKeys('2020-05-05');
        await driver.find('input[id=imie]').sendKeys('Jan');
        await driver.find('input[id=nazwisko]').sendKeys('Kowalski');
        await driver.find('input[id=skad]').sendKeys('Wwa');
        await driver.find('input[id=dokad]').sendKeys('Krk');
        await driver.find('button[id=submit_button]').doClick();
        expect(await driver.find('button[id=submit_button]').getAttribute("disabled") == null);
        expect(await driver.find('div[class=potwierdzenie_rezerwacji') != null);
    });
    it('links not clickable after the reservations were made', async function() {
        let cant_click_link = false;
        try {
            await driver.find('a[id=korona_link]').doClick();
        } catch (error) {
            cant_click_link = true;
        };
        expect (cant_click_link === true);
    });

})