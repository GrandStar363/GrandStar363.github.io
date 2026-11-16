export const mediaPaths = {
  avatar: "/media/avatar.jpg",
  cover: (slug: string) => `/media/projects/${slug}.jpg`,
  video: (slug: string) => `/media/projects/${slug}.mp4`,
} as const;
