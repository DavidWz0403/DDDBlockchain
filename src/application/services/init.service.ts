import { Injectable, OnModuleInit } from "@nestjs/common"
import { GenesisBlockService } from "./genesisBlock.service";

@Injectable()
export class InitGenesis implements OnModuleInit {
    constructor(private readonly genesisService: GenesisBlockService){}
    onModuleInit(){
        this.genesisService.generateGenesis()
    }
}
