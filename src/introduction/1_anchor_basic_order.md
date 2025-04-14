# 开发环境
[Anchor](https://www.anchor-lang.com/docs)适用于开发 solana 项目的框架，
## 安装Anchor
安装 Anchor AVM
```shell
cargo install --git https://github.com/coral-xyz/anchor avm --force
```
安装Anchor最新版本
```shell
avm install latest
avm use latest
```
查询 Anchor 安装状态
```shell
anchor --version
```

## Anchor基础语句
`Anchor` 是构建 `Solana` 合约的框架

初始化项目
```shell
anchor init <project-name>
```
进入文件目录，构建/测试/部署文件
```shell
anchor build

anchor test 

anchor deploy
```

## 构建Hello_World项目
初始化本地项目
```shell
anchor init hello_world
```
创建成功输出
```text
/data/solana# anchor init hello_world
yarn install v1.22.22
info No lockfile found.
[1/4] Resolving packages...
warning mocha > glob@7.2.0: Glob versions prior to v9 are no longer supported
warning mocha > glob > inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
Done in 93.88s.
hint: Using 'master' as the name for the initial branch. This default branch name
hint: is subject to change. To configure the initial branch name to use in all
hint: of your new repositories, which will suppress this warning, call:
hint:
hint:   git config --global init.defaultBranch <name>
hint:
hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
hint: 'development'. The just-created branch can be renamed via this command:
hint:
hint:   git branch -m <name>
Initialized empty Git repository in /data/solana/hello_world/.git/
hello_world initialized
```
可能的失败1
```text
root@DESKTOP:/data/solana# anchor init hello_world
Error: yarn install failed: No such file or directory (os error 2)

Fix:
sudo apt remove cmdtest
sudo apt remove yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update
sudo apt-get install yarn -y
```

### 执行测试
同步节点数据
```shell
# shell 1
anchor keys sync
```
在本地区块链执行测试
```shell
anchor test --skip-local-validator
```
```text
root@DESKTOP:/data/solana/hello_world# anchor test --skip-local-validator
    Finished `release` profile [optimized] target(s) in 0.18s
    Finished `test` profile [unoptimized + debuginfo] target(s) in 0.06s
     Running unittests src/lib.rs (/data/solana/hello_world/target/debug/deps/hello_world-ed7c71a259c793bc)
Deploying cluster: http://127.0.0.1:8899
Upgrade authority: /root/.config/solana/id.json
Deploying program "hello_world"...
Program path: /data/solana/hello_world/target/deploy/hello_world.so...
Program Id: EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh

Signature: KJRp44wN1SvNjR5iu6nvzpWoDYQCVRxhuS32tVmFmGgF7ZL8EZM1XYjXA1gaFELAtSQKHQSankF8xiu3PuWgDBg

Deploy success

Found a 'test' script in the Anchor.toml. Running it as a test suite!

Running test suite: "/data/solana/hello_world/Anchor.toml"

yarn run v1.22.22
$ /data/solana/hello_world/node_modules/.bin/ts-mocha -p ./tsconfig.json -t 1000000 'tests/**/*.ts'


  hello_world
Your transaction signature 4Rmd8cmJzKxkj9NaccAcsqzvgZv69nrNtd1LVAiv8g6CBvvUYshXgQah1matnQLCqKm1DcCYCPcbFBYf3QzmTgnd
    ✔ Is initialized! (453ms)


  1 passing (456ms)

Done in 1.55s.
```

### 查看Solana运行日志

```solona
use anchor_lang::prelude::*;

declare_id!("EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh");

#[program]
pub mod hello_world {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
```
查看本地运行日志
```test
root@DESKTOP:/data/solana/hello_world# cat .anchor/program-logs/EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh.hello_world.log
Streaming transaction logs mentioning EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh. Confirmed commitment
Transaction executed in slot 2890:
  Signature: 4Rmd8cmJzKxkj9NaccAcsqzvgZv69nrNtd1LVAiv8g6CBvvUYshXgQah1matnQLCqKm1DcCYCPcbFBYf3QzmTgnd
  Status: Ok
  Log Messages:
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh invoke [1]
    Program log: Instruction: Initialize
    Program log: Greetings from: EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh consumed 11591 of 200000 compute units
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh success
```

## Preference
[https://www.rareskills.io/post/hello-world-solana](https://www.rareskills.io/post/hello-world-solana)

