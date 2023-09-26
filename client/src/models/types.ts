import { SetStateAction, Dispatch } from "react";

export interface INote {
  title: string;
  links?: Array<string>;
  description: string;
  id: number | string;
  tag?: string;
  createdAt: number;
  deleteNote?: (id: number | string) => void;
}

export interface INewNote {
  addNote: (obj: INote) => void;
  toggleForm: (bool: boolean) => void;
}

export interface INewLink {
  active?: boolean;
  value: string;
}

export interface IDescr {
  active?: boolean;
  value: string;
}

export interface IEmojiItem {
  id: string;
  emoji: string;
}

export interface IMoodForm {
  feel: number;
  note: string;
  plans: number;
  overall: number;
  date: number;
}

export interface IGoalForm {
  id: string;
  goal: string;
  time: number;
  date: number;
  done: false;
}

export interface IConditionsData {
  score: number;
  note: string;
}

export interface ICard {
  emojis?: Array<IEmojiItem>;
  setter?: Dispatch<SetStateAction<number>>;
  title?: string;
  type?: string;
  handler?: () => void;
  moodList?: Array<number>;
  data?: IMoodForm;
}

export interface IDeeplForm {
  text: string;
  target_lang: string;
  source_lang: string;
  auth_key: string;
}

export interface ICondition {
  id: string;
  low: string;
  high: string;
}

export interface IConditions {
  energy?: string;
  sleep?: string;
  food?: string;
}

export interface IMoodWrapper {
  children: React.ReactNode;
}

export interface IMoodContext {
  activeEmoji?: Array<IEmojiItem>;
  onSelect: (emoji: IEmojiItem) => void;
  setConditionsScores: React.Dispatch<React.SetStateAction<IConditions>>;
  conditionsScores: IConditions;
  setDayNote: React.Dispatch<React.SetStateAction<string>>;
  dayNote: string;
  step: number;
  onMoodAdd: (form: number) => void;
  onNextStep: () => void;
  graphData: Array<number>;
  moodList: Array<number>;
  overall: number;
  setOverall: React.Dispatch<React.SetStateAction<number>>;
  send: (item: IPreviewData) => void;
  history: Array<IPreviewData>;
  setHistory: Dispatch<SetStateAction<IPreviewData[]>>;
}

export interface IPreviewData {
  overall?: number,
  activeEmoji?: Array<IEmojiItem>;
  conditionsScores?: IConditions;
  dayNote?: string;
  createdAt?: string;
}

export interface IConditionsEmoji {
  id: string;
  low: string;
  high: string;
}

export interface IConditionsInput {
  data: IConditionsEmoji;
}
