# Solana IDL
`IDL(Interface Definition Language)` 是一个 `JSON` 文件，描述了如何与 `Solana` 程序交互。它由 `Anchor` 框架自动生成。

定义新的函数并编译出 IDL json文件
```rust
use anchor_lang::prelude::*;

declare_id!("EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh");

#[program]
pub mod hello_world {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn inputuint(ctx: Context<Initialize>,a:u64,b:u64) -> Result<()> {
        msg!("You sent {} and {}", a, b);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

```
`Anchor build` 创建的 IDL（接口定义语言）。

它存储在target/idl/*.json 文件中:

```json
{
  "address": "EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh",
  "metadata": {
    "name": "hello_world",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [],
      "args": []
    },
    {
      "name": "inputuint",
      "discriminator": [
        43,
        19,
        43,
        59,
        112,
        239,
        173,
        71
      ],
      "accounts": [],
      "args": [
        {
          "name": "a",
          "type": "u64"
        },
        {
          "name": "b",
          "type": "u64"
        }
      ]
    }
  ]
}
```

“`Instructions`” 列表是程序支持的面向公众的函数，大致相当于以太坊合约中的外部函数和公共函数。

`Solana` 中的 `IDL` 文件的作用类似于 `Solidity` 中的 `ABI` 文件，指定如何与程序/合约进行交互。

## 函数解析
### initialize()
函数没有接受任何参数，所以args列表是空的。
### inputuint()
函数接受两个 `u64` 参数，所以args列表列出所需的参数名称和对应的类型。
### context 结构体

因为账户结构 `Initialize{}` 是空的，所以 `IDL` 中的账户列表也是空的。

现在让我们看看当结构体非空时会发生什么。复制下面的代码并替换 的内容 lib.rs。
```rust
use anchor_lang::prelude::*;

declare_id!("EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh");

#[program]
pub mod hello_world {
    use super::*;

    pub fn initialize(ctx: Context<NonEmptyAccountExample>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn inputuint(ctx: Context<NonEmptyAccountExample>,a:u64,b:u64) -> Result<()> {
        msg!("You sent {} and {}", a, b);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct NonEmptyAccountExample<'info>{
    signer:Signer<'info>,
}

```
现在运行`anchor build`——让我们看看在新的 `IDL` 中我们得到了什么。
```json
{
  "address": "EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh",
  "metadata": {
    "name": "hello_world",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "signer",
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "inputuint",
      "discriminator": [
        43,
        19,
        43,
        59,
        112,
        239,
        173,
        71
      ],
      "accounts": [
        {
          "name": "signer",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "a",
          "type": "u64"
        },
        {
          "name": "b",
          "type": "u64"
        }
      ]
    }
  ]
}
```

## Preference
[https://www.rareskills.io/post/anchor-idl](https://www.rareskills.io/post/anchor-idl)