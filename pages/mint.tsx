import { useAddress, useMetamask, useNFTDrop } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
// import "./styles/home_module.css";
import home from "./assets/home.png";
import Image from "next/image";

const Mint: NextPage = () => {
  const router = useRouter();
  const address = useAddress();

  const connectWithMetamask = useMetamask();

  const nftDropContract = useNFTDrop(
    "0x339B10a76E5e40Cda94B100400E26b55125aD18B"
  );

  const styles = {
    container:
      "w-screen h-screen flex flex-row items-center  bg-gradient-to-r from-black to-purple-900 text-white pt-5 pr-24 pl-10",
    h1: "flex text-center text-7xl font-bold italic",
    explain: "text-center w-8/12 my-8 text-xl",
    smallDivider: "",
    detailPageHr: "",
    mainButton: " px-4 py-2 rounded-xl bg-[#932CF9] font-bold",
    spacerBottom: "",
    connectWithMetamask: "",
  };

  async function claimNft() {
    try {
      const tx = await nftDropContract?.claim(1);
      console.log(tx);
      alert("NFT Claimed!");
      router.push(`/stakenft`);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <div className={styles.container}>
      <div className="w-full flex flex-col items-center ">
        <h1 className={styles.h1}>
          Mint & Stake <br></br>
          Sneaker Heads!
        </h1>

        <p className={styles.explain}>
          Lazy mint your NFTs for <b>FREE</b> and stake to earn rewards. Stake
          and withdraw your NFTs anytime.
        </p>
        <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />

        {!address ? (
          <button
            className={`${styles.mainButton} ${styles.spacerBottom}`}
            onClick={connectWithMetamask}
          >
            Connect Wallet
          </button>
        ) : (
          <button
            className={`${styles.mainButton} ${styles.spacerBottom}`}
            onClick={() => claimNft()}
          >
            Claim your NFT
          </button>
        )}
      </div>

      <div>
        <Image className="" src={home} width="1500" height="1500" />
      </div>
    </div>
  );
};

export default Mint;
