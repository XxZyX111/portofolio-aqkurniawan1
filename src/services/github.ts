export interface GitHubUser {
  public_repos: number;
}

export interface GitHubRepository {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  topics?: string[];
}

const GITHUB_USERNAME = 'XxZyX111';
const GITHUB_API = 'https://api.github.com';

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const getGitHubUser = (): Promise<GitHubUser> =>
  fetchJson<GitHubUser>(`${GITHUB_API}/users/${GITHUB_USERNAME}`);

export const getLatestRepositories = async (limit = 5): Promise<GitHubRepository[]> => {
  const repositories = await fetchJson<GitHubRepository[]>(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=created&direction=desc&per_page=100&type=owner`,
  );

  return repositories
    .filter((repo) => !repo.fork && !repo.archived)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, limit);
};

export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
