export function downloadCSV(data: { post: string; imageUrl: string | string[] }[]) {
  // Clean the post text by removing markdown and extra spaces while preserving paragraphs
  const cleanPosts = data.map(row => ({
    ...row,
    post: row.post
      .replace(/[#*_~`]/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim(),
    imageUrl: Array.isArray(row.imageUrl) ? row.imageUrl.join(';') : row.imageUrl
  }));

  // Create CSV content
  const csvContent = [
    ['Post', 'Image URLs'], // Headers
    ...cleanPosts.map(row => [
      `"${row.post.replace(/"/g, '""')}"`, // Escape quotes in post content
      row.imageUrl
    ])
  ]
    .map(row => row.join(','))
    .join('\n');

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('link');
  const url = URL.createObjectURL(blob);
  
  const date = new Date().toISOString().split('T')[0];
  const filename = `social-media-posts-${date}.csv`;

  // Create link and trigger download
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}