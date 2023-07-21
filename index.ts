import * as dotenv from 'dotenv'
import {BitGo} from '@bitgo-beta/bitgo';
import {Eth} from "@bitgo-beta/sdk-coin-eth";
import recoveryOptions from './keycard.json';
import {RecoverOptions} from "@bitgo-beta/sdk-coin-eth/dist/src/eth";

dotenv.config()

const sdk = new BitGo({});

const baseCoin = Eth.createInstance(sdk) as Eth;

async function recover(): Promise<void> {
    const options: Omit<RecoverOptions, 'isTss' | 'walletContractAddress'> = recoveryOptions;
    const res = await baseCoin.recover({
        ...options,
        isTss: true,
        // not needed for tss
        walletContractAddress: "",
    });
    console.log(JSON.stringify(res, null, 2));
}

async function time(fn: () => Promise<void>, name: string): Promise<number> {
    const start = Date.now();
    try {
        await fn();
    } catch (e) {
        console.error(e);
    }
    const end = Date.now();
    console.log(`\n${name} took ${end - start}ms (${(end - start) / 1000}s)\n`);
    return (end - start) / 1000;
}

time(recover, 'recover').catch((e) => console.error(e));

