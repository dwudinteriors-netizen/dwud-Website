/* Drive API helper for client-side usage (Google API JS client)
   Usage:
   1. Set env vars: VITE_GOOGLE_API_KEY and VITE_GOOGLE_CLIENT_ID
   2. Call `initDrive({ apiKey: ..., clientId: ... })` on app start
   3. Call `signIn()` to authenticate and then `listFilesInFolder(folderId)`
*/

declare global {
  interface Window { gapi: any }
}

const GAPI_SRC = 'https://apis.google.com/js/api.js';

declare global {
  interface Window { gapi: any; google: any; tokenClient?: any; }
}

export async function loadGapi(): Promise<any> {
  if (typeof window === 'undefined') throw new Error('window is undefined');
  if (window.gapi) return window.gapi;
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = GAPI_SRC;
    script.async = true;
    script.onload = () => resolve(window.gapi);
    script.onerror = () => reject(new Error('Failed to load gapi'));
    document.body.appendChild(script);
  });
}

export async function loadGis(): Promise<any> {
  if (typeof window === 'undefined') throw new Error('window is undefined');
  if (window.google) return window.google;
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (window.google) {
        clearInterval(interval);
        resolve(window.google);
      }
    }, 50);
    setTimeout(() => {
      clearInterval(interval);
      reject(new Error('Google Identity Services failed to load'));
    }, 5000);
  });
}

export async function initDrive({ apiKey, clientId, discoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'], scope = 'https://www.googleapis.com/auth/drive.readonly' }: { apiKey: string, clientId: string, discoveryDocs?: string[], scope?: string }) {
  const gapi = await loadGapi();
  await new Promise((res) => gapi.load('client', res));
  await gapi.client.init({ apiKey, discoveryDocs });

  const gis = await loadGis();
  const tokenClient = gis.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope,
    callback: (resp: any) => {
      if (resp.error) {
        console.error('Drive token client error', resp);
        return;
      }
      gapi.client.setToken({ access_token: resp.access_token });
    }
  });

  window.tokenClient = tokenClient;
  return { gapi, tokenClient };
}

export async function requestDriveToken(prompt: 'consent' | 'none' = 'consent') {
  if (!window.tokenClient) throw new Error('Drive token client has not been initialized');
  return new Promise<void>((resolve, reject) => {
    window.tokenClient.requestAccessToken({ prompt }, (resp: any) => {
      if (resp.error) return reject(resp);
      if (!resp.access_token) return reject(new Error('No access token returned'));
      resolve();
    });
  });
}

export async function listFilesInFolder(folderId: string, pageSize = 100) {
  if (!window.gapi || !window.gapi.client || !window.gapi.client.drive) throw new Error('Drive client not initialized');
  const res = await window.gapi.client.drive.files.list({
    q: `'${folderId}' in parents and trashed=false`,
    pageSize,
    fields: 'files(id,name,mimeType,thumbnailLink,webViewLink,webContentLink)'
  });
  return (res.result && res.result.files) ? res.result.files : [];
}

export async function listFilesRecursive(folderId: string, pageSize = 100) {
  const results: any[] = [];
  const stack = [folderId];
  while (stack.length) {
    const id = stack.pop();
    if (!id) continue;
    const items = await listFilesInFolder(id, pageSize);
    for (const it of items) {
      if (it.mimeType === 'application/vnd.google-apps.folder') {
        stack.push(it.id);
      } else {
        results.push(it);
      }
    }
  }
  return results;
}

export async function listFilesRecursiveWithPath(folderId: string, pageSize = 100, parentPath = '') {
  const results: any[] = [];
  const stack = [{ id: folderId, path: parentPath }];
  while (stack.length) {
    const { id, path } = stack.pop()!;
    if (!id) continue;
    const items = await listFilesInFolder(id, pageSize);
    for (const item of items) {
      const itemPath = path ? `${path}/${item.name}` : item.name;
      if (item.mimeType === 'application/vnd.google-apps.folder') {
        stack.push({ id: item.id, path: itemPath });
      } else {
        results.push({ ...item, fullPath: itemPath });
      }
    }
  }
  return results;
}

export function getPublicFileUrl(fileId: string) {
  // Prefer the Drive API media endpoint over drive.google.com to avoid preview/CORS issues.
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  return getApiFileDownloadUrl(fileId, apiKey);
}

export function getApiFileDownloadUrl(fileId: string, apiKey?: string) {
  const base = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
  return apiKey ? `${base}&key=${apiKey}` : base;
}

export function extractFolderIdFromUrl(url: string) {
  const m = String(url).match(/folders\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}

export default {
  loadGapi,
  initDrive,
  requestDriveToken,
  listFilesInFolder,
  listFilesRecursive,
  listFilesRecursiveWithPath,
  getPublicFileUrl,
  getApiFileDownloadUrl,
  extractFolderIdFromUrl
};
