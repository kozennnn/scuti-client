import {IncomingPacket} from "../../../IncomingPacket";
import {Buffer} from "buffer";
import {ConfirmUsernameMessageComposer} from "../../../outgoing/handshake/ConfirmUsernameMessageComposer";
import {store} from "../../../../../store/store";
import {InitializeNewNavigatorMessageComposer} from "../../../outgoing/navigator/updated/InitializeNewNavigatorMessageComposer";

export class UserObjectMessageEvent extends IncomingPacket {

    constructor(packet: Buffer) {
        super(packet);
    }

    public handle(): void {

        const id: number = this.readInt();
        const username: string = this.readString();
        const figure: string = this.readString();
        const gender: string = this.readString();
        const motto: string = this.readString();
        const usernameLowercase: string = this.readString();
        this.readBool();
        this.readInt();
        const dailyRespects: number = this.readInt();
        const dailyScratches: number = this.readInt();

        this.readBool();
        this.readString();

        this.readBool();
        this.readBool();

        new ConfirmUsernameMessageComposer(store.getters.getWebsocket.connection).compose();
        new InitializeNewNavigatorMessageComposer(store.getters.getWebsocket.connection).compose();

    }

}