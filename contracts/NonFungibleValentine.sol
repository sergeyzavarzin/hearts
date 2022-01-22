// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NonFungibleValentine is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    string public message;

    constructor() ERC721("NonFungibleValentine", "NFV") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://";
    }

    function safeMint(address to, string memory _message) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        message = _message;
        _safeMint(to, tokenId);
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}
