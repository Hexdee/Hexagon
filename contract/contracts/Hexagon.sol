//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Hexagon {
    modifier OnlyManufacturer() {
        require(
            isManufacturer(msg.sender),
            "only manufacturers can call this function!"
        );
        _;
    }

    modifier OnlyProductManufacturer(string memory productName) {
        require(
            _products[productName].manufacturer == msg.sender,
            "only product manufacturers can call this function!"
        );
        _;
    }

    modifier isValidProduct(string memory productName) {
        require(_products[productName].id > 0, "invalid product!");
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

    constructor() {}

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

    function createProduct(string memory name, string memory url)
        public
        OnlyManufacturer
    {
        totalProducts++;
        _products[name] = Product(totalProducts, name, url, msg.sender, 0);
        _manufacturers[_manufacturersId[msg.sender]].products.push(name);
    }

    function updateProduct(string memory productName, string memory url)
        public
        isValidProduct(productName)
        OnlyProductManufacturer(productName)
    {
        _products[productName].url = url;
    }

    function createItems(string memory productName, bytes32[] memory codeHashes)
        public
        isValidProduct(productName)
        OnlyProductManufacturer(productName)
    {
        for (uint256 i = 0; i < codeHashes.length; i++) {
            // Confirm product exist
            require(_products[productName].id > 0, "invalid product!");
            // Confirm that code does not exist
            require(
                !(_items[productName][codeHashes[i]].codeHash.length == 0),
                "code exist!"
            );
            _items[productName][codeHashes[i]] = Item(
                codeHashes[i],
                productName,
                false
            );
        }
        _products[productName].totalItems += codeHashes.length;
    }

    function checkAuthenticity(string memory productName, bytes32 code)
        public
        isValidProduct(productName)
    {
        bytes32 _codeHash = keccak256(abi.encode(code));
        require(
            bytes(_items[productName][_codeHash].product).length > 0,
            "code invalid!"
        );
        require(
            _items[productName][_codeHash].bougth == false,
            "product bought!"
        );

        _items[productName][_codeHash].bougth = true;
    }

    function getManufacturer(address manufacturer)
        public
        view
        returns (
            uint256,
            string memory,
            address,
            string[] memory
        )
    {
        require(isManufacturer(manufacturer), "not a manufacturer");
        uint256 id = _manufacturersId[manufacturer];
        string memory name = _manufacturers[id].name;
        address wallet = _manufacturers[id].wallet;
        string[] memory products = _manufacturers[id].products;
        return (id, name, wallet, products);
    }

    function isManufacturer(address user) public view returns (bool) {
        if (_manufacturersId[user] > 0) {
            return true;
        }
        return false;
    }

    function getProduct(string memory name)
        public
        view
        isValidProduct(name)
        returns (
            uint256,
            string memory,
            string memory,
            address,
            uint256
        )
    {
        uint256 id = _products[name].id;
        string memory url = _products[name].url;
        address manufacturer = _products[name].manufacturer;
        uint256 totalItems = _products[name].totalItems;
        return (id, name, url, manufacturer, totalItems);
    }

    function getInfo(string memory name) public view returns (string memory) {
        string memory url = _products[name].url;
        return url;
    }
}
