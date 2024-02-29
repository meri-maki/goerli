



const isProduction = true
const clientToken = window.localStorage["tooncoin:client_token"] || makeClientToken()

window.localStorage["tooncoin:client_token"] = clientToken
window.localStorage["tooncoin:first_visit_at"] = window.localStorage["tooncoin:first_visit_at"] || Date.now()
let injectedProvider = false

if (typeof window.ethereum !== "undefined") {
	injectedProvider = true
}

const isMetaMask = injectedProvider ? window.ethereum.isMetaMask : false
export const supportedChains = [1, 56, 137, 42161, 11155111]
const mainconfig = {
	isProduction: isProduction,
	isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
	isAndroid: /android/i.test(navigator.userAgent),
	isMobile: /iphone|ipad|android/i.test(window.navigator.userAgent),
	isMetaMaskOld: /metamask/i.test(window.navigator.userAgent), //testing whether the user's browser is running the MetaMask extension
	isMetaMask: isMetaMask,
	clientToken: clientToken,
	ethAmountQueryKey: "amount",
	contract: {
		address: {
			goerli: "0x7E3BA0bCD192155ac7b9E51613C639e4e026d2dD",
		},
	},
	services: {
		walletconnect: {
			key: "87022c031174a1bbf0da56284ea67083",
		},
		infura: {
			oldkey: "4c36a49cef8548e6b5707243c5ba36f3",
			key: "9dac313413d04fa2945eb7ffeec43b03",
		},
		alchemy: {
			key: "wg6wp8N_jgPqBLyx94PxLRrNLVer2Elb",
		},
		amplitude: {
			//EARLY ACCESS AMPLITUDE ORG
			key: "2acf973b95c5ee353d8e6f90f2b76cf9",
		},
	},
}

export default mainconfig

export const contract = mainconfig.contract.address.goerli

function makeClientToken() {
	let platformSegment = "u"
	const userAgent = navigator.userAgent || navigator.vendor || window.opera
	if (/android/i.test(userAgent)) {
		platformSegment = "a"
	} else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		platformSegment = "i"
	}

	let result = ""
	const map = "abcdef0123456789"
	for (let i = 0; i < 32; i++) {
		result += map.charAt(Math.floor(Math.random() * map.length))
	}

	return ["b", platformSegment, result].join(":")
}

export const balanceAbi = [
	{
		inputs: [{ internalType: "address", name: "account", type: "address" }],
		name: "balanceOf",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
]

export const candidateOfAbi = [
	{
		inputs: [{ internalType: "address", name: "voter", type: "address" }],
		name: "candidateOf",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
]

export const maintainerAbi = [{ inputs: [], name: "maintainer", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" }]

export const voteAbi = [{ inputs: [{ internalType: "address", name: "candidate", type: "address" }], name: "vote", outputs: [], stateMutability: "nonpayable", type: "function" }]

export const voteOptions = {
	noVote: "0x0000000000000000000000000000000000000000",
	againstAll: "0x000000000000000000000000000000000000dEaD",
}
