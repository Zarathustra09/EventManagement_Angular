export class Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  url?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  created_At: Date;
  updated_At?: Date;

  constructor(
    id: number,
    title: string,
    start: Date,
    end: Date,
    created_At: Date,
    description?: string,
    url?: string,
    backgroundColor?: string,
    borderColor?: string,
    textColor?: string,
    updated_At?: Date
  ) {
    this.id = id;
    this.title = title;
    this.start = start;
    this.end = end;
    this.description = description;
    this.url = url;
    this.backgroundColor = backgroundColor;
    this.borderColor = borderColor;
    this.textColor = textColor;
    this.created_At = created_At;
    this.updated_At = updated_At;
  }
}
