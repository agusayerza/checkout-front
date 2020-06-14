export function api<T>(url: string): Promise<T> {
  return fetch(url).then(response => {
    if (!response.ok) {
      console.log(response.statusText);
      throw new Error(response.statusText);
    }
    return response.json().then(data => data as T);
  });
}

export function post<Sent, T>(url: string, payload:Sent): Promise<T> {
  return fetch(url, {method: 'POST', headers: {
    'Content-Type': 'application/json'}, body: JSON.stringify(payload)}).then(response => {
    if (!response.ok) {
      console.log(response.statusText);
      throw new Error(response.statusText);
    }
    return response.json().then(data => data as T);
  });
}
