export class Receiver {

    private output: [string];

    public write(line: string) {

        if (typeof this.output == 'undefined') {
            this.output = [line];
            return this;
        }

        this.output.push(line);
        return this;
    }

    public getOutput(): string {
        if (typeof this.output == 'undefined') {
            throw new Error("Undefined output");
        }
        return this.output.join('\n');
    }


}