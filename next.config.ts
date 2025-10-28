import { withContentlayer } from "next-contentlayer";

const config = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
};

export default withContentlayer(config);
