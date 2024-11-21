import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
  } from "./ui/form"
import { useWriteContract } from "wagmi";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react";
import { SetBalance } from "./setBalance";

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
      .string()
      .transform((v) => Number(v) || 0)
      .refine((v) => v >= 1, { message: "Count must be greater than or equal to 1" }),
  });


export function Gamble() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      })

    const { writeContract } = useWriteContract();
    const [message, setMessage] = useState("");
    
    async function Bet(values: z.infer<typeof formSchema>) {
        try {
            const result = await writeContract({
                address: contractAddress,
                abi: contractABI,
                functionName: "bet",
                args: [values.count],
            });
            console.log("Transaction successful:", result);
            setMessage("Bet Placed");
        } catch (error) {
            console.error("Transaction failed:", error);
            setMessage("Bet Failed");
        }
    }
  return (

    <div className="flex flex-col items-center justify-center">
    
    <p className="text-2xl font-bold mt-10">Balance:</p>

    <div className="flex space-x-4 mt-4">
    <SetBalance />

    <Dialog>
      <DialogTrigger asChild>
        <Button>What is Your Bet?</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Enter Bet</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center py-4">

        <Form {...form}>
        <form onSubmit={form.handleSubmit(Bet)} className="space-y-8">
          <FormField
            control={form.control}
            name="count"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="1" {...field} />
                </FormControl>
                <FormDescription>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
        </div>
      </DialogContent>
    </Dialog>

    </div>

    </div>
  )
}

export default Gamble;