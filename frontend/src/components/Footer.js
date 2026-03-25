import React from 'react';
import siteMeta from '../siteLastUpdated.json';

function formatRepoCommitDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return null;
  }
}

function Footer() {
  const lastUpdate = formatRepoCommitDate(siteMeta.lastCommitIso);

  return (
    <footer className="bg-neutral-900 text-neutral-500 text-sm px-4 py-4 text-center">
      <p>{new Date().getFullYear()} IKS. All rights reserved.</p>
      {lastUpdate && (
        <p className="mt-1 text-neutral-600">Last updated (repo): {lastUpdate}</p>
      )}
    </footer>
  );
}

export default Footer;
