import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Before, After } from './SetUp.ts';
import { By, Origin } from 'selenium-webdriver';
import { driver } from './SetUp.ts';
import * as Index from './../src/Constantes/Index.ts';
import * as JSPath from './../src/Constantes/JSPath.ts';
import * as CSSVar from './../src/Constantes/CSSVar.ts';

beforeAll(Before);
afterAll(After);

describe('Home', () => {
    it('successfully loads ', () => { });
});

describe('All Constantes must be defined', () => {
    Object.entries(Index).forEach(([key, value]) => {
        it(`Index: ${key} must be defined (${value})`, () => {
            expect(value).to.not.be.undefined;
        });
    });
    Object.entries(JSPath).forEach(([key, value]) => {
        it(`JSPath: ${key} must be defined (${value})`, () => {
            expect(value).to.not.be.undefined;
        });
    });
    Object.entries(CSSVar).forEach(([key, value]) => {
        it(`CSSVar: ${key} must be defined (${value})`, () => {
            expect(value).to.not.be.undefined;
        });
    });
});

describe('JSPath have to point to at least one HTMLElement', () => {
    Object.entries(JSPath).forEach(([key, value]) => {
        it(`JSPath: ${key}: ${value} must point to an HTMLElement`, async () => {
            expect(await driver.findElement(By.css(value))).to.not.be.undefined;
        });
    });
});

describe('Canvas must be functional', () => {
    it('Canvas must be able to draw', async () => {
        const img1 = await driver.takeScreenshot();
        let clickable = driver.findElement(By.css(JSPath.FabricUpperCanvasClass));
        const actions = driver.actions({ async: true });
        await actions
            .move({ origin: clickable })
            .press()
            .move({ x: 13, y: 15, origin: Origin.POINTER })
            .perform();
        const img2 = await driver.takeScreenshot()
        expect(img1 == img2).to.be.false
    });
});
