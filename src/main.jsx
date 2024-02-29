import { createWeb3Modal } from "@web3modal/wagmi/react"

import { createRoot } from "react-dom/client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { http, createConfig, WagmiProvider, unstable_connector, fallback } from "wagmi"
import { mainnet, polygon, arbitrum, bsc, goerli, sepolia } from "wagmi/chains"

import { injected, walletConnect } from "wagmi/connectors"

import mainconfig from "./config"
import { PurchaseForm } from "./App"

/* amplitude.init(mainconfig.services.amplitude.key, {
	defaultTracking: true,
}) */

//localStorage.clear()

const queryClient = new QueryClient()

const infuraId = mainconfig.services.infura.key
const alchemyId = mainconfig.services.alchemy.key

const projectId = mainconfig.services.walletconnect.key

const selectedChains = [goerli]

const connectors = [
	injected(),
	walletConnect({
		showQrModal: false,
		projectId: projectId,
	}),
]

const wagmiConfig = createConfig({
	chains: selectedChains,
	connectors,
	transports: {
		[goerli.id]: fallback([unstable_connector(injected), http("https://eth-goerli.g.alchemy.com/v2/Vsfjo9jSiryr1GE4iug9AAYeal3wrFH2")]),
		[mainnet.id]: fallback([unstable_connector(injected), http("https://eth-mainnet.g.alchemy.com/v2/wg6wp8N_jgPqBLyx94PxLRrNLVer2Elb")]),
	},
})

createWeb3Modal({
	tokens: {
		5: {
			address: "0x7E3BA0bCD192155ac7b9E51613C639e4e026d2dD",
		},
	},
	defaultChain: goerli,
	wagmiConfig: wagmiConfig,
	projectId,
	enableAnalytics: true,
	privacyPolicyUrl: "https://earlyaccess.toon.org/privacy",
	excludeWalletIds: ["c03dfee351b6fcc421b4494ea33b9d4b92a984f87aa76d1663bb28705e95034a", "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96"],
	themeVariables: {
		"--w3m-accent": "#F79F1F",
		"--w3m-color-mix": "#00C6E0",
		"--w3m-color-mix-strength": 0,
	},
})

const root = createRoot(document.getElementById("root"))

root.render(
	<WagmiProvider config={wagmiConfig} reconnectOnMount={true}>
		<QueryClientProvider client={queryClient}>
			<PurchaseForm />
		</QueryClientProvider>
	</WagmiProvider>
)
