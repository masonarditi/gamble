import { Button } from "./ui/button"
import { useWriteContract } from "wagmi";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "name": "BalanceInitialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "won",
          "type": "bool"
        }
      ],
      "name": "BetPlaced",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "bet",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "setBalance",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  
  const contractAddress = '0xbb2F1d731Fa5FDaE16f6AFd9f5434F2aF98d4163';

const formSchema = z.object({
    count: z
      .number()
      .min(1, { message: "Count must be greater than or equal to 1" }),
});

export function SetBalance() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { writeContract } = useWriteContract();

    async function handleSetBalance() {
        try {
            const result = await writeContract({
                address: contractAddress,
                abi: contractABI,
                functionName: "setBalance",
                args: [],
            });
            console.log("Balance set successfully:", result);
        } catch (error) {
            console.error("Failed to set balance:", error);
        }
    }

    return (
        <Button onClick={handleSetBalance} className="space-y-8">Set Balance</Button>
    );
}