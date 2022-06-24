<p align="center">
<img width="600" alt="Screen Shot 2022-06-24 at 7 00 47 PM" src="https://user-images.githubusercontent.com/95723185/175720991-938da6b4-e263-4f15-8702-2002619c10b7.png">
  <p/>

> Get METAMORPHE NFTs with Dropp Tokens.

Sign in with your wallet and swap some ETH for some Dropp Tokens with the Dropp marketplace, then use them to buy METAMORPHE NFTs. After purchasing NFTs, your transaction information is provided at the bottom of the modal and at the bottom of the homepage. Feel free to view your transaction history anytime with the sidebar -> history page.

Essentially, it's a mini version of Rarible project page with a few added components.

<p align="center">
<img width="600" src="https://user-images.githubusercontent.com/95723185/175720862-c3a0eafb-7220-4be1-a544-842907e62579.gif" alt="animated" />
</p>


> Swap for Dropp Tokens

Using OpenZeppelin's ERC20 and Ownable contracts, the DroppCoin contract consists of a simple `mint(uint256 amount)` function that provides a conversion from ETH to Dropp coin with `require(msg.value == amount * 0.0001 ether, "invalid amount of ether")` and `_mint(msg.sender, amount)`.

[Contract Source](contracts/DroppCoin.sol)

## License

This app is open-source and licensed under the MIT license. For more details, check the [License file](LICENSE).
