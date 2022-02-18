import { useEffect, useState, useRef } from 'react'

import { ethers } from 'ethers'

import axios from 'axios'
import Web3Modal from "web3modal"

import * as THREE from 'three';

import { useRouter } from 'next/router'

import { Item } from '../../components/Item'

import {
  nftaddress, nftmarketaddress
} from '../../config'

import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'

import { OneMinusDstAlphaFactor } from 'three'

export default function NFTView() {

  const router = useRouter();
  const el = useRef();

  const { tokenId } = router.query

  const [nft, setNft] = useState()
  const [loadingState, setLoadingState] = useState('not-loaded')

  const [ file, setFile ] = useState();
  const [ size, setSize ] = useState();

  useEffect(() => {
    setSize([el.current.offsetWidth, el.current.offsetHeight])
  }, [])
  
  useEffect(() => {
    tokenId && (async () => {
      const provider = new ethers.providers.JsonRpcProvider("https://rpcb.genesisL1.org")
      const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
      const tokenUri = await tokenContract.tokenURI(tokenId)
      const file = (await axios.get(tokenUri)).data
      setFile(file.image);
    })()

  }, [ tokenId ])
  
  return (
    <div className="flex justify-center" style={{ flex: 1, display: 'flex' }} ref={el}>
      {file && size &&
      <iframe
        allowFullScreen={true}
        src={`https://www.ncbi.nlm.nih.gov/Structure/icn3d/full.html?width=${size[0]}&height=${size[1]}&showcommand=0&shownote=0&mobilemenu=0&showtitle=0&url=${file}`}
        style={{ border: 'none', flex: 1 }}
      />
      }
    </div>
  )
}