const mapping: Record<string, string> = {
  albums: 'album',
  archives: 'archive',
  invitations: 'invitation',
  organizations: 'organization',
  pictures: 'picture',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
