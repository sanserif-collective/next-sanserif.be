module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '3e304adeb95e8a0eefd274606b42cd43'),
  },
  url: '/dashboard'
});
