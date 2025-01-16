export interface ArticleCreateDTO {
    title: string;
    content: string;
    author: string;
  }
  
  export interface CommentCreateDTO {
    author: string;
    content: string;
  }