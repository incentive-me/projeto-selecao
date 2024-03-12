export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: string
    }
  }
}
