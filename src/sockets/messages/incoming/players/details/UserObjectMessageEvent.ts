import { Buffer } from "buffer";
import { IncomingMessage } from "@/sockets/messages/incoming/IncomingMessage";
import store from "@/store";
import { ConfirmUsernameMessageComposer } from "@/sockets/messages/outgoing/handshake/GetIgnoredUsersMessageComposer";

export class UserObjectMessageEvent extends IncomingMessage {
  constructor(packet: Buffer) {
    super(packet);
  }

  public handle(): void {
    const id: number = this.readInt();
    const username: string = this.readString();
    const figure: string = this.readString();
    const gender: string = this.readString();
    const usernameLowerCase: string = this.readString();
    const bool1: boolean = this.readBool(); // ?
    const int1: number = this.readInt(); // ?
    const dailyRespects: number = this.readInt();
    const dailyScratches: number = this.readInt();
    const bool2: boolean = this.readBool(); // ?
    const string1: string = this.readString(); // ?
    const bool3: boolean = this.readBool(); // ?
    const bool4: boolean = this.readBool(); // ?
    store.commit("User/setId", id);
    store.commit("User/setUsername", username);
    store.commit("User/setFigure", figure);
    store.commit("User/setGender", gender);
    store.commit("User/setUsername", username);
    store.getters["Socket/socket"].send(
      new ConfirmUsernameMessageComposer(username)
    );
  }
}
