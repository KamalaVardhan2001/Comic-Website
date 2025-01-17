package com.comicwebsite.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.comicwebsite.dto.ChapterComicPageDTO;
import com.comicwebsite.dto.ComicComicPageDTO;
import com.comicwebsite.model.Comic;
import com.comicwebsite.repository.ComicRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ComicService {
	
	@Autowired
	ComicRepository comicRepository;

	public ComicComicPageDTO getComicWithoutChapterComments(int id) {
	    Comic comic = comicRepository.findById(id)
	        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comic not found"));
	    
	    // Map chapters without comments
	    List<ChapterComicPageDTO> chapterDTOs = comic.getChapters().stream()
	        .map(chapter -> new ChapterComicPageDTO(chapter.getId(), chapter.getNumber(), chapter.getName(), chapter.getUploadDate()))
	        .collect(Collectors.toList());
	    
	    ComicComicPageDTO comicComicPageDTO = new ComicComicPageDTO(comic.getId(), comic.getCoverImageURL(), comic.getTitle(), comic.getAlternativeTitles(), comic.getAuthors(), comic.getStatus(), comic.getGenres(), comic.getSummary(), chapterDTOs, comic.getComments());
	    		
	    return comicComicPageDTO;
	}
}
