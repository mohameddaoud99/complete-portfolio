export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: string | null;
  yearsExperience: number;
  displayOrder: number;
}

export type SkillRequest = Omit<Skill, 'id'>;
