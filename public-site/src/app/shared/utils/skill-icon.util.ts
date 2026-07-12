import {
  Atom,
  Boxes,
  Cloud,
  Code2,
  Coffee,
  Container,
  Database,
  FileCode,
  Flame,
  GitBranch,
  Layers,
  Leaf,
  LucideIconData,
  Server,
  Terminal,
  Triangle,
  Workflow
} from 'lucide-angular';

const ICON_REGISTRY: Record<string, LucideIconData> = {
  Atom,
  Boxes,
  Cloud,
  Code2,
  Coffee,
  Container,
  Database,
  FileCode,
  Flame,
  GitBranch,
  Layers,
  Leaf,
  Server,
  Terminal,
  Triangle,
  Workflow
};

export function resolveSkillIcon(name: string | null | undefined): LucideIconData {
  if (name && ICON_REGISTRY[name]) {
    return ICON_REGISTRY[name];
  }
  return Code2;
}
