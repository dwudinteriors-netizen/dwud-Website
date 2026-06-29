import React, { useEffect, useState } from 'react';
import driveService from '../services/driveService';
import { DRIVE_IMAGE_FOLDER } from '../data/constants';

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  url: string;
  webViewLink?: string;
};

export default function OurServices() {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDriveFiles() {
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

      if (!apiKey || !clientId) {
        setError('Google Drive keys are missing. Set VITE_GOOGLE_API_KEY and VITE_GOOGLE_CLIENT_ID in .env.');
        setLoading(false);
        return;
      }

      try {
        await driveService.initDrive({ apiKey, clientId });
        const folderId = driveService.extractFolderIdFromUrl(DRIVE_IMAGE_FOLDER);
        if (!folderId) throw new Error('Invalid Drive folder URL.');

        const driveFiles = await driveService.listFilesRecursiveWithPath(folderId, 1000);
        const mappedFiles = driveFiles
          .filter((file: any) => {
            const path = String(file.fullPath || '').toLowerCase();
            return path.split('/').includes('ourservices');
          })
          .map((file: any) => {
            const name = String(file.name || '')
              .replace(/\.(png|jpe?g)$/i, '')
              .replace(/[-_]/g, ' ')
              .trim();
            const url = /image\/(png|jpe?g)$/i.test(file.mimeType)
              ? driveService.getPublicFileUrl(file.id)
              : file.webViewLink || driveService.getPublicFileUrl(file.id);

            return {
              id: file.id,
              name: name || 'Untitled file',
              mimeType: file.mimeType || 'unknown',
              url,
              webViewLink: file.webViewLink
            } as DriveFile;
          })
          .sort((a: DriveFile, b: DriveFile) => a.name.localeCompare(b.name));

        if (isMounted) {
          setFiles(mappedFiles);
          setError(mappedFiles.length ? null : 'No files found in the configured Drive folder.');
        }
      } catch (err: any) {
        if (isMounted) setError(String(err?.message || err));
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadDriveFiles();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="page-section services-page">
      <section className="content-card">
        <div className="section-header">
          <span className="eyebrow">Our Services</span>
          <h2>Our Services Showcase: Curated Design Assets</h2>
          <p>
            Discover fresh offers and bold design ideas handpicked by the Dwud Interiors team.
          </p>
        </div>

        {loading ? (
          <div className="service-empty-state">
            <p>Loading files from Drive...</p>
          </div>
        ) : error ? (
          <div className="service-empty-state">
            <p>{error}</p>
          </div>
        ) : files.length ? (
          <div className="services-gallery">
            {files.map((file) => (
              <article key={file.id} className="service-card">
                {file.mimeType.startsWith('image/') ? (
                  <a href={file.webViewLink || file.url} target="_blank" rel="noreferrer" className="service-image-wrap">
                    <img src={file.url} alt={file.name} className="service-image" />
                  </a>
                ) : (
                  <div className="service-image-wrap service-file-placeholder">
                    <p>{file.mimeType}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="service-empty-state">
            <p>No files were found in the configured Drive folder.</p>
          </div>
        )}
      </section>
    </div>
  );
}
