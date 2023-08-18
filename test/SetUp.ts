import { spawnSync, spawn } from 'child_process';
import { readFileSync, rmdirSync } from 'fs';
import { platform, homedir } from 'os';
import { resolve, dirname } from 'path';
import { Builder, Capabilities } from 'selenium-webdriver';
import { parse } from 'toml';
import { fileURLToPath } from 'url';

const onWindows = platform() === 'win32';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = resolve(__dirname, '..');
const srcTauri = resolve(projectRoot, 'src-tauri');
const cargoConfig = parse(readFileSync(resolve(srcTauri, 'Cargo.toml'), 'utf-8'));
const cargoName = cargoConfig.package.name;

const ReleaseAppFolder = resolve(
    srcTauri,
    'target',
    'release'
);
// create the path to the expected application binary
const ReleaseAppExe = resolve(
    srcTauri,
    'target',
    'release',
    onWindows ? `${cargoName}.exe` : cargoName
);
// keep track of the webdriver instance we create, and tauri-driver process we start
// @ts-ignore
export let driver: ThenableWebDriver, tauriDriver;

// requires using function because of "this" usage
export async function Before() {
    // set timeout to 2 minutes to allow the program to build if it needs to
    // ensure the frontend has been built
    console.log('INFO: building app');
    const NPM = 'npm.cmd';
    const AppBuilt = spawnSync(
        NPM,
        ['run', 'tauri', 'build'],
        {
            cwd: projectRoot,
            stdio: 'pipe',
            encoding: 'utf-8',
        }
    );
    console.log(AppBuilt.stderr);
    if (AppBuilt.error !== undefined) {
        console.log(AppBuilt.error);
        rmdirSync(ReleaseAppFolder, { recursive: true });
    }
    // check if frontend wasn't updated
    console.log('INFO: App built');
    // ensure the release app has been built

    tauriDriver = spawn(
        resolve(homedir(), '.cargo', 'bin', 'tauri-driver')
    );

    const capabilities = new Capabilities();
    capabilities.set('tauri:options', { application: ReleaseAppExe });
    capabilities.setBrowserName('wry');

    // start the webdriver client
    driver = await new Builder()
        .withCapabilities(capabilities)
        .usingServer('http://localhost:4444/')
        .build();
}

export async function After() {
    // stop the webdriver session and kill the webdriver
    await driver.quit();
    tauriDriver.kill();
}
