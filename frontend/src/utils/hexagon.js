import { ethers } from "ethers";
import { toaster } from "evergreen-ui";
import keccak256 from "keccak256";
import ShortUniqueId from "short-unique-id";
import hexagonJson from "./Hexagon.json";
const uid = new ShortUniqueId({ length: 10 });

const hexagonAddress = "0xb6276f6892873d4577e1524f7eb195b118d11334";
const hexagonAbi = hexagonJson.abi;

const nodeProvider = "https://api.baobab.klaytn.net:8651/";

export async function connectWallet() {
    try {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            localStorage.setItem("isConnected", accounts[0]);
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x3E9' }], // chainId must be in hexadecimal numbers
            });
            return accounts[0];
        } else {
            toaster.danger("Wallet not detected!");
        }
    } catch (error) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        if (error.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: '0x3E9',
                            chainName: 'Klaytn Testnet Baobab',
                            nativeCurrency: {
                                name: 'Klaytn Token',
                                symbol: 'KLAY', // 2-6 characters long
                                decimals: 18
                            },
                            blockExplorerUrls: ['https://baobab.scope.klaytn.com/'],
                            rpcUrls: ['https://api.baobab.klaytn.net:8651'],
                        },
                    ],
                });
            } catch (addError) {
                console.error(addError);
                toaster.danger('failed to add network to metamask');
                return;
            }
        }
        toaster.danger("Error: " + error.message);
    }
}

export async function disconnectWallet() {
    localStorage.removeItem("isConnected");
}

export function isConnected() {
    return localStorage.getItem("isConnected") ? true : false;
}

export async function register(name) {
    try {
        const hexagon = await getHexagon();
        const tx = await hexagon.register(name);
        await tx.wait();
        toaster.success("Registration successful!");
    } catch (err) {
        toaster.danger(`Error: ${err.message}`);
    }
}

export async function createProduct(productName, url) {
    try {
        const hexagon = await getHexagon();
        const tx = await hexagon.createProduct(productName, url);
        await tx.wait();
        toaster.success("New Product created successfully!");
        return true;
    } catch (err) {
        toaster.danger(`Error: ${err.message}`);
    }
}

export async function createItems(productName, amount) {
    try {
        const codes = [];
        const hexagon = await getHexagon();
        for (let i = 0; i < amount; i++) {
            codes.push(uid());
        }
        const codeHashes = codes.map((code) => keccak256(ethers.utils.formatBytes32String(code)));
        const tx = await hexagon.register(productName, codeHashes);
        await tx.wait();
        toaster.success("Items created successfully!");
        return codes;
    } catch (err) {
        toaster.danger(`Error: ${err.message}`);
    }
}

export async function checkAuthenticity(productName, code) {
    try {
        const codeInBytes32 = ethers.utils.formatBytes32String(code);
        const hexagon = await getHexagon();
        const tx = await hexagon.checkAuthenticity(productName, codeInBytes32);
        await tx.wait();
        toaster.success("Item is Authentic!");
        return 0;
    } catch (err) {
        if (err.reason == "execution reverted: code invalid!") {
            return 1;
        }
        else if (err.reason == "execution reverted: product bought!") {
            return 2;
        } else {
            toaster.danger(`Error: ${err.reason}`);
        }
    }
}

export async function getManufacturer(manufacturerAddress) {
    try {
        if (!manufacturerAddress) {
            manufacturerAddress = localStorage.getItem("isConnected");
        }
        const hexagon = await getReadOnlyHexagon();
        const res = await hexagon.getManufacturer(manufacturerAddress);
        const manufacturer = { id: res[0], name: res[1], address: res[2], products: res[3] };
        return manufacturer;

    } catch (err) {
        toaster.danger(`Error: ${err.reason}`);
    }
}

export async function isManufacturer(manufacturerAddress) {
    try {
        const hexagon = await getReadOnlyHexagon();
        const res = await hexagon.isManufacturer(manufacturerAddress);
        return res;

    } catch (err) {
        toaster.danger(`Error: ${err.reason}`);
    }
}

export async function amIAManufacturer() {
    if (isConnected()) {
        return await isManufacturer(localStorage.getItem("isConnected"));
    }
}

export async function getProduct(productName) {
    try {
        const hexagon = await getReadOnlyHexagon();
        const res = await hexagon.getProduct(productName);
        const product = { id: res[0], name: res[1], url: res[2], manufacturer: res[3], totalItems: res[4] };
        return product;

    } catch (err) {
        toaster.danger(`Error: ${err.reason}`);
    }
}

export async function getInfo(productName) {
    try {
        const hexagon = await getReadOnlyHexagon();
        const info = await hexagon.getInfo(productName);
        return info;

    } catch (err) {
        toaster.danger(`Error: ${err.reason}`);
    }
}

export async function getReadOnlyHexagon() {
    const provider = new ethers.providers.JsonRpcProvider(nodeProvider);
    const hexagon = new ethers.Contract(hexagonAddress, hexagonAbi, provider);
    return hexagon;
}


export async function getHexagon() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const hexagon = new ethers.Contract(hexagonAddress, hexagonAbi, signer);
    return hexagon;
}