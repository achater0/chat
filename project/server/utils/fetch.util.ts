export async function fetchWithAuth(url: string, options = {}) {
  let response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (response.status === 401) {
    const errorData: any = await response.json();

    if (errorData.code === "TOKEN_EXPIRED") {
      const refreshResponse = await fetch(
        "http://localhost:8080/api/auth/refresh",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (refreshResponse.ok) {
        response = await fetch(url, {
          ...options,
          credentials: "include",
        });
      } else {
        window.location.href = '/';
        return;
      }
    }
  }

  return response;
}
