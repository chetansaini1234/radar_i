// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import RadarIIDL from '../target/idl/radar_i.json'
import type { RadarI } from '../target/types/radar_i'

// Re-export the generated IDL and type
export { RadarI, RadarIIDL }

// The programId is imported from the program IDL.
export const RADAR_I_PROGRAM_ID = new PublicKey(RadarIIDL.address)

// This is a helper function to get the RadarI Anchor program.
export function getRadarIProgram(provider: AnchorProvider) {
  return new Program(RadarIIDL as RadarI, provider)
}

// This is a helper function to get the program ID for the RadarI program depending on the cluster.
export function getRadarIProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the RadarI program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return RADAR_I_PROGRAM_ID
  }
}
