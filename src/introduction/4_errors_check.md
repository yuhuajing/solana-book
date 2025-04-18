# Errors Check
## If
用户自定义错误类型，按照定义顺序错误码从 `6000` 依次递增
```rust
#[error_code]
pub enum MyError {
    #[msg("a is too small")]
    AisTooSmall, //6000
    #[msg("a is too big")]
    AisTooBig, //6001
    #[msg("Always errors")]  // NEW ERROR, what do you think the error code will be?
    AlwaysErrors, //6001
}
```
简单判断数据输入，根据用户输入的数值进入不同的判断分支：
```rust
use anchor_lang::prelude::*;

declare_id!("EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh");

#[program]
pub mod hello_world {
    use super::*;

    pub fn inputuint(ctx: Context<NonEmptyAccountExample>,a:u64) -> Result<()> {
        if a < 10 {
            msg!("Will not print this message like a < 10?");
            return err!(MyError::AisTooSmall);
        }
        if a > 100 {
            return err!(MyError::AisTooBig);
        }
        msg!("Result = {}", a);
        Ok(())
    }
    // NEW FUNCTION
    pub fn func(ctx: Context<NonEmptyAccountExample>) -> Result<()> {
        msg!("Will not print this message?");
        return err!(MyError::AlwaysErrors);
    }
}

#[derive(Accounts)]
pub struct NonEmptyAccountExample<'info>{
    signer:Signer<'info>,
}

#[error_code]
pub enum MyError {
    #[msg("a is too small")]
    AisTooSmall,
    #[msg("a is too big")]
    AisTooBig,
    #[msg("Always errors")]  // NEW ERROR, what do you think the error code will be?
    AlwaysErrors,
}
```
执行测试用例
```javascript
import * as anchor from "@coral-xyz/anchor";
import { Program,AnchorError  } from "@coral-xyz/anchor";
import { HelloWorld } from "../target/types/hello_world";
import { assert } from "chai";

describe("hello_world", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.helloWorld as Program<HelloWorld>;

  it("Input test", async () => {
    // Add your test here.
    try {
      const tx = await program.methods.inputuint(new anchor.BN(9)).rpc();
      console.log("Your transaction signature", tx);
    } catch (_err) {
      assert.isTrue(_err instanceof AnchorError);
      const err: AnchorError = _err;
      const errMsg =
        "a is too small";
      assert.strictEqual(err.error.errorMessage, errMsg);
      console.log("Error number:", err.error.errorCode.number);
    }

    try {
      const tx = await program.methods.inputuint(new anchor.BN(101)).rpc();
      console.log("Your transaction signature", tx);
    } catch (_err) {
      assert.isTrue(_err instanceof AnchorError);
      const err: AnchorError = _err;
      const errMsg =
        "a is too big";
      assert.strictEqual(err.error.errorMessage, errMsg);
      console.log("Error number:", err.error.errorCode.number);
    }


    try {
      const tx = await program.methods.inputuint(new anchor.BN(50)).rpc();
      console.log("Your transaction signature", tx);
    } catch (_err) {
      console.log("Error Message:", _err.error.errMsg);
    }
  });


  it("Error test", async () => {
    // Add your test here.
    try {
      const tx = await program.methods.func().rpc();
      console.log("Your transaction signature", tx);
    } catch (_err) {
      assert.isTrue(_err instanceof AnchorError);
      const err: AnchorError = _err;
      const errMsg =
        "Always errors";
      assert.strictEqual(err.error.errorMessage, errMsg);
      console.log("Error number:", err.error.errorCode.number);
    }
  });
  
});
```
需要注意的是：
- 用户自定义的错误码从 `6000` 按照定义顺序依次递增，因此，抛出的错误码和定义顺序相关
- `return err!()` 的函数，整笔交易回滚，`msg!()` 的数据不会被打印到 `logs` 中
- 只有最后返回 `Ok(())` 的函数，才会将 `msg!()` 数据成功记录到 `logs` 中

## require
require 判断数据
```rust
use anchor_lang::prelude::*;

declare_id!("EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh");

#[program]
pub mod hello_world {
    use super::*;

    pub fn inputuint(ctx: Context<NonEmptyAccountExample>,a:u64) -> Result<()> {
        require!(a > 10, MyError::AisTooSmall);
        require!(a < 100, MyError::AisTooBig);
        msg!("Result = {}", a);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct NonEmptyAccountExample<'info>{
    signer:Signer<'info>,
}

#[error_code]
pub enum MyError {
    #[msg("a is too small")]
    AisTooSmall,
    #[msg("a is too big")]
    AisTooBig,
    #[msg("Always errors")]  // NEW ERROR, what do you think the error code will be?
    AlwaysErrors,
}
```

正确输入的 `logs` 执行输出
```json
Transaction executed in slot 199328:
  Signature: 29YX4ra8GYwW7yAeX4kjg8rQ5z3F8NUFy386hEeW1wR8Vj9Q5ij6it2MYpjze1gKk2udAHPfnKdruq7h1gDDdVVX
  Status: Ok
  Log Messages:
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh invoke [1]
    Program log: Instruction: Inputuint
    Program log: Result = 50
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh consumed 855 of 200000 compute units
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh success
```
## Preference
[https://www.anchor-lang.com/docs/features/errors](https://www.anchor-lang.com/docs/features/errors)