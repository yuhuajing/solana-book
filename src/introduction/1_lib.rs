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

    pub fn inputstring(ctx: Context<Initialize>,message:String) -> Result<()> {
        msg!("You sent message {}", message);
        Ok(())
    }

    pub fn inputarray(ctx: Context<Initialize>,arr:Vec<u64>) -> Result<()> {
        msg!("You sent array {:?}", arr);
        Ok(())
    }

    pub fn inputfloat(ctx: Context<Initialize>,value:f32) -> Result<()> {
        msg!("You sent float value {}", value.cbrt()); // 立方根
        Ok(())
    }

    pub fn suboverflow(ctx: Context<Initialize>,a:u64,b:u64) -> Result<()> {
        msg!("You sent value {} and {}, the sub result is {}", a,b,a.checked_sub(b).unwrap());
        Ok(())
    }

    pub fn sqrt(ctx: Context<Initialize>,a:f32) -> Result<()> {
        msg!("You sent value {} , the sqrt result is {}", a, a.sqrt());
        Ok(())
    }

    pub fn modulo(ctx: Context<Initialize>,a:u64,b:u64) -> Result<()> {
        msg!("You sent value {} and {}, the mod result is {}", a, b, a % b);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
