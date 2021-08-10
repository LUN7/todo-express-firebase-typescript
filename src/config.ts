const ENV = process.env.NODE_ENV
export const IS_PRODUCTION = ENV === "production"
export const IS_DEVELOPMENT = ENV === "development"
export const IS_TEST = ENV === "test"
