// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BeanToken
 * @dev ERC20 token for BeanStock rewards. Owner (shop) mints tokens to customers.
 */
contract BeanToken is ERC20, Ownable {
    uint256 public immutable cap;

    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);

    constructor(
        uint256 _cap,
        address initialOwner
    ) ERC20("BeanToken", "BEAN") Ownable(initialOwner) {
        require(_cap > 0, "cap>0");
        cap = _cap;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= cap, "cap exceeded");
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(_msgSender(), amount);
        emit TokensBurned(_msgSender(), amount);
    }
}
