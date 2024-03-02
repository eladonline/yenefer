/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    MONGODB_URI:"mongodb+srv://eladb:k5djx123@yen-cluster.s5gmqs9.mongodb.net/?authMechanism=DEFAULT",
    JWT_SECRET_KEY:"mySecret"
  }
};

export default nextConfig;
