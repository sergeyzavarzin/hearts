import { ethers } from 'ethers';
import { ReactNode, useEffect, useState } from 'react';

import { connectWallet } from './utils/connectWallet';
import nftContract from '../artifacts/contracts/NonFungibleValentine.sol/NonFungibleValentine.json';

const mintAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export const App = () => {
  const [wallet, setWallet] = useState();
  const [status, setStatus] = useState<
    string | ReactNode | undefined
  >();

  const connect = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
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
    <div>
      {status}
      {wallet && <button onClick={handleMint}>MINT</button>}
    </div>
  );
};
