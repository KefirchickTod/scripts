export interface CommandInterface  {
    execute(): void;
}

export interface UndoableCommandInterface extends CommandInterface {
    undo(): void
}