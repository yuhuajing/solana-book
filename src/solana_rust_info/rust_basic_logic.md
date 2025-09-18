# Rust 基础语句
## Data Types
### Constant
`const` 关键词修饰的常量字符，字符不允许在函数中修改
```rust
use anchor_lang::prelude::*;

declare_id!("EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh");

const MEANING_OF_LIFE_AND_EXISTENCE: u64 = 42;

#[program]
pub mod hello_world {
    use super::*;
    
    pub fn printmsg(ctx: Context<Initialize>) -> Result<()> {
        msg!("constant msg = {}", MEANING_OF_LIFE_AND_EXISTENCE);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
```
### usize
`Solana` 链上数据长度的类型是 `usize`, 需要转换成才能参与运算
```rust
use anchor_lang::prelude::*;

declare_id!("EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh");

const MEANING_OF_LIFE_AND_EXISTENCE: u64 = 42;

#[program]
pub mod hello_world {
    use super::*;

    pub fn printmsg(ctx: Context<Initialize>) -> Result<()> {
        let mut myarray: Vec<u32> = Vec::from([1,2,3,4,5,6]);
        myarray.push(7);
        let length = myarray.len();
        msg!("constant msg = {}",length as u64 + MEANING_OF_LIFE_AND_EXISTENCE);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
```
测试结果：
```json
Transaction executed in slot 10699:
  Signature: 5ewf9U5jyPtgeb9iDhB1uidjUmRGEW8nmveqrAJKHp7ekV3sTVCnBF63axzFPDVabkBBa9xqD4nVUraDmDQ5Shg9
  Status: Ok
  Log Messages:
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh invoke [1]
    Program log: Instruction: Printmsg
    Program log: constant msg = 49
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh consumed 724 of 200000 compute units
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh success
```
### Fixed array
在定义数组时直接指定数据类型和数组大小：`[types,size]`
```rust
use anchor_lang::prelude::*;

declare_id!("EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh");

const MEANING_OF_LIFE_AND_EXISTENCE: u64 = 42;

#[program]
pub mod hello_world {
    use super::*;

    pub fn printmsg(ctx: Context<Initialize>) -> Result<()> {
        let mut myarray: [u32;5] = [1,2,3,4,5];
        myarray[0] = 6;
        let length = myarray.len();
        msg!("array msg = {:?}",myarray);
        msg!("constant msg = {}",length as u64 + MEANING_OF_LIFE_AND_EXISTENCE);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
```
测试结果：
```json
Transaction executed in slot 12642:
  Signature: dP7vmVdh78iqN2gKf3317euLpkGK56BaAmtPRWroVCtjA3DnXybXBvLJ7LwoLUQUFLHvMimDWMhGAPwDaRLkxKP
  Status: Ok
  Log Messages:
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh invoke [1]
    Program log: Instruction: Printmsg
    Program log: array msg = [6, 2, 3, 4, 5]
    Program log: constant msg = 47
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh consumed 2040 of 200000 compute units
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh success
```
### Dynamic array
通过 Vec 定义动态数组
```rust
use anchor_lang::prelude::*;

declare_id!("EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh");

const MEANING_OF_LIFE_AND_EXISTENCE: u64 = 42;

#[program]
pub mod hello_world {
    use super::*;

    pub fn printmsg(ctx: Context<Initialize>) -> Result<()> {
        let mut myarray: Vec<u32> = Vec::from([1,2,3,4,5,6]);
        myarray.push(7);
        myarray[0] = myarray[6];
        myarray.pop();
        let length = myarray.len();
        msg!("array msg = {:?}",myarray);
        msg!("constant msg = {}",length as u64 + MEANING_OF_LIFE_AND_EXISTENCE);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
```
测试结果：
```json
Transaction executed in slot 11705:
  Signature: 5Vx84rQa8ybxziWge5yWvbqrKVUiEWLEkyB5nE5k7oGPm53zh11Hvza85SEAUSXCrbgq9KgBFkfycfh1xgM3RwHx
  Status: Ok
  Log Messages:
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh invoke [1]
    Program log: Instruction: Printmsg
    Program log: array msg = [7, 2, 3, 4, 5, 6]
    Program log: constant msg = 48
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh consumed 2395 of 200000 compute units
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh success
```
### Mapping
`solana` 没有内置的 `mapping` 数据结构，引入 `hashmap` 实现 `mapping` 功能
```rust
use anchor_lang::prelude::*;
use std::collections::HashMap;

declare_id!("EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh");


#[program]
pub mod hello_world {
    use super::*;

    pub fn printmsg(ctx: Context<Initialize>, key: String, value: String) -> Result<()> {
        let mut my_map = HashMap::new();
        my_map.insert(key.to_string(),value.to_string());
        msg!("Value = {}",my_map[&key]);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
```
测试结果：
```json
Transaction executed in slot 16108:
  Signature: 3aQasMZdiq6gNPtjqnMEqkGW1Jt6v9nPU6STGf7hF4ySHk3YuzS7aV2SdJ4NyKT29AbW9SXEat7uHSkwj4WjDRQQ
  Status: Ok
  Log Messages:
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh invoke [1]
    Program log: Instruction: Printmsg
    Program log: Value = jessik
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh consumed 2123 of 200000 compute units
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh success
```
### Struct
结构体用于自定义用户数据
```rust
use anchor_lang::prelude::*;
use std::collections::HashMap;

declare_id!("EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh");


#[program]
pub mod hello_world {
    use super::*;
    

    pub fn printmsg(ctx: Context<Initialize>, name: String, age: u64) -> Result<()> {
        let mut person:Person = Person {
            my_name: name,
            my_age: age,
        };
        msg!("Name = {} age = {}",person.my_name,person.my_age);

        person.my_name = "Lily".to_string();
        person.my_age = 23;
        msg!("Name = {} age = {}",person.my_name,person.my_age);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

struct Person {
    my_name: String,
    my_age: u64,
}
```
测试ts
```javascript
use anchor_lang::prelude::*;
use std::collections::HashMap;

declare_id!("EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh");


#[program]
pub mod hello_world {
    use super::*;
    

    pub fn printmsg(ctx: Context<Initialize>, name: String, age: u64) -> Result<()> {
        let mut person:Person = Person {
            my_name: name,
            my_age: age,
        };
        msg!("Name = {} age = {}",person.my_name,person.my_age);

        person.my_name = "Lily".to_string();
        person.my_age = 23;
        msg!("Name = {} age = {}",person.my_name,person.my_age);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

struct Person {
    my_name: String,
    my_age: u64,
}
```
测试输出
```json
Transaction executed in slot 32033:
  Signature: 4zc9E4KfadzPpGa5te2nQmrH7twdPVm8pRce18YNA8b3fm5XFCRBQhnbznuUWLpnJUEnKqnbh1y86zf6WNa82nyF
  Status: Ok
  Log Messages:
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh invoke [1]
    Program log: Instruction: Printmsg
    Program log: Name = jessik age = 18
    Program log: Name = Lily age = 23
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh consumed 1539 of 200000 compute units
    Program EL5uX6XK8UUZ3s3TX1LDpPVFVh5pb49vdu7eZfC8tvrh success
```
## Flow Checks
### If/Require
`if Statement {}`, 满足 `Statement` 条件的话，执行当前分支逻辑

`require!(Statement，Error)`，不满足 `Statement` 条件的话，直接报错

[If/Require](../introduction/4_errors_check.md)

三元符

`solana` 合约语句的返回值不存在符号： `;` ,因此可以用 `;` 实现三元符
```rust
pub fn age_checker(ctx: Context<Initialize>, age: u64) -> Result<()> {
    let result = if age >= 18 {"You are 18 years old or above"} else { "You are below 18 years old" };
    msg!("{:?}", result);
    Ok(())
}
```

### Match
`Rust` 存在高效的数据分支判断，通过 `match` 进入不同的分支
```rust
    pub fn matchmsg(ctx: Context<Initialize>, name: String, age: u64) -> Result<()> {
        match age {
            1 => {
                // Code block executed if age equals 1
                msg!("The age is 1");
            },
            2 | 3 => {
                // Code block executed if age equals 2 or 3
                msg!("The age is either 2 or 3");
            },
            4..=6 => {
                // Code block executed if age is in the 
                // range 4 to 6 (inclusive)
                msg!("The age is between 4 and 6");
            },
            _ => {
                // Code block executed for any other age
                msg!("The age is something else");
            }
        }
        Ok(())
    }
```
### For
`Solana中` `..` 表示前闭后开的区间，通过 `step_by` 控制步长
```rust
    for i in (0..10).step_by(2) {
        // do something...
            
        msg!("{}", i);
    } 
```
### Try/Catch
`Rust` 没有 `try/catch` 的异常处理

## Preference
[https://www.rareskills.io/post/rust-basic-syntax](https://www.rareskills.io/post/rust-basic-syntax)