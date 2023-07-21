import {BitGoAPI} from './BitGoJS/modules/sdk-api';
import {Eth, RecoverOptions} from "./BitGoJS/modules/sdk-coin-eth";
import recoveryOptions from './keycard.json';
import {AliasEnvironments, Wallet} from "./BitGoJS/modules/sdk-core";

const arg = process.argv.slice(2).length? process.argv.slice(2)[0] : '';
assert(arg, 'expected recover or recoverToken <address> as arguments');
console.log(arg);

const sdk = new BitGoAPI({env: AliasEnvironments.production});

const baseCoin = Eth.createInstance(sdk) as Eth;

async function recover(): Promise<void> {
    const options: Omit<RecoverOptions, 'isTss' | 'walletContractAddress'> = recoveryOptions;
    const res = await baseCoin.recover({
        ...options,
        isTss: true,
        // not needed for tss
        walletContractAddress: "",
    }, false);
    console.log(JSON.stringify(res, null, 2));
}

async function recoverToken(): Promise<void> {
    const tokenContractAddress = process.argv.slice(2)[1];
    assert(tokenContractAddress, 'missing token constract address');
    const options: Omit<RecoverOptions, 'isTss' | 'walletContractAddress'> = recoveryOptions;
    const res = await baseCoin.recoverTokenTss({
        ...options,
        tokenContractAddress,
        isTss: true,
    }, false);
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

if (arg === 'recover') {
    time(recover, 'recover').catch((e) => console.error(e));
} else if (arg === 'recoverToken') {
    time(recoverToken, 'recoverToken').catch((e) => console.error(e));
} else {
    console.log('invalid arg');
}

