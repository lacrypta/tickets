import styled from '@emotion/styled'
import { AppBar, Box } from '@mui/material'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import Head from 'next/head'
import { MainWidget } from '../components/MainWidget'
import styles from '../styles/Home.module.css'

const TopBar = styled(AppBar)`
  flex-direction: row-reverse;
  padding: 0.6em;
  background: #f7f7f7;
`

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Peronio Fee-less</title>
        <meta name='description' content='Feeless implementation for ERC20' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Box sx={{ flexGrow: 1 }}>
        <TopBar position='static' elevation={0}>
          <ConnectButton label='Conectar Wallet' />
        </TopBar>
      </Box>
      <main className={styles.main}>
        <h1 className={styles.title}>Bienvenidos a Peronio Feeless</h1>

        <MainWidget />
      </main>

      <footer className={styles.footer}>
        <a href='https://peronio.ar' target='_blank' rel='noopener noreferrer'>
          Hecho con ❤️ por Peronio
        </a>
      </footer>
    </div>
  )
}

export default Home
