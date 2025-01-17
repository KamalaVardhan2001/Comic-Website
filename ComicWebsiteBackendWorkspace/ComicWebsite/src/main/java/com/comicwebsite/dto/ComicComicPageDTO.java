package com.comicwebsite.dto;

import java.util.List;

import com.comicwebsite.model.Comment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComicComicPageDTO {
	 private int id;
	 private String coverImageURL;
	 private String title;
	 private String alternativeTitles;
	 private String authors;
	 private String status;
	 private String genres;
	 private String summary;
	 private List<ChapterComicPageDTO> chapters;
	 private List<Comment> comments;
}
