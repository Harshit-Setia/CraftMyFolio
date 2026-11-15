const SAFE_URL = /^(https?:\/\/|mailto:|tel:)/i;

const safe = (url) => (SAFE_URL.test(String(url || "").trim()) ? url : undefined);

export const sanitizePublicUser = (user) => {
  if (!user) return user;
  return {
    ...user,
    resume: safe(user.resume),
    social: (user.social || []).filter((item) => safe(item?.url)),
    projects: (user.projects || []).map((project) => ({
      ...project,
      github: safe(project.github),
      deployed: safe(project.deployed),
    })),
  };
};
