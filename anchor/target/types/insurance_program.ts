/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/insurance_program.json`.
 */
export type InsuranceProgram = {
  "address": "4w2ksCnBSp2S4hSNUm1YZg8NzdTZ68mone4h6AkFirzQ",
  "metadata": {
    "name": "insuranceProgram",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Insurance Program"
  },
  "instructions": [
    {
      "name": "buyInsurance",
      "discriminator": [
        20,
        118,
        1,
        239,
        176,
        123,
        243,
        50
      ],
      "accounts": [
        {
          "name": "userTokenAccount",
          "writable": true
        },
        {
          "name": "destinationTokenAccount1",
          "writable": true
        },
        {
          "name": "destinationTokenAccount2",
          "writable": true
        },
        {
          "name": "mint",
          "address": "6eXPbEpN9W3ZU9NoMtrPXwj9axW7N7WtfuK22KottzpM"
        },
        {
          "name": "userAuthority",
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    }
  ]
};
