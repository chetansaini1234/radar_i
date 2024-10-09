import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {RadarI} from '../target/types/radar_i'
import '@types/jest';

describe('radar_i', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.RadarI as Program<RadarI>

  const radar_iKeypair = Keypair.generate()

  it('Initialize RadarI', async () => {
    await program.methods
      .initialize()
      .accounts({
        radar_i: radar_iKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([radar_iKeypair])
      .rpc()

    const currentCount = await program.account.radar_i.fetch(radar_iKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment RadarI', async () => {
    await program.methods.increment().accounts({ radar_i: radar_iKeypair.publicKey }).rpc()

    const currentCount = await program.account.radar_i.fetch(radar_iKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment RadarI Again', async () => {
    await program.methods.increment().accounts({ radar_i: radar_iKeypair.publicKey }).rpc()

    const currentCount = await program.account.radar_i.fetch(radar_iKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement RadarI', async () => {
    await program.methods.decrement().accounts({ radar_i: radar_iKeypair.publicKey }).rpc()

    const currentCount = await program.account.radar_i.fetch(radar_iKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set radar_i value', async () => {
    await program.methods.set(42).accounts({ radar_i: radar_iKeypair.publicKey }).rpc()

    const currentCount = await program.account.radar_i.fetch(radar_iKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the radar_i account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        radar_i: radar_iKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.radar_i.fetchNullable(radar_iKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
