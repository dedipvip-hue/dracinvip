export interface Drama {
  bookId?: string;
  id?: string;
  bookName?: string;
  title?: string;
  tagName?: string;
  coverWap?: string;
  cover?: string;
  verticalImage?: string;
  chapterCount?: number;
  totalChapterNum?: number;
  introduction?: string;
  tags?: string[];
  protagonist?: string;
  corner?: {
    name?: string;
  };
  videoPath?: string;
}

export interface ApiResponse {
  status: boolean;
  data?: Drama[];
  result?: Drama[];
}

export interface Episode {
  id: string;
  title: string;
  videoUrl?: string;
}
