function parseDevice(userAgent) {
  if (!userAgent) return 'Unknown';

  let os = 'Unknown';
  let browser = 'Unknown';

  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac OS X')) os = 'macOS';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('CrOS')) os = 'Chrome OS';

  if (userAgent.includes('Edg/')) browser = 'Edge';
  else if (userAgent.includes('OPR/') || userAgent.includes('Opera')) browser = 'Opera';
  else if (userAgent.includes('Chrome/') && !userAgent.includes('Edg/')) browser = 'Chrome';
  else if (userAgent.includes('Firefox/')) browser = 'Firefox';
  else if (userAgent.includes('Safari/') && !userAgent.includes('Chrome/')) browser = 'Safari';

  return `${os} - ${browser}`;
}

module.exports = parseDevice;
