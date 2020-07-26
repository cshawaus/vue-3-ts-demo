import type { Ref } from 'vue'

export interface AppComponentProps {}

export interface AppComponentData {
  count: Ref<number>;
  increment: () => number;
}