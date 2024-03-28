/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/sessions",
        destination: process.env.NEXT_PUBLIC_API_DOMAIN + "/api/sessions",
      },
      {
        source: "/api/users",
        destination: process.env.NEXT_PUBLIC_API_DOMAIN + "/api/users",
      },
      {
        source: "/api/users/generateOTP",
        destination:
          process.env.NEXT_PUBLIC_API_DOMAIN + "/api/users/generateOTP",
      },
      {
        source: "/api/users/verifyOTP",
        destination:
          process.env.NEXT_PUBLIC_API_DOMAIN + "/api/users/verifyOTP",
      },
      {
        source: "/api/users/resetPassword",
        destination:
          process.env.NEXT_PUBLIC_API_DOMAIN + "/api/users/resetPassword",
      },
      {
        source: "/api/users/:id",
        destination: process.env.NEXT_PUBLIC_API_DOMAIN + "/api/users/:id",
      },
      {
        source: "/api/products",
        destination: process.env.NEXT_PUBLIC_API_DOMAIN + "/api/products",
      },
      {
        source: "/api/products/:productId",
        destination:
          process.env.NEXT_PUBLIC_API_DOMAIN + "/api/products/:productId",
      },
      {
        source: "/api/orders",
        destination: process.env.NEXT_PUBLIC_API_DOMAIN + "/api/orders",
      },
      {
        source: "/api/orders/paypal/create",
        destination:
          process.env.NEXT_PUBLIC_API_DOMAIN + "/api/orders/paypal/create",
      },
      {
        source: "/api/orders/paypal/capture",
        destination:
          process.env.NEXT_PUBLIC_API_DOMAIN + "/api/orders/paypal/capture",
      },
      {
        source: "/api/orders/:orderId",
        destination:
          process.env.NEXT_PUBLIC_API_DOMAIN + "/api/orders/:orderId",
      },
      {
        source: "/api/orders/user/:userId",
        destination:
          process.env.NEXT_PUBLIC_API_DOMAIN + "/api/orders/user/:userId",
      },
      {
        source: "/api/carts",
        destination: process.env.NEXT_PUBLIC_API_DOMAIN + "/api/carts",
      },
      {
        source: "/api/mail",
        destination: process.env.NEXT_PUBLIC_API_DOMAIN + "/api/mail",
      },
    ];
  },
};

module.exports = nextConfig;
