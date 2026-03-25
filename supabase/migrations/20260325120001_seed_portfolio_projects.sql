-- Optional seed from legacy projectData.json (skip if you rely on GitHub sync only).
insert into public.portfolio_projects (
  github_repo, slug, title, description, tags, homepage, github_url,
  displayed_on_site, is_highlight, highlight_sort, published_at
) values
  (
    'ikshv/shrimp-tank-monitor',
    'shrimp-tank-monitor',
    'Smart Shrimp Tank Monitor',
    'An IoT and AI-powered system to monitor shrimp tank health using sensors and computer vision.',
    array['AI/ML','IoT','Computer Vision']::text[],
    'https://coolshrimps.io/demo',
    'https://github.com/ikshv/shrimp-tank-monitor',
    true, true, 1, '2024-11-15'::timestamptz
  ),
  (
    'ikshv/devops-pipeline',
    'devops-pipeline',
    'DevOps Deployment Pipeline',
    'Built a CI/CD pipeline using GitHub Actions, Docker, and Kubernetes for a scalable microservices architecture.',
    array['DevOps','CI/CD','Docker']::text[],
    null,
    'https://github.com/ikshv/devops-pipeline',
    true, true, 2, '2023-09-10'::timestamptz
  ),
  (
    'ikshv/portfolio',
    'portfolio',
    'Personal Portfolio',
    'Full-featured portfolio built with React, Tailwind, and Framer Motion. Deployed via Vercel.',
    array['Full Stack','React','Tailwind']::text[],
    'https://ikshv.vercel.app',
    'https://github.com/ikshv/portfolio',
    true, true, 3, '2024-07-01'::timestamptz
  ),
  (
    'ikshv/reverse-apk-analyzer',
    'reverse-apk-analyzer',
    'Reverse Engineering APKs',
    'Developed a tool that uses machine learning to analyze obfuscated Android apps and identify vulnerabilities.',
    array['AI/ML','Security','Reverse Engineering']::text[],
    null,
    'https://github.com/ikshv/reverse-apk-analyzer',
    true, false, 0, '2024-06-01'::timestamptz
  )
on conflict (github_repo) do nothing;
