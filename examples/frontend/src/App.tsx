// Copyright (c), Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { Box, Button, Card, Container, Flex, Grid } from '@radix-ui/themes';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CreateAllowlist } from './CreateAllowlist';
import { Allowlist } from './Allowlist';
import WalrusUpload from './EncryptAndUpload';
import { CreateService } from './CreateSubscriptionService';
import FeedsToSubscribe from './SubscriptionView';
import { Service } from './SubscriptionService';
import { AllAllowlist } from './OwnedAllowlists';
import { AllServices } from './OwnedSubscriptionServices';
import Feeds from './AllowlistView';

function LandingPage() {
  return (
    <Grid columns="2" gap="4">
      <Card>
        <Flex direction="column" gap="2" align="center" style={{ height: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Investor Allowlist</h2>
            <p>
              Buat daftar eksklusif untuk investor yang mendapatkan akses ke laporan, file, atau
              informasi keuangan premium. Hanya investor yang terdaftar yang bisa membuka
              file terenkripsi.
            </p>
          </div>
          <Link to="/allowlist-example">
            <Button size="3" color="red">Coba Sekarang</Button>
          </Link>
        </Flex>
      </Card>
      <Card>
        <Flex direction="column" gap="2" align="center" style={{ height: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Layanan Langganan Finansial</h2>
            <p>
              Monetisasi konten finansial dengan sistem langganan berbasis NFT. Hanya pengguna yang
              berlangganan dan aktif yang bisa mengakses laporan eksklusif atau analisis pasar.
            </p>
          </div>
          <Link to="/subscription-example">
            <Button size="3" color="red">Coba Sekarang</Button>
          </Link>
        </Flex>
      </Card>
    </Grid>
  );
}

function App() {
  const currentAccount = useCurrentAccount();
  const [recipientAllowlist, setRecipientAllowlist] = useState<string>('');
  const [capId, setCapId] = useState<string>('');

  return (
    <Container>
      <Flex position="sticky" px="4" py="2" justify="between" align="center">
        <h1 className="text-4xl font-bold text-red-600 m-4 mb-8">Redstone Finance</h1>
        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <Card style={{ marginBottom: '2rem' }}>
        <p>
          🔗 Kode sumber tersedia di{' '}
          <a href="https://github.com/MystenLabs/seal/tree/main/examples" target="_blank" rel="noreferrer">
            GitHub
          </a>
          .
        </p>
        <p>
          ⚠️ Aplikasi ini berjalan di Testnet. Pastikan wallet kamu berada di Testnet dan memiliki
          saldo. Kamu bisa request token dari{' '}
          <a href="https://faucet.sui.io/" target="_blank" rel="noreferrer">faucet.sui.io</a>.
        </p>
        <p>
          🕒 File hanya bertahan 1 epoch di jaringan Walrus Testnet.
        </p>
        <p>
          🖼️ Saat ini hanya mendukung file gambar. UI masih minimalis dan untuk demo.
        </p>
      </Card>
      {currentAccount ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/allowlist-example/*"
              element={
                <Routes>
                  <Route path="/" element={<CreateAllowlist />} />
                  <Route
                    path="/admin/allowlist/:id"
                    element={
                      <div>
                        <Allowlist
                          setRecipientAllowlist={setRecipientAllowlist}
                          setCapId={setCapId}
                        />
                        <WalrusUpload
                          policyObject={recipientAllowlist}
                          cap_id={capId}
                          moduleName="allowlist"
                        />
                      </div>
                    }
                  />
                  <Route path="/admin/allowlists" element={<AllAllowlist />} />
                  <Route
                    path="/view/allowlist/:id"
                    element={<Feeds suiAddress={currentAccount.address} />}
                  />
                </Routes>
              }
            />
            <Route
              path="/subscription-example/*"
              element={
                <Routes>
                  <Route path="/" element={<CreateService />} />
                  <Route
                    path="/admin/service/:id"
                    element={
                      <div>
                        <Service
                          setRecipientAllowlist={setRecipientAllowlist}
                          setCapId={setCapId}
                        />
                        <WalrusUpload
                          policyObject={recipientAllowlist}
                          cap_id={capId}
                          moduleName="subscription"
                        />
                      </div>
                    }
                  />
                  <Route path="/admin/services" element={<AllServices />} />
                  <Route
                    path="/view/service/:id"
                    element={<FeedsToSubscribe suiAddress={currentAccount.address} />}
                  />
                </Routes>
              }
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <p>🔌 Harap hubungkan wallet kamu untuk melanjutkan.</p>
      )}
    </Container>
  );
}

export default App;
