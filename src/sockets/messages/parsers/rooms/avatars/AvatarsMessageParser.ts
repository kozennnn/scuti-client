import { MessageParser } from "@/types/Socket";
import { IncomingMessage } from "@/sockets/messages/incoming/IncomingMessage";
import { AvatarDataParser } from "@/sockets/messages/parsers/rooms/utils/AvatarDataParser";

export class AvatarsMessageParser implements MessageParser {
  private _avatars!: AvatarDataParser[];

  constructor(message: IncomingMessage) {
    this.flush();
    this.parse(message);
  }

  public flush(): void {
    this._avatars = [];
  }

  public parse(message: IncomingMessage): void {
    const avatarsSize: number = message.readInt();

    for (let i = 0; i < avatarsSize; i++) {
      this._avatars.push(new AvatarDataParser(message));
    }
  }

  public get avatars(): AvatarDataParser[] {
    return this._avatars;
  }
}
