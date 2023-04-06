import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
} from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

const Home: NextPage = () => {
  const myAddress = useAddress()
  const contractAddress = '0x794000Cf1B7CeCFA4355E1582ED6348895Eef766'
  const { contract, isLoading } = useContract(contractAddress)

  const [counter, setCounter] = useState<string | undefined>(undefined)

  async function getCounter() {
    if (!contract) return

    const counter = await contract.call('getCounter')
    setCounter(counter.toString())
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ConnectWallet />
        <div className={styles.title}>
          <h3>이병천의 카운터 앱</h3>
        </div>

        <div className={styles.description}>
          Contract address: {contractAddress} <br />
          Host address: 0x42db748758CdE11A437694950fb873998eAB122b <br />
          Your address: {myAddress}
        </div>

        <div className={styles.title}>
          <h3>{counter}</h3>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => {
                contract.call('decrementCounter')
                getCounter()
              }}
            >
              <h1>-</h1>
            </Web3Button>
          </div>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={() => getCounter()}
            >
              <h1>Refresh Counter</h1>
            </Web3Button>
          </div>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => {
                contract.call('incrementCounter')
                getCounter()
              }}
            >
              <h1> + </h1>
            </Web3Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
