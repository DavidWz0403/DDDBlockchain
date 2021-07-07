import { Injectable } from "@nestjs/common";
import { UrlWithStringQuery } from "url";
import { IBlockMerkleHash } from "../port/in/usecaseServices/block-services.interface";

@Injectable()
export class MerkleTreeHash implements IBlockMerkleHash{
    merkleTreeHash(hashes: string[]): string{
        const SHA256 = require('crypto-js/sha256');
        let hashedHashes: string[];

        if(hashes.length=== 0){
            return SHA256('0').toString();
        } 
        else if ( hashes.length === 1){
            return hashes[0]
        }
        else if (hashes.length % 2 !== 0) {
            for(let i = 0; i < hashes.length -1; i +=2) {
                if(hashes.length - i > 3 ){
                    hashedHashes.push(SHA256(hashes[i] + hashes[i + 1]).toString())
                } else {
                    hashedHashes.push(SHA256(hashes[i] + hashes[i + 1]).toString())
                    hashedHashes.push(SHA256(hashes[i + 2]).toString())
                }
                
            }

            return this.merkleTreeHash(hashedHashes);
        }
        else if (hashes.length === 2){
            hashedHashes.push(SHA256(hashes[0]+ hashes[1]).toString());
            return this.merkleTreeHash(hashedHashes); 
        }
        else{
            for(let i = 0; i < hashes.length; i +=2){
                hashedHashes.push(SHA256(hashes[i] + hashes[i+1]).toString())
            }
            return this.merkleTreeHash(hashedHashes);
        }
    }
}