import {IncomingPacket} from "../../IncomingPacket";
import {Buffer} from "buffer";

export class UniqueIdMessageEvent extends IncomingPacket {

    constructor(packet: Buffer) {
        super(packet);
    }

    public handle(): void {
        //console.log(this.header);
    }

}