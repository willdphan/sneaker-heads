# Sneaker Head NFT Mint and Stake

<p align="center">
<img width="600" alt="Screen Shot 2022-06-24 at 7 00 47 PM" src="https://user-images.githubusercontent.com/95723185/175720991-938da6b4-e263-4f15-8702-2002619c10b7.png">
  <p/>

> Mint Sneaker Head NFTs!

Sign in with your wallet and lazy mint your NFTs for free. Stake and withdraw your NFTs anytime! Built with the ThirdWeb SDK.

<p align="center">
<img width="600" src="https://user-images.githubusercontent.com/95723185/175720862-c3a0eafb-7220-4be1-a544-842907e62579.gif" alt="animated" />
</p>

> Stake and claim rewards.

Using OpenZeppelin's ERC20, ERC721, SafeERC20, and ReentrancyGuard contracts, the Mint contract consists of `stake(uint256 _tokenId)`, `withdraw(uint256 _tokenId)`, `claimRewards()`, `availableRewards(address _staker)`, `getStakedTokens(address _user)`, and `calculateRewards(address _staker)` functions.

[Contract Source](contracts/DroppCoin.sol)
