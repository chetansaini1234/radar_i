'use client'

import {getRadarIProgram, getRadarIProgramId} from '@project/anchor'
import {useConnection} from '@solana/wallet-adapter-react'
import {Cluster, Keypair, PublicKey} from '@solana/web3.js'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useMemo} from 'react'
import toast from 'react-hot-toast'
import {useCluster} from '../cluster/cluster-data-access'
import {useAnchorProvider} from '../solana/solana-provider'
import {useTransactionToast} from '../ui/ui-layout'

export function useRadarIProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getRadarIProgramId(cluster.network as Cluster), [cluster])
  const program = getRadarIProgram(provider)

  const accounts = useQuery({
    queryKey: ['radar_i', 'all', { cluster }],
    queryFn: () => program.account.radar_i.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['radar_i', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ radar_i: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useRadarIProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useRadarIProgram()

  const accountQuery = useQuery({
    queryKey: ['radar_i', 'fetch', { cluster, account }],
    queryFn: () => program.account.radar_i.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['radar_i', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ radar_i: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['radar_i', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ radar_i: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['radar_i', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ radar_i: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['radar_i', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ radar_i: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
