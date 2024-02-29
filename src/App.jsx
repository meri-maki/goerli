import { useDebounce } from "use-debounce"
import { useEffect, useState, lazy, Suspense, useCallback } from "react"

import { useAccount, useAccountEffect, useSendTransaction, useWaitForTransactionReceipt } from "wagmi"
import { parseEther } from "viem"
import mainconfig from "./config"

const contract = mainconfig.contract.address.goerli

export const PurchaseForm = () => {
	const { isConnected, chain } = useAccount()
	const [ethInputAmount, setEthInputAmount] = useState("")
	const [debouncedAmount] = useDebounce(ethInputAmount, 700)

	const {
		data: hash,
		sendTransaction,
		isPending,
	} = useSendTransaction({
		mutation: {
			onError(error) {
				console.log(`Error send`, error)
			},
			onSuccess(data) {
				console.log("Success send", data)
			},
		},
	})

	const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
		hash,
	})

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault()
			sendTransaction?.({ to: contract, value: debouncedAmount ? parseEther(debouncedAmount) : undefined, chainId: 5 })
		},
		[debouncedAmount, sendTransaction]
	)

	return (
		<form>
			<input required name="amount" placeholder="0.00" type="number" step={0.000001} min={0.000001} value={ethInputAmount} onChange={(e) => setEthInputAmount(e.target.value)} />
			{isConfirmed && <p>Confirmed</p>}

			{isConnected && (
				<button type="submit" onClick={onSubmitForm} disabled={/* isLoading || */ !sendTransaction /* || !canMint */ || isPending || isConfirming}>
					{isConfirming ? "Minting Token..." : isPending ? "Pending..." : "Mint Token"}
				</button>
			)}
			<w3m-button />
		</form>
	)
}
