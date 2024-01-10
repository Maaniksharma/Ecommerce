import getRefreshTokenName from './getRefreshTokenName';

export default async function fetchWithTokenRefresh(TokenName, url, options) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: localStorage.getItem(TokenName),
    },
  });

  if (response.status === 401) {
    const refreshTokenName = getRefreshTokenName(TokenName);
    // Assuming 401 is the status code for an expired token
    const refreshResponse = await fetch(
      `${import.meta.env.VITE_SERVERURL}/tokenrefresh`,
      {
        headers: {
          Authorization: localStorage.getItem(refreshTokenName),
          'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          token: localStorage.getItem(refreshTokenName),
        }),
      }
    );

    const refreshData = await refreshResponse.json();

    if (refreshData?.err) {
      throw new Error('Failed to refresh token');
    }

    localStorage.setItem(TokenName, refreshData?.token);

    // Retry the original request with the new token
    const retryResponse = await fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: localStorage.getItem(TokenName),
      },
    });

    if (!retryResponse.ok) {
      return { error: 'Failed to fetch after token refresh' };
    }

    return retryResponse.json();
  }

  if (!response.ok) {
    return { error: 'Failed to fetch' };
  }
  return response.json();
}
