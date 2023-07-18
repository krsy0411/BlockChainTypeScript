import * as crypto from "crypto";

interface BlockShape {
  // default : public
  hash: string;
  height: number;
  prevHash: string;
  data: string;
}

class Block implements BlockShape {
  hash: string;
  // 인자로 받음 : height, prevHash, data
  constructor(
    public height: number,
    public prevHash: string,
    public data: string
  ) {
    // 현재 hash값은 이전 데이터들을 바탕으로 생성됨
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  static calculateHash(prevHash: string, height: number, data: string) {
    const tohash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(tohash).digest("hex");
  }
}

class BlockChain {
  private blocks: Block[];
  // 인자 X
  constructor() {
    this.blocks = [];
  }

  private getPrevHash(): string {
    return this.blocks.length === 0
      ? ""
      : this.blocks[this.blocks.length - 1].hash;
  }

  public getBlocks(): Block[] {
    return [...this.blocks];
  }

  public addBlock(data: string): void {
    const newBlock = new Block(
      this.blocks.length + 1,
      this.getPrevHash(),
      data
    );
    this.blocks.push(newBlock);
  }
}

const blockchain = new BlockChain();

blockchain.addBlock("First one");
blockchain.addBlock("Second one");
blockchain.addBlock("Third one");
blockchain.addBlock("Fourth one");

console.log(blockchain.getBlocks());
