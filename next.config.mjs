/** @type {import("next").NextConfig} */
const nextConfig = {
  env: {
    MONGODB_SRV_URI: "mongodb+srv://eladb:Abc123@yen-cluster.s5gmqs9.mongodb.net/?authMechanism=DEFAULT",
    MONGODB_LOCAL_URI: "mongodb://localhost:27017/yenefer",
    JWT_SECRET_KEY: "mySecret",
    DB_NAME: "yenefer",
    SALT: "10",
    BASE_API_URI: "http://localhost:3009/api",
    SERVER_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnQiOiJGcmkgTWFyIDIyIDIwMjQgMTI6MjM6MjggR01UKzAyMDAgKElzcmFlbCBTdGFuZGFyZCBUaW1lKSIsImlhdCI6MTcxMTEwMzAwOH0.1Wy5HZQvvBUhZhpnVj8RI7ebXGWi6lr_thwNpZi5gYc",
    SERVER_API_TIMEOUT: "6000",
    CLIENT_API_TIMEOUT: "6000"
  }
};

export default nextConfig;
