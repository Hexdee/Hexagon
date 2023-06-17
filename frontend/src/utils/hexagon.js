import { ethers } from "ethers";
import { toaster } from "evergreen-ui";
import keccak256 from "keccak256";
import hexagonJson from "./Hexagon.json";
import ShortUniqueId from "short-unique-id";
import { Buffer } from "buffer";
const uid = new ShortUniqueId({ length: 10 });

window.Buffer = window.Buffer || Buffer;


const hexagonAddress = "0x74b1Cf996957e5D6d86037932Ed59bd9c053Ab9e";
const hexagonAbi = hexagonJson.abi;

const nodeProvider = "https://api.calibration.node.glif.io/rpc/v1";

export async function connectWallet() {
    try {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            localStorage.setItem("isConnected", accounts[0]);
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x4CB2F' }], // chainId must be in hexadecimal numbers
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
                            chainId: '0x4CB2F',
                            chainName: 'Filecoin Calibration testnet',
                            nativeCurrency: {
                                name: 'Filecoin Token',
                                symbol: 'FIL', // 2-6 characters long
                                decimals: 18
                            },
                            blockExplorerUrls: ['https://calibration.filscan.io/'],
                            rpcUrls: ['https://api.calibration.node.glif.io/rpc/v1'],
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
            // const code = crypto.randomUUID().slice(16);
            const code = uid();
            codes.push(code);
        }
        console.log({ codes });
        const codeHashes = codes.map((code) => keccak256(ethers.utils.formatBytes32String(code)));
        console.log({ codeHashes });
        const tx = await hexagon.createItems(productName, codeHashes);
        // tx.wait();
        toaster.success("Items created successfully!");
        return codes;
    } catch (err) {
        console.log({ err });
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