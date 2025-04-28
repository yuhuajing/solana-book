# Rust 数据赋值解析
## 可复制的静态数据类型
- integers, unsigned, and floats integers
- booleans
- char

具有较小的固定尺寸，所以允许在上下文中复制数据，不会改变数据的 `owner` 权

另一方面，Vector数组、string 和 struct 结构体 数据类型拥有不确定的大小，所以无法直接上下文复制

`Rust` 为何区分复制类型和非复制类型
考虑以下 `Rust` 代码：
```rust
pub fn main() {
    let a: u32 = 2;
    let b: u32 = 3;
    println!("{}", add(a, b)); // a and b a are copied to the add function

    let s1 = String::from("hello");
    let s2 = String::from(" world");

    // if s1 and s2 are copied, this could be a huge data transfer
    // if the strings are very long
    println!("{}", concat(s1, s2));
}

// implementations of add() and concat() are not shown for brevity
// this code does not compile

```

在 `a+b` 的函数块中，只需要从变量复制到函数中的 `64` 位数据（`32 位 * 2 `个变量）。

然而，对于字符串来说，我们并不总是能够提前知道要复制多少数据。
如果字符串长度达到 `1GB`，程序就会明显卡顿。

`Rust` 希望我们明确地说明如何处理大数据。它不会像动态语言那样在后台复制数据。

### Data归属
对于非复制类型（字符串、向量、结构体等），
一旦将值赋给新的变量，就意味着数据的所有权发生了转移。

```rust
    pub fn inputuint(ctx: Context<NonEmptyAccountExample>) -> Result<()> {
        // Example of changing ownership on a non-copy datatype (string)
        let s1 = String::from("abc");
        // s2 becomes the owner of `String::from("abc")`
        let s2 = s1;
        msg!("Result = {}", s1);
        msg!("Result = {}", s2);
        Ok(())
    } 
```
代码无法编译：
```json
error[E0382]: borrow of moved value: `s1`
  --> programs/hello_world/src/lib.rs:14:29
   |
11 | ``      let s1 = String::from("abc");
   |             -- move occurs because `s1` has type `String`, which does not implement the `Copy` trait
12 |         // s2 becomes the owner of `String::from("abc")`
13 |         let s2 = s1;
   |                  -- value moved here
14 |         msg!("Result = {}", s1);
   |                             ^^ value borrowed here after move
```

要修复上面的代码，我们有两个选择：使用`&`运算符或 `clone s1`。

#### 可修改的变量
Examples 1:

数据赋值给新的变量会转移所有权，将非赋值的操作放在前方执行
```rust
    pub fn inputuint(ctx: Context<NonEmptyAccountExample>) -> Result<()> {
        // Example of changing ownership on a non-copy datatype (string)
        let s1 = String::from("hello");
        msg!("Result = {}", s1);
        let s2 =s1;
        msg!("Result = {}", s2);
        Ok(())
    } 
```

Examples  2:
如果我们想让另一个变量“查看”该值（即获得只读访问权限），我们就使用 `&` 运算符。
```rust
    pub fn inputuint(ctx: Context<NonEmptyAccountExample>) -> Result<()> {
        // Example of changing ownership on a non-copy datatype (string)
        let mut s1 = String::from("hello");
        let mut y  =&s1; //
        msg!("Result = {}", s1);
        msg!("Result = {}", y);
        Ok(())
    } 
```

mut 关键字修饰可更新的变量，变量可以更新值

```rust
    pub fn inputuint(ctx: Context<NonEmptyAccountExample>) -> Result<()> {
        // Example of changing ownership on a non-copy datatype (string)
        let mut s1 = String::from("hello");
        msg!("Result = {}", s1);
        s1 = s1 + "world";
        msg!("Result = {}", s1);
        Ok(())
    } 
```
但是 mut 关键值被外借后，不能再次被操作：
```rust
    pub fn inputuint(ctx: Context<NonEmptyAccountExample>) -> Result<()> {
        // Example of changing ownership on a non-copy datatype (string)
        let mut s1 = String::from("hello");
        let mut y  = &s1;
        s1 = s1 + "world";
        msg!("Result = {}", s1);
        msg!("Result = {}", y);
        Ok(())
    } 
```
编译报错
```json
warning: variable does not need to be mutable
  --> programs/hello_world/src/lib.rs:12:13
   |
12 |         let mut y  = &s1;
   |             ----^
   |             |
   |             help: remove this `mut`

error[E0506]: cannot assign to `s1` because it is borrowed
  --> programs/hello_world/src/lib.rs:13:9
   |
12 |         let mut y  = &s1;
   |                      --- `s1` is borrowed here
13 |         s1 = s1 + "world";
   |         ^^ `s1` is assigned to here but it was already borrowed
14 |         msg!("Result = {}", s1);
15 |         msg!("Result = {}", y);
   |                             - borrow later used here

error[E0505]: cannot move out of `s1` because it is borrowed
  --> programs/hello_world/src/lib.rs:13:14
   |
11 |         let mut s1 = String::from("hello");
   |             ------ binding `s1` declared here
12 |         let mut y  = &s1;
   |                      --- borrow of `s1` occurs here
13 |         s1 = s1 + "world";
   |              ^^ move out of `s1` occurs here
14 |         msg!("Result = {}", s1);
15 |         msg!("Result = {}", y);
   |                             - borrow later used here
   |
help: consider cloning the value if the performance cost is acceptable
   |
12 -         let mut y  = &s1;
12 +         let mut y  = s1.clone();
```
### <>泛型

`< > ` 表示任意类型的值。与其为每种可能的类型编写一堆函数，不如使用泛型。

下面的示例结构可以是i32或bool。
```rust

#[program]
pub mod hello_world {
    use super::*;

    pub fn inputuint(ctx: Context<NonEmptyAccountExample>) -> Result<()> {
        let v1:MyValues<i32> = MyValues{foo:119};
        let v2:MyValues<bool> = MyValues{foo:true};
        msg!("Result = {}", v1.foo);
        msg!("Result = {}", v2.foo);
        Ok(())
    } 
}

#[derive(Accounts)]
pub struct NonEmptyAccountExample<'info>{
    signer:Signer<'info>,
}

pub struct MyValues<T>{
    foo:T,
}
```

这就是为什么它很方便：当我们在 `Solana` 中将值“存储在存储中”时，
如果要存储数字、字符串或其他内容，我们希望非常灵活。

如果我们的结构中有多个字段，则参数化类型的语法如下：

```rust
pub struct MyValues<T,U>{
    foo:T,
    boo:U,
}
```


### Options Enum Deref*
#### [Option](https://doc.rust-lang.org/std/option/enum.Option.html)
```rust
pub enum Option<T> {
    None,
    Some(T),
}
```
`Option` 是一个枚举，可以包含预期值，也可以包含表示“无任何内容”的特殊值。

`unwrap()` 将具有实际数据 （`is_some`） 的 `Option` 的值解析出来。

解析 `None` 的 `Option` 会触发 `Panic` 异常

fn main() {
let v = Vec::from([1,2,3,4,5]);

    assert!(v.iter().max().unwrap() == 5);
}

解引用*运算符
但还是不行！这次我们得到了一个错误

19 |     assert!(v.iter().max().unwrap() == 5);
|                                     ^^ no implementation for `&{integer} == {integer}`

等式左边的项是整数的视图（即&），而右边的项是实际整数。

要将整数的“视图”转换为常规整数，我们需要使用“取消引用”操作。也就是在值前面加上一个*运算符。

fn main() {
let v = Vec::from([1,2,3,4,5]);

    assert!(*v.iter().max().unwrap() == 5);
}

因为数组的元素是复制类型，所以 deref 运算符将默默地复制5返回的max().unwrap()。

您可以将 视为在不影响原始值的*情况下“撤消” a 。&

在非复制类型上使用运算符是一个复杂的主题。目前，你只需要知道，如果你收到一个复制类型的视图（借用），并且需要将其转换为“正常”类型，请使用 ` `* 运算符。

ResultRust 中的 Option 与
当我们可能收到“空”的结果时，使用选项。当我们可能收到错误时，使用 A Result（相同的ResultAnchor 程序已经返回）。

Result枚举
Rust 中的枚举Result<T, E>用于当函数操作可能成功并返回一个类型T（泛型类型）的值，或失败并返回一个类型E（泛型错误类型）的错误时。它旨在处理可能导致成功结果或错误情况的操作。

enum Result<T, E> {
Ok(T),
Err(E),
}

在 Rust 中，?运算符用于Result<T, E>枚举，而unwrap()用于Result<T, E>和Option<T> enums。

操作?员
该?运算符只能在返回 a 的函数中使用Result，因为它是返回 andErr或 的语法糖Ok。

该?运算符用于从枚举中提取数据，并在函数执行成功时Result<T, E>返回变量，如果发生错误则冒泡错误。该方法的工作方式相同，但对于枚举和枚举都适用，但应谨慎使用，因为如果发生错误，可能会导致程序崩溃。OK(T)Err(E)unwrap()Result<T, E>Option<T>

现在，考虑下面的代码：

pub fn encode_and_decode(_ctx: Context<Initialize>) -> Result<()> {
// Create a new instance of the `Person` struct
let init_person: Person = Person {
name: "Alice".to_string(),
age: 27,
};

    // Encode the `init_person` struct into a byte vector
    let encoded_data: Vec<u8> = init_person.try_to_vec().unwrap();

    // Decode the encoded data back into a `Person` struct
    let data: Person = decode(_ctx, encoded_data)?;

    // Logs the decoded person's name and age
    msg!("My name is {:?}, I am {:?} years old.", data.name, data.age);

    Ok(())
}

pub fn decode(_accounts: Context<Initialize>, encoded_data: Vec<u8>) -> Result<Person> {
// Decode the encoded data back into a `Person` struct
let decoded_data: Person = Person::try_from_slice(&encoded_data).unwrap();

    Ok(decoded_data)
}

该try_to_vec()方法将结构体编码为字节向量并返回一个Result<T, E>枚举，其中T是字节向量，而 则unwrap()用于从 中提取字节向量的值OK(T)。如果 无法将结构体转换为字节向量，程序将崩溃。