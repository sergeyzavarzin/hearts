import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import nftContract from '../artifacts/contracts/Hearts.sol/Hearts.json';

const mintAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export const App = () => {
  const [wallet, setWallet] = useState();

  const connect = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setWallet(accounts[0]);
      } catch (err) {
        console.log({ err });
      }
    }
  };

  useEffect(() => {
    connect();
  }, []);

  const handleMint = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
      );

      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        mintAddress,
        nftContract.abi,
        signer,
      );

      try {
        const response = await contract.mint();
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>{wallet && <button onClick={handleMint}>MINT</button>}</div>
  );
};
