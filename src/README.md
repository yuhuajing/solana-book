#  Web3 Uniswap DEX Development Book

## Useful Links
1. This book is hosted on GitHub: <https://github.com/yuhuajing/uniswap-book>
2. Page in <https://yuhuajing.github.io/uniswap-book/>

## Table of Contents
- [背景]()
    - [Solidity-Fixed-Point](uniswap/background/solidity-fixed-point.md)
    - [ERC4626](uniswap/background/TokenVaults.md)
    - [闪电贷Flashloan](uniswap/background/Flashloan.md)
    - [去中心化交易所](uniswap/background/introduction-to-markets.md)
    - [恒定乘积公式](uniswap/background/constant-function-market-maker.md)
    - [价格操纵](uniswap/background/price-manipulation.md)

## Running locally

To run the book locally:
1. Install [Rust](https://www.rust-lang.org/).
1. Install [mdBook](https://github.com/rust-lang/mdBook):
    ```shell
    $ cargo install mdbook
    $ cargo install mdbook-katex
    ```
1. Clone the repo:
    ```shell
    $ git clone https://github.com/yuhuajing/uniswap-book.git
    $ cd uniswap-book
    ```
1. Run:
    ```shell
    $ mdbook serve --open
    ```
1. Visit http://localhost:3000/ (or whatever URL the previous command outputs!)
