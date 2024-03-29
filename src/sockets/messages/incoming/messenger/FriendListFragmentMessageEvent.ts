import { Buffer } from "buffer";
import { IncomingMessage } from "@/sockets/messages/incoming/IncomingMessage";
import { useMessengerStore } from "@/stores/Messenger";

export class FriendListFragmentMessageEvent extends IncomingMessage {
  constructor(packet: Buffer) {
    super(packet);
  }

  public handle(): void {
    useMessengerStore().friends = [];
    this.readInt(); // ?
    this.readInt(); // ?
    const friendsSize: number = this.readInt();
    for (let i = 0; i < friendsSize; i++) {
      const id: number = this.readInt();
      const username: string = this.readString();
      const int3: number = this.readInt(); // Male ?
      const isOnline: boolean = this.readBool();
      const isInRoom: boolean = this.readBool();
      const figure: string = this.readString();
      const int4: number = this.readInt(); // Category id ?
      const motto: string = this.readString();
      this.readString();
      this.readString();
      this.readBool();
      this.readBool();
      this.readBool();
      useMessengerStore().friends.push({
        id: id,
        username: username,
        figure: figure,
        motto: motto,
        online: isOnline,
        inRoom: isInRoom,
      });
    }
  }
}
