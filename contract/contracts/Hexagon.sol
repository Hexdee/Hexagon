// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title Hexagon Drug Authentication Dapp
 * @dev A smart contract for authenticating pharmaceutical products on the Filecoin FVM Blockchain.
 */
contract Hexagon {
    /**
     * @dev Modifier: Only allow calls from registered manufacturers.
     */
    modifier OnlyManufacturer() {
        require(isManufacturer(msg.sender), "Only manufacturers can call this function!");
        _;
    }

    /**
     * @dev Modifier: Only allow calls from the manufacturer of a specific product.
     * @param productName The name of the product.
     */
    modifier OnlyProductManufacturer(string memory productName) {
        require(
            _products[productName].manufacturer == msg.sender,
            "Only product manufacturers can call this function!"
        );
        _;
    }

    /**
     * @dev Modifier: Check if the provided product name is valid.
     * @param productName The name of the product.
     */
    modifier isValidProduct(string memory productName) {
        require(_products[productName].id > 0, "Invalid product!");
        _;
    }

    struct Manufacturer {
        uint256 id;
        string name;
        address wallet;
        string[] products;
    }

    struct Product {
        uint256 id;
        string name;
        string url;
        address manufacturer;
        uint256 totalItems;
    }

    struct Item {
        bytes32 codeHash;
        string product;
        bool bougth;
    }

    mapping(uint256 => Manufacturer) private _manufacturers;
    mapping(address => uint256) private _manufacturersId;
    mapping(string => mapping(bytes32 => Item)) private _items;
    uint256 public totalManufacturers;
    uint256 public totalProducts;
    mapping(string => Product) private _products;

    /**
     * @dev Contract constructor.
     */
    constructor() {}

    /**
     * @dev Register a new manufacturer.
     * @param name The name of the manufacturer.
     */
    function register(string memory name) public {
        totalManufacturers++;
        _manufacturers[totalManufacturers] = Manufacturer(
            totalManufacturers,
            name,
            msg.sender,
            new string[](0)
        );
        _manufacturersId[msg.sender] = totalManufacturers;
    }

    /**
     * @dev Create a new product.
     * @param name The name of the product.
     * @param url The URL associated with the product.
     */
    function createProduct(string memory name, string memory url) public OnlyManufacturer {
        totalProducts++;
        _products[name] = Product(totalProducts, name, url, msg.sender, 0);
        _manufacturers[_manufacturersId[msg.sender]].products.push(name);
    }

    /**
     * @dev Update the URL of an existing product.
     * @param productName The name of the product.
     * @param url The new URL associated with the product.
     */
    function updateProduct(
        string memory productName,
        string memory url
    ) public isValidProduct(productName) OnlyProductManufacturer(productName) {
        _products[productName].url = url;
    }

    /**
     * @dev Create multiple items for a product.
     * @param productName The name of the product.
     * @param codeHashes An array of code hashes for the items.
     */
    function createItems(
        string memory productName,
        bytes32[] memory codeHashes
    ) public isValidProduct(productName) OnlyProductManufacturer(productName) {
        for (uint256 i = 0; i < codeHashes.length; i++) {
            // Confirm product exists
            require(_products[productName].id > 0, "Invalid product!");
            // Confirm that code does not exist
            require(
                !(_items[productName][codeHashes[i]].codeHash.length == 0),
                "Code already exists!"
            );
            _items[productName][codeHashes[i]] = Item(codeHashes[i], productName, false);
        }
        _products[productName].totalItems += codeHashes.length;
    }

    /**
     * @dev Check the authenticity of an item.
     * @param productName The name of the product.
     * @param code The code to check.
     */
    function checkAuthenticity(
        string memory productName,
        bytes32 code
    ) public isValidProduct(productName) {
        bytes32 _codeHash = keccak256(abi.encode(code));
        require(bytes(_items[productName][_codeHash].product).length > 0, "Invalid code!");
        require(_items[productName][_codeHash].bougth == false, "Product already bought!");

        _items[productName][_codeHash].bougth = true;
    }

    /**
     * @dev Get information about a manufacturer.
     * @param manufacturer The address of the manufacturer.
     * @return The manufacturer's ID, name, wallet address, and products array.
     */
    function getManufacturer(
        address manufacturer
    ) public view returns (uint256, string memory, address, string[] memory) {
        require(isManufacturer(manufacturer), "Not a manufacturer");
        uint256 id = _manufacturersId[manufacturer];
        string memory name = _manufacturers[id].name;
        address wallet = _manufacturers[id].wallet;
        string[] memory products = _manufacturers[id].products;
        return (id, name, wallet, products);
    }

    /**
     * @dev Check if the provided address is a registered manufacturer.
     * @param user The address to check.
     * @return A boolean indicating whether the address is a manufacturer or not.
     */
    function isManufacturer(address user) public view returns (bool) {
        if (_manufacturersId[user] > 0) {
            return true;
        }
        return false;
    }

    /**
     * @dev Get information about a product.
     * @param name The name of the product.
     * @return The product's ID, name, URL, manufacturer address, and total number of items.
     */
    function getProduct(
        string memory name
    )
        public
        view
        isValidProduct(name)
        returns (uint256, string memory, string memory, address, uint256)
    {
        uint256 id = _products[name].id;
        string memory url = _products[name].url;
        address manufacturer = _products[name].manufacturer;
        uint256 totalItems = _products[name].totalItems;
        return (id, name, url, manufacturer, totalItems);
    }

    /**
     * @dev Get the URL associated with a product.
     * @param name The name of the product.
     * @return The URL associated with the product.
     */
    function getInfo(string memory name) public view returns (string memory) {
        string memory url = _products[name].url;
        return url;
    }
}
