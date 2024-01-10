export default function getRefreshTokenName(tokenName) {
  const prefix = tokenName.substring(0, tokenName.indexOf('token'));
  return `${prefix}refreshtoken`;
}
