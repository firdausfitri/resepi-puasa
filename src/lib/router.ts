export type RouteName = 'plan' | 'shopping' | 'recipes' | 'recipe';

export interface RouteMatch {
  name: RouteName;
  params: {
    code?: string;
  };
}

function normalizeHash(hashValue: string): string {
  const withoutHash = hashValue.replace(/^#/, '').trim();

  if (!withoutHash) {
    return '/plan';
  }

  return withoutHash.startsWith('/') ? withoutHash : `/${withoutHash}`;
}

export function resolveHashRoute(hashValue: string): RouteMatch | null {
  const path = normalizeHash(hashValue);

  if (path === '/plan') {
    return { name: 'plan', params: {} };
  }

  if (path === '/shopping') {
    return { name: 'shopping', params: {} };
  }

  if (path === '/recipes') {
    return { name: 'recipes', params: {} };
  }

  const recipeMatch = path.match(/^\/recipes\/([^/]+)$/);

  if (recipeMatch) {
    return {
      name: 'recipe',
      params: {
        code: decodeURIComponent(recipeMatch[1]),
      },
    };
  }

  return null;
}
