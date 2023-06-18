---
layout: post
title: GridFire, a music download store
date: 2023-06-18T12:02:52.162Z
published: true
categories:
  - Misc
tags:
  - gridfire
  - web3
  - ethereum
  - arbitrum
  - nft
image: /uploads/gridfire-screenshot.png
image-class: top
image-alt: A screenshot of the GridFire web app.
---
Introducing [GridFire](https://gridfire.app) -- a music download store with web3 payments and optional NFT-backed releases. It's a project I've been working on for a good while now, so I'm keen to share it and get some feedback.



Being web3-based, you'll need a suitable wallet to use it. I've been using Metamask, but it should just work with any wallet that supports the web3 API. It's required in order to log in, as well as for receiving payments or minting NFT editions of your releases. Given their polarising nature, I wish to stress that minting NFTs is entirely optional, so you can simply use it as your average music streaming/download service without ever dealing with the NFT side of things if you so wish.



Why web3? I figured it'd be an interesting way to try and offer a means of payment without having to work with payment processors or other third-parties. Plus, as you can use your wallet key to attest ownership of your account, it also makes it possible to use the system for logins, without dealing with additional passwords or authentication providers. In removing any reliance on third parties, the vast majority of sales head straight to your smart contract account, held to be withdrawn by you at any time. Rather than use the expensive Ethereum network for payments, GridFire uses the Arbitrum rollup -- a layer 2 network that bundles up many transactions into one Ethereum transaction, so that the cost of network transactions is shared between all users. In this manner, transaction costs should actually go _down_ with an increase in active users.



It's relatively esoteric, for sure. Getting your money on and off the Arbitrum network currently requires bridging your funds from one network to another, but it's not something you would be doing frequently. The hope is that with greater adoption, users would be able to pay directly into and out of the layer 2 ecosystems without needing to bridge at all. But we're not there yet.



Given our dwindling independent options, I wanted to try and offer an alternative platform to share and sell music directly from artists to fans. Please give it a shot and let me know if you encounter any issues, either via email here or on Twitter.