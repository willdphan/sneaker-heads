import {
  ThirdwebNftMedia,
  useAddress,
  useMetamask,
  useNFTDrop,
  useToken,
  useTokenBalance,
  useOwnedNFTs,
  useContract,
} from "@thirdweb-dev/react";
import Image from "next/image";
import lace from "./assets/lace.png";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const nftDropContractAddress = "0x339B10a76E5e40Cda94B100400E26b55125aD18B";
const tokenContractAddress = "0x10fd03Ac4dD48243F0c4819a56e93590E7235112";
const stakingContractAddress = "0x090368FcbE2e5b3fE9516ee14351f5D3C8a45B2b";

const Stake: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();

  const nftDropContract = useNFTDrop(nftDropContractAddress);
  const tokenContract = useToken(tokenContractAddress);

  const { contract, isLoading } = useContract(stakingContractAddress);

  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);

  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  const [stakedNfts, setStakedNfts] = useState<any[]>([]);
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

  const styles = {
    container:
      "w-[100vw] h-screen flex flex-row justify-center items-start bg-gradient-to-r from-black to-purple-900 text-white pl-24",
    h1: "text-5xl mt-14 font-semibold text-white italic",
    h2: "text-3xl mt-10 mb-6 font-md font-semibold italic",
    h3: "text-2xl mb-4 font-semibold mr-10 items-center justify-center italic",
    tokenGrid: "flex flex-col space-y-3",
    tokenLabel: "flex text-xl font-bold text-[#932CF9]",
    tokenItem: "flex flex-col",
    tokenValue: "flex mr-10 gap-x-2",
    mainButton: "mt-4 bg-[#932CF9] py-2 px-4 rounded-xl mb-1",
    nftBoxGrid: "flex flex-row gap-x-10",
    nftBox: "flex flex-col items-center rounded-xl mb-0 px-2 py-2 bg-[#181819]",
    nftMedia: "w-[175px] mb-5 rounded-xl",
    spacerTop: "",
    spacerBottom: "",
  };

  useEffect(() => {
    if (!contract) return;

    async function loadStakedNfts() {
      const stakedTokens = await contract?.call("getStakedTokens", address);

      // For each staked token, fetch it from the sdk
      const stakedNfts = await Promise.all(
        stakedTokens?.map(
          async (stakedToken: { staker: string; tokenId: BigNumber }) => {
            const nft = await nftDropContract?.get(stakedToken.tokenId);
            return nft;
          }
        )
      );

      setStakedNfts(stakedNfts);
      console.log("setStakedNfts", stakedNfts);
    }

    if (address) {
      loadStakedNfts();
    }
  }, [address, contract, nftDropContract]);

  useEffect(() => {
    if (!contract || !address) return;

    async function loadClaimableRewards() {
      const cr = await contract?.call("availableRewards", address);
      console.log("Loaded claimable rewards", cr);
      setClaimableRewards(cr);
    }

    loadClaimableRewards();
  }, [address, contract]);

  ///////////////////////////////////////////////////////////////////////////
  // Write Functions
  ///////////////////////////////////////////////////////////////////////////
  async function stakeNft(id: BigNumber) {
    if (!address) return;

    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddress
    );
    // If not approved, request approval
    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
    }
    const stake = await contract?.call("stake", id);
  }

  async function withdraw(id: BigNumber) {
    const withdraw = await contract?.call("withdraw", id);
  }

  async function claimRewards() {
    const claim = await contract?.call("claimRewards");
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.container}>
      {!address ? (
        <button className={styles.mainButton} onClick={connectWithMetamask}>
          Connect Wallet
        </button>
      ) : (
        <>
          <div className="flex flex-col items-start mt-64 mr-24 space-y-6">
            <h2 className={styles.h1}>Tokens</h2>

            <div className={styles.tokenGrid}>
              <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Claimable Rewards</h3>
                <p className={styles.tokenValue}>
                  <b>
                    {!claimableRewards
                      ? "Loading..."
                      : ethers.utils.formatUnits(claimableRewards, 18)}
                  </b>{" "}
                  {tokenBalance?.symbol}{" "}
                  <Image src={lace} width="30" height="25" />
                </p>
              </div>
              <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Current Balance</h3>
                <p className={styles.tokenValue}>
                  <b>{tokenBalance?.displayValue}</b> {tokenBalance?.symbol}
                  <Image src={lace} width="30" height="25" />
                </p>
              </div>
            </div>

            <button
              className={`${styles.mainButton} ${styles.spacerTop}`}
              onClick={() => claimRewards()}
            >
              Claim Rewards
            </button>
          </div>

          <div>
            <div>
              <h2 className={styles.h2}>Staked NFTs</h2>
              <div className={styles.nftBoxGrid}>
                {stakedNfts?.map((nft) => (
                  <div
                    className={styles.nftBox}
                    key={nft.metadata.id.toString()}
                  >
                    <ThirdwebNftMedia
                      metadata={nft.metadata}
                      className={styles.nftMedia}
                    />
                    <h3 className="font-semibold">{nft.metadata.name}</h3>
                    <button
                      className={`${styles.mainButton} ${styles.spacerBottom}`}
                      onClick={() => withdraw(nft.metadata.id)}
                    >
                      Withdraw
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className={styles.h2}>Unstaked NFTs</h2>

              <div className={styles.nftBoxGrid}>
                {ownedNfts?.map((nft) => (
                  <div
                    className={styles.nftBox}
                    key={nft.metadata.id.toString()}
                  >
                    <ThirdwebNftMedia
                      metadata={nft.metadata}
                      className={styles.nftMedia}
                    />
                    <h3 className="font-semibold">{nft.metadata.name}</h3>
                    <button
                      className={`${styles.mainButton} ${styles.spacerBottom}`}
                      onClick={() => stakeNft(nft.metadata.id)}
                    >
                      Stake
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Stake;
