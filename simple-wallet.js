const ethers = require('ethers');

const createWalletFromPrivateKey = privateKey => new ethers.Wallet(privateKey);
// console.log(createWalletFromProvateKey(privateKey));

const createRandomWallet = () => new ethers.Wallet.createRandom();
// console.log(createRandomWallet());

const saveWalletToJSON = (wallet, password) => {
    return wallet.encrypt(password);
}

const getWalletFromEncryptedJSON = (json, password) => {
    return ethers.Wallet.fromEncryptedJson(json, password);
}

// (async () => {
//     const privateKey = '0x495d5c34c912291807c25d5e8300d20b749f6be44a178d5c50f167d495f3315a';
//     const wallet = createWalletFromPrivateKey(privateKey);
//     const password = 'p@$$wOrd~3';
//     const json = await saveWalletToJSON(wallet, password);
//     console.log(json);

//     const decryptedWallet = await getWalletFromEncryptedJSON(json, password);
//     console.log(decryptedWallet);
// })();

const signTransaction = async (wallet, toAddress, value) => {
    const transaction = {
        nonce: 0,
        gasLimit: 21000,
        gasPrice: ethers.utils.bigNumberify('2000000000'),
        to: toAddress,
        value: ethers.utils.parseEther(value),
        data: '0x'
    }
    return wallet.sign(transaction);
}

(async () => {
    const privateKey = '0x495d5c34c912291807c25d5e8300d20b749f6be44a178d5c50f167d495f3315a';
    const wallet = createWalletFromPrivateKey(privateKey);
    const toAddress = '0x7725f560672A512e0d6aDFE7a761F0DbD8336aA7';
    const etherValue = '1';

    const signedTransaction = await signTransaction(wallet, toAddress, etherValue);

    console.log('Signed Transaction:\n' + signedTransaction);
})();