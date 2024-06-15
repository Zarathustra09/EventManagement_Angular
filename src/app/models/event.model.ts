export interface Event {
  id?: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  status: number;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  created_At?: Date;
  updated_At?: Date;
}
