export async function fetchWithToken(url, options = {}, navigate) {
  const getAccessToken = () => sessionStorage.getItem('access') || localStorage.getItem('access');
  const getRefreshToken = () => sessionStorage.getItem('refresh') || localStorage.getItem('refresh');

  const _fetch = (token) =>
    fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });

  let response = await _fetch(getAccessToken());

  if (response.status === 401 && getRefreshToken()) {
    const refreshResponse = await fetch('/api/user/login/update/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: getRefreshToken() }),
    });

    if (refreshResponse.ok) {
      const { access } = await refreshResponse.json();
      sessionStorage.setItem('access', access);
      localStorage.setItem('access', access);

      response = await _fetch(access);
    }
  }

  if (response.status === 401) {
    sessionStorage.clear();
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('username');
    localStorage.removeItem('payload');
    navigate('/login');
  } else if (response.status === 403) {
    navigate('/login');
  }

  return response;
}
