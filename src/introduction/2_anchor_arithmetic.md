# 数学运算
使用 `anchor` 实现数学运算 `+, -, x,÷, sqrt,log10`
## 函数传参
### 函数输入 uint 
```rust
    pub fn inputuint(ctx: Context<Initialize>,a:u64,b:u64) -> Result<()> {
        msg!("You sent {} and {}", a, b);
        Ok(())
    }
```
测试函数的输入
```javascript
  it("Is Inputs Data!", async () => {
    // Add your test here.
    const tx = await program.methods.inputuint(new anchor.BN(777), new anchor.BN(888)).rpc();
    console.log("Your transaction signature", tx);
  });
```
执行测试，查看输出 `anchor test --skip-local-validator`
```text
Transaction executed in slot 120691:
  Signature: kqBYbYbicSaf7ESyeXFqghZ1zWdjTHvYH3hGZMwYkxzBQzoDpLv96YBeYwP1o7PTjL4YhBbG4tTjxybdLtG7pNm
  Status: Ok
  Log Messages:
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh invoke [1]
    Program log: Instruction: Inputuint
    Program log: You sent 777 and 888
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh consumed 826 of 200000 compute units
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh success
```

### 函数输入 string
```rust
    pub fn inputstring(ctx: Context<Initialize>,message:String) -> Result<()> {
        msg!("You sent message {}", message);
        Ok(())
    }
```
测试函数的输入
```javascript
  it("Is Inputs String!", async () => {
    // Add your test here.
    const tx = await program.methods.inputstring("Hello_World").rpc();
    console.log("Your transaction signature", tx);
  });
```
执行测试，查看输出 `anchor test --skip-local-validator`
```text
Transaction executed in slot 121222:
  Signature: 3TZX3kBDsVoLJ3JDJqxfzak2yaJDHnjNfzxS8EYm8T46fdetQJ8mLZE5LRdLpBfPk93aeUCABMEAy5wB8QRxMRJ5
  Status: Ok
  Log Messages:
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh invoke [1]
    Program log: Instruction: Inputstring
    Program log: You sent message Hello_World
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh consumed 861 of 200000 compute units
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh success
```

### 函数输入 Array
```rust
    pub fn inputarray(ctx: Context<Initialize>,arr:Vec<u64>) -> Result<()> {
        msg!("You sent array {:?}", arr);
        Ok(())
    }
```
测试函数的输入
```javascript
  it("Is Inputs Array!", async () => {
    // Add your test here.
    const tx = await program.methods.inputarray([new anchor.BN(123), new anchor.BN(196)]).rpc();
    console.log("Your transaction signature", tx);
  });
```
执行测试，查看输出 `anchor test --skip-local-validator`
```text
Transaction executed in slot 121602:
  Signature: 5odZizGn7QXmwHLmJpc85BAv6eZuGJzyRGFcmcjegEMo7BBwBP8etXR47EgPNSnJMgYkocHZ2Ns4quHYyH57fKWZ
  Status: Ok
  Log Messages:
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh invoke [1]
    Program log: Instruction: Inputarray
    Program log: You sent array [12, 19]
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh consumed 1059 of 200000 compute units
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh success
```
### 函数输入 Float
```rust
    pub fn inputfloat(ctx: Context<Initialize>,value:f32) -> Result<()> {
        msg!("You sent float value {}", value.cbrt()); // 立方根
        Ok(())
    }
```
测试函数的输入
```javascript
  it("Is Inputs float!", async () => {
    // Add your test here.
    const tx = await program.methods.inputfloat(123.456).rpc();
    console.log("Your transaction signature", tx);
  });
```
执行测试，查看输出 `anchor test --skip-local-validator`
```text
Transaction executed in slot 122472:
  Signature: 2uUN214m7WwdFhZhSXcUZLGcMyN7q8NxRMXmnd8MokaG2cD3Y7r8FSMuwCdANWPzewtehLCDCowm4hrUidbQHTy3
  Status: Ok
  Log Messages:
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh invoke [1]
    Program log: Instruction: Inputfloat
    Program log: You sent float value 4.979328
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh consumed 3570 of 200000 compute units
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh success
```
## 数学运算
### 运算溢出
#### overflow-checks = true in Cargo.toml
作用于全局的数据安全校验，在 `config.toml` 中设置 `overflow-checks = true`

测试数据相减溢出，会直接报错
```javascript
  it("Is sub overflow!", async () => {
    // Add your test here.
    const tx = await program.methods.suboverflow(new anchor.BN(1), new anchor.BN(2)).rpc();
    console.log("Your transaction signature", tx);
  });
```

```text
    1) Is sub overflow!


  5 passing (2s)
  1 failing

  1) hello_world
       Is sub overflow!:
     Error: Simulation failed.
Message: Transaction simulation failed: Error processing Instruction 0: Program failed to complete.
Logs:
[
  "Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh invoke [1]",
  "Program log: Instruction: Suboverflow",
  "Program log: panicked at programs/hello_world/src/lib.rs:35:68:\nattempt to subtract with overflow",
  "Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh consumed 1487 of 200000 compute units",
  "Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh failed: SBF program panicked"
].
Catch the `SendTransactionError` and call `getLogs()` on it for full details.
      at Connection.sendEncodedTransaction (node_modules/@solana/web3.js/src/connection.ts:6047:13)
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      at Connection.sendRawTransaction (node_modules/@solana/web3.js/src/connection.ts:6003:20)
      at sendAndConfirmRawTransaction (node_modules/@coral-xyz/anchor/src/provider.ts:396:25)
      at AnchorProvider.sendAndConfirm (node_modules/@coral-xyz/anchor/src/provider.ts:167:14)
      at MethodsBuilder.rpc [as _rpcFn] (node_modules/@coral-xyz/anchor/src/program/namespace/rpc.ts:29:16)

error Command failed with exit code 1.
```
#### checked_*
全局的数据校验会增加额外的 `Instructions` 消耗，因此可以在每次执行运行的地方执行安全的数据运算
- checked_*，安全的数据运算
  - checked_add, y.checked_add(z).unwrap(); // will panic if overflow happens
  - checked_sub，y.checked_sub(z).unwrap(); // will panic if overflow happens
  - checked_mul，y.checked_mul(z).unwrap(); // will panic if overflow happens
  - checked_div，y.checked_div(z).unwrap(); // will panic if overflow happens
  - checked_pow，y.checked_pow(z).unwrap(); // will panic if overflow happens

关闭全局数据校验，查看数据减法（0-1）的溢出：
```text
Transaction executed in slot 128998:
  Signature: 3VQtQjvLD5HG71vGTJjkAYPFMm8XtLNmNWtxjRGkQMxKCaUzEhWhmiEc78iHAg6CAcDYD1Bt5BHrYgHdEzVyjALg
  Status: Ok
  Log Messages:
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh invoke [1]
    Program log: Instruction: Suboverflow
    Program log: You sent value 1 and 2, the sub result is 18446744073709551615
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh consumed 1102 of 200000 compute units
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh success
```
通过 `checked_*` 运算，在数据溢出的时候抛出异常
```rust
    pub fn suboverflow(ctx: Context<Initialize>,a:u64,b:u64) -> Result<()> {
        msg!("You sent value {} and {}, the sub result is {}", a,b,a.checked_sub(b).unwrap());
        Ok(())
    }
```
```text
    1) Is sub overflow!


  5 passing (2s)
  1 failing

  1) hello_world
       Is sub overflow!:
     Error: Simulation failed.
Message: Transaction simulation failed: Error processing Instruction 0: Program failed to complete.
Logs:
[
  "Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh invoke [1]",
  "Program log: Instruction: Suboverflow",
  "Program log: panicked at programs/hello_world/src/lib.rs:35:85:\ncalled `Option::unwrap()` on a `None` value",
  "Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh consumed 1599 of 200000 compute units",
  "Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh failed: SBF program panicked"
].
Catch the `SendTransactionError` and call `getLogs()` on it for full details.
      at Connection.sendEncodedTransaction (node_modules/@solana/web3.js/src/connection.ts:6047:13)
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      at Connection.sendRawTransaction (node_modules/@solana/web3.js/src/connection.ts:6003:20)
      at sendAndConfirmRawTransaction (node_modules/@coral-xyz/anchor/src/provider.ts:396:25)
      at AnchorProvider.sendAndConfirm (node_modules/@coral-xyz/anchor/src/provider.ts:167:14)
      at MethodsBuilder.rpc [as _rpcFn] (node_modules/@coral-xyz/anchor/src/program/namespace/rpc.ts:29:16)



error Command failed with exit code 1.
```
### Float 运算
`Solana Rust` 支持 `float` 类型数据直接执行数学运算，但是 `instructions` 花销比 `uint` 运算大得多
#### Sqrt
```text
    pub fn sqrt(ctx: Context<Initialize>,a:f32) -> Result<()> {
        msg!("You sent value {} , the sqrt result is {}", a, a.sqrt());
        Ok(())
    }
    pub fn inputfloat(ctx: Context<Initialize>,value:f32) -> Result<()> {
        msg!("You sent float value {}", value.cbrt()); // 立方根
        Ok(())
    }
```

[完整rs](./1_lib.rs)

[完整测试test](./1_test.ts)

## Reference
[https://docs.rs/num/latest/num/](https://docs.rs/num/latest/num/)

[https://www.rareskills.io/post/rust-arithmetic-operators](https://www.rareskills.io/post/rust-arithmetic-operators)