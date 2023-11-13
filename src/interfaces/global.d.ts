declare interface Callback<T = { [key: string]: value }> {
  (result?: T, error?: Error): void;
}
