/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_SRV_URI: "mongodb+srv://eladb:Abc123@yen-cluster.s5gmqs9.mongodb.net/?authMechanism=DEFAULT",
    MONGODB_LOCAL_URI:"mongodb://localhost:27017/yenefer",
    JWT_SECRET_KEY: "mySecret",
    DB_NAME: "yenefer",
    SALT: "10",
    BASE_API_URI: "http://localhost:3000/api"
  }
};

export default nextConfig;
