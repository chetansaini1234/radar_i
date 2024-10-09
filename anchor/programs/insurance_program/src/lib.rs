use anchor_lang::prelude::*;
use anchor_spl::token::{self, TokenAccount, Token, Mint};
use anchor_spl::token::Transfer; // Corrected import

declare_id!("HhYjkcQYHthabXrF5rVxnGwNTh8oEt1GqMkZrmh8sdi4"); //4w2ksCnBSp2S4hSNUm1YZg8NzdTZ68mone4h6AkFirzQ

const I_TOKEN_MINT: Pubkey = pubkey!("6eXPbEpN9W3ZU9NoMtrPXwj9axW7N7WtfuK22KottzpM");
const DESTINATION_1_KEY: Pubkey = pubkey!("D7mLpimD7A52tSPhxZiuYiNN4GiA91R9Rbxz9uwYUKaP");
const DESTINATION_2_KEY: Pubkey = pubkey!("E6HxB2yUnkF3oP9zb3AKTdWGjsaeGghWT12ZrcC4gLUC");

const DECIMALS: u32 = 9; // Update this to match your token's decimals

#[program]
pub mod insurance_program {
    use super::*;

    pub fn buy_insurance(ctx: Context<BuyInsurance>) -> Result<()> {
        let amount: u64 = 10 * 10u64.pow(DECIMALS); // 10 tokens

        let amount_90 = amount * 90 / 100;
        let amount_10 = amount - amount_90;

        // Transfer 90% to the first destination
        let cpi_accounts1 = Transfer {
            from: ctx.accounts.user_token_account.to_account_info(),
            to: ctx.accounts.destination_token_account1.to_account_info(),
            authority: ctx.accounts.user_authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx1 = CpiContext::new(cpi_program.clone(), cpi_accounts1);
        token::transfer(cpi_ctx1, amount_90)?;

        // Transfer 10% to the second destination
        let cpi_accounts2 = Transfer {
            from: ctx.accounts.user_token_account.to_account_info(),
            to: ctx.accounts.destination_token_account2.to_account_info(),
            authority: ctx.accounts.user_authority.to_account_info(),
        };
        let cpi_ctx2 = CpiContext::new(cpi_program, cpi_accounts2);
        token::transfer(cpi_ctx2, amount_10)?;

        msg!("Insurance bought successfully.");

        Ok(())
    }
}

#[derive(Accounts)]
pub struct BuyInsurance<'info> {
    #[account(
        mut,
        constraint = user_token_account.owner == user_authority.key(),
        constraint = user_token_account.mint == I_TOKEN_MINT
    )]
    pub user_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = destination_token_account1.owner == DESTINATION_1_KEY,
        constraint = destination_token_account1.mint == I_TOKEN_MINT
    )]
    pub destination_token_account1: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = destination_token_account2.owner == DESTINATION_2_KEY,
        constraint = destination_token_account2.mint == I_TOKEN_MINT
    )]
    pub destination_token_account2: Account<'info, TokenAccount>,

    #[account(address = I_TOKEN_MINT)]
    pub mint: Account<'info, Mint>,

    pub user_authority: Signer<'info>, // Ensure this is Signer<'info>

    pub token_program: Program<'info, Token>,
}