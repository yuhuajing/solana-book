import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { HelloWorld } from "../target/types/hello_world";

describe("hello_world", () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());

    const program = anchor.workspace.helloWorld as Program<HelloWorld>;

    it("Is initialized!", async () => {
        // Add your test here.
        const tx = await program.methods.initialize().rpc();
        console.log("Your transaction signature", tx);
    });

    it("Is Inputs Data!", async () => {
        // Add your test here.
        const tx = await program.methods.inputuint(new anchor.BN(777), new anchor.BN(888)).rpc();
        console.log("Your transaction signature", tx);
    });

    it("Is Inputs String!", async () => {
        // Add your test here.
        const tx = await program.methods.inputstring("Hello_World").rpc();
        console.log("Your transaction signature", tx);
    });

    it("Is Inputs Array!", async () => {
        // Add your test here.
        const tx = await program.methods.inputarray([new anchor.BN(123), new anchor.BN(196)]).rpc();
        console.log("Your transaction signature", tx);
    });

    it("Is Inputs float!", async () => {
        // Add your test here.
        const tx = await program.methods.inputfloat(123.456).rpc();
        console.log("Your transaction signature", tx);
    });

    it("Is sub overflow!", async () => {
        // Add your test here.
        const tx = await program.methods.suboverflow(new anchor.BN(10), new anchor.BN(2)).rpc();
        console.log("Your transaction signature", tx);
    });

    it("Is sqrt!", async () => {
        // Add your test here.
        const tx = await program.methods.sqrt(119.482).rpc();
        console.log("Your transaction signature", tx);
    });

    it("Is Mod!", async () => {
        // Add your test here.
        const tx = await program.methods.modulo(new anchor.BN(64), new anchor.BN(5)).rpc();
        console.log("Your transaction signature", tx);
    });

});
