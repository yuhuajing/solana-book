# Deploy
`solana-test-validator --reset` 重启本地链，查看 `Solana` 网络的合约部署
## Solana 合约可升级
`Solana` 合约没有初始化参数的构造函数

`anchor deploy` 合约部署的 `instructions` 日志：

```json
root@DESKTOP:/data/solana/hello_world# anchor deploy
Deploying cluster: http://127.0.0.1:8899
Upgrade authority: /root/.config/solana/id.json
Deploying program "hello_world"...
Program path: /data/solana/hello_world/target/deploy/hello_world.so...
Program Id: EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh

Signature: 2jv5wZyaucDk7EE7ep7RqiVn12jhVKF5NLVt8ysNpFZaJDnMD2XytE7JXutennbDuJRMd6cQSCVkepBbpttXZanq

Deploy success
```
部署日志：
```json
Transaction executed in slot 1572:
  Signature: 2jv5wZyaucDk7EE7ep7RqiVn12jhVKF5NLVt8ysNpFZaJDnMD2XytE7JXutennbDuJRMd6cQSCVkepBbpttXZanq
  Status: Ok
  Log Messages:
    Program 11111111111111111111111111111111 invoke [1]
    Program 11111111111111111111111111111111 success
    Program BPFLoaderUpgradeab1e11111111111111111111111 invoke [1]
    Program 11111111111111111111111111111111 invoke [2]
    Program 11111111111111111111111111111111 success
    Deployed program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh
    Program BPFLoaderUpgradeab1e11111111111111111111111 success
    Program ComputeBudget111111111111111111111111111111 invoke [1]
    Program ComputeBudget111111111111111111111111111111 success
    Program ComputeBudget111111111111111111111111111111 invoke [1]
    Program ComputeBudget111111111111111111111111111111 success
```


现在到了最有趣的部分: 修改或增加函数 
```rust
    pub fn inputuint(ctx: Context<NonEmptyAccountExample>,a:u64) -> Result<()> {
        msg!("Result = {}", a);
        Ok(())
    }
```
`anchor deploy` 再次部署合约：
```json
Transaction executed in slot 1793:
  Signature: bevHe8sR6thbSWdQ453DsgEMNqYryZDdRuiYyDvd6XwuNadZ3vEnpfEQAsnunDJohy8dTPfhK77xx9QRkhgbSEH
  Status: Ok
  Log Messages:
    Program BPFLoaderUpgradeab1e11111111111111111111111 invoke [1]
    Upgraded program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh
    Program BPFLoaderUpgradeab1e11111111111111111111111 success
    Program ComputeBudget111111111111111111111111111111 invoke [1]
    Program ComputeBudget111111111111111111111111111111 success
    Program ComputeBudget111111111111111111111111111111 invoke [1]
    Program ComputeBudget111111111111111111111111111111 success
```

- 程序部署到了同一个地址，但是这次是升级，而不是部署。 
- 程序 ID 未改变，但是程序代码被覆盖了。 
- `Solana` 没有 `delegatecall`，因为可以直接升级合约代码，不需要代理模式下的数据逻辑分离。

## 修改测试代码，调用已部署的 Program ID
将测试修改如下：
```javascript
import * as anchor from "@coral-xyz/anchor";
import { Program,AnchorError  } from "@coral-xyz/anchor";
import { HelloWorld } from "../target/types/hello_world";
import { assert } from "chai";

import fs from 'fs'
let idl = JSON.parse(fs.readFileSync('target/idl/hello_world.json', 'utf-8'))

describe("hello_world", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  // const programID = "EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh";
  const program = new Program(idl,  anchor.getProvider());
  //const program = anchor.workspace.helloWorld as Program<HelloWorld>;

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
  
});

```
现在，使用以下命令运行测试：

`anchor test --skip-local-validator --skip-deploy`

现在查看日志终端：

```json
Transaction executed in slot 3045:
  Signature: 2xrxo8huKGbHYKNomKHq9kNj3ZRCRQGmntwxEojjyEDR7jMFi1BQf9FtU6nnoVBASgbayg51CM8n825N8X9vz9WW
  Status: Ok
  Log Messages:
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh invoke [1]
    Program log: Instruction: Inputuint
    Program log: Result = 50
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh consumed 844 of 200000 compute units
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh success
```

我们看到初始化指令被执行了，但是程序既没有部署也没有升级，因为我们使用了 `--skip-deploy` 带有锚点测试的参数。
