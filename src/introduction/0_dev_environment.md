# 开发环境

本书中，我们会学习：
1. 一套部署在 `Solana` 链上的智能合约
2. 链下调用 `Solana` 合约的 `SDK`

## 本地开发环境

我们将要搭建智能合约并且在 `Solana` 上运行它们，这意味着我们需要一个节点。
在本地测试和运行合约也需要一个节点。
曾经这使得智能合约开发十分麻烦，因为在一个真实节点上运行大量的测试会十分缓慢。
不过现在已经有了很多快速简洁的解决方案。
例如 [solana-test-validator](https://solana.com/zh/developers/cookbook/development/start-local-validator) 直接构建本地链，
不过这些工具的问题在于我们需要用 `JavaScript` 来写测试以及与区块链的交互。

### MetaMask

[MetaMask](https://metamask.io/) 是一个浏览器中的钱包。它是一个浏览器插件，可以安全地创建和存储私钥。Metamask 也是最常用的以太坊钱包应用，我们将使用它来与我们的本地运行的节点进行交互。

## [准备开发环境](https://solana.com/zh/docs/intro/installation#solana-cli-basics)

安装 Rust：
```shell
# install rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
```
安装 Solana cli
```shell
# install solana
sh -c "$(curl -sSfL https://release.anza.xyz/stable/install)"
```
`stable` 可以替换成版本`sh -c "$(curl -sSfL https://release.anza.xyz/v2.2.8/install)"`

查询目前的 `Solana` 版本 
`https://github.com/anza-xyz/agave/releases`

按照提示更新环境变量
```shell
root@DESKTOP-DGRESC:/data# sh -c "$(curl -sSfL https://release.anza.xyz/v2.2.8/install)"
downloading v2.2.8 installer
  ✨ 2.2.8 initialized
Adding
export PATH="/root/.local/share/solana/install/active_release/bin:$PATH" to /root/.profile

Close and reopen your terminal to apply the PATH changes or run the following in your existing shell:

export PATH="/root/.local/share/solana/install/active_release/bin:$PATH"
```

查询 Solana 安装状态
```shell
solana --version
```

更新 `Solana`
```shell
agave-install update
```

## [Solana基础语句](https://solana.com/zh/docs/intro/installation#solana-cli-basics)
获取本地Solana配置
```shell
solana config get
```
输出本地的Solana节点配置信息,包含RPC和WS节点端口
```text
Config File: /root/.config/solana/cli/config.yml
RPC URL: http://127.0.0.1:8899
WebSocket URL: ws://127.0.0.1:8900/ (computed)
Keypair Path: /root/.config/solana/id.json
Commitment: confirmed
```

设置本地的Solana的配置
```shell
solana config set --url mainnet-beta
solana config set --url devnet
solana config set --url localhost
solana config set --url testnet
```
创建钱包地址
```shell
solana-keygen new 
```
```text
root@DESKTOP:/data# solana-keygen new 
Generating a new keypair

For added security, enter a BIP39 passphrase

NOTE! This passphrase improves security of the recovery seed phrase NOT the
keypair file itself, which is stored as insecure plain text

BIP39 Passphrase (empty for none):

Wrote new keypair to /root/.config/solana/id.json
========================================================================================
pubkey: F6ohDifYRRZQxQnFtmFB2pv5Npv1DkFVatrHiKNpmdRN
```
在已经有钱包地址时，可以强制创建新的地址进行替换
```shell
solana-keygen new --force
```
查看 Solana 地址
```shell
solana address
```
更新Solane配置,使用本地区块链
```shell
solana config set --url localhost
```
```text
root@DESKTOP:/mnt/c/Users/user# solana config set --url localhost
Config File: /root/.config/solana/cli/config.yml
RPC URL: http://localhost:8899 
WebSocket URL: ws://localhost:8900/ (computed)
Keypair Path: /root/.co
```
打开 `Terminal2`,启动本地的 `Solana` 测试网
```shell
solana-test-validator
```
```text
root@DESKTOP:/data# solana-test-validator
Ledger location: test-ledger
Log: test-ledger/validator.log
⠁ Initializing...                                                                                                                                                                     
Waiting for fees to stabilize 1...
Identity: 6j3mWrGGANg4DNGMYfH8rYsGEoidbdbZhwnXcNQF188j
Genesis Hash: 83mKoAjvVNkPYaxnDtYbQh4NKEgi3KKjH71s8LGw8u61
Version: 2.2.8
Shred Version: 47078
Gossip Address: 127.0.0.1:1024
TPU Address: 127.0.0.1:1027
JSON RPC URL: http://127.0.0.1:8899
WebSocket PubSub URL: ws://127.0.0.1:8900
⠙ 00:00:26 | Processed Slot: 63 | Confirmed Slot: 63 | Finalized Slot: 32 | Full Snapshot Slot: - | Incremental Snapshot Slot: - | Transactions: 62 | ◎499.999690000
```

进入 Terminal1, 获取测试代币
```shell
solana airdrop 2
```
```text
root@DESKTOP-UUE34HN:/mnt/c/Users/user# solana airdrop 2
Requesting airdrop of 2 SOL

Signature: 4sZdqa2Jb9RGweDRGhek3nHfm4j3GDCVtALGQzRbxwfZDvbTsvnNgryKrcNcAcKgF5SgfZgvrXuuuZX6Xrgij6xd

500000002 SOL
```
查询账户余额
```shell
solana balance
```

## Preference
[https://www.rareskills.io/solana-tutorial](https://www.rareskills.io/solana-tutorial)

[https://solana.com/zh/docs/intro/installation](https://solana.com/zh/docs/intro/installation)