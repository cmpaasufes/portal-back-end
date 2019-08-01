export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'secretKey',
};

export const smtpConstants = {
  transport:
    process.env.SMTP_CONF || 'smtps://user@domain.com:pass@smtp.domain.com',
};
