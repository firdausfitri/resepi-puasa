export type RouteName = 'plan' | 'shopping' | 'recipes' | 'recipe' | 'cart' | 'checkout';

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

  if (path === '/cart') {
    return { name: 'cart', params: {} };
  }

  if (path === '/checkout') {
    return { name: 'checkout', params: {} };
  }

  if (path === '/recipes') {
    return { name: 'recipes', params: {} };
  }

  const recipeMatch = path.match(/^\/recipes\/([^/]+)$/);

  if (recipeMatch) {
    let decodedCode: string;

    try {
      decodedCode = decodeURIComponent(recipeMatch[1]);
    } catch {
      return null;
    }

    return {
      name: 'recipe',
      params: {
        code: decodedCode,
      },
    };
  }

  return null;
}
