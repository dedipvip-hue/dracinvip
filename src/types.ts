export interface Drama {
  bookId: string;
  bookName: string;
  coverWap: string;
  chapterCount: number;
  introduction: string;
  tags: string[];
  protagonist?: string;
}

export interface ApiResponse {
  status: boolean;
  data: Drama[];
}

export interface Episode {
  id: string;
  title: string;
  videoUrl?: string;
}
