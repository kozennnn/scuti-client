import $ from "jquery";
import {client} from "../../../main";
import {store} from "../../../../interface/store/store";

export class NavigatorRoomMessage {
    constructor(packet) {
        this.packet = packet;
    }

    execute() {
        console.log(this.packet.data);
        store.state.rooms = this.packet.data;
        for (var rooms in this.packet.data) {
            var room = this.packet.data[rooms];
            console.log(room);
        }
    }
}