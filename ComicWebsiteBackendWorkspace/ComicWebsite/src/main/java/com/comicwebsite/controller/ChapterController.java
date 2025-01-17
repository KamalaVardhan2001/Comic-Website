package com.comicwebsite.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.comicwebsite.dto.ComicComicPageDTO;
import com.comicwebsite.model.Chapter;
import com.comicwebsite.repository.ChapterRepository;

@RestController
@CrossOrigin("*")
public class ChapterController {
	
	@Autowired
	ChapterRepository chapterRepository;
	
	@GetMapping("/getChapter/{id}")
	public Optional<Chapter> getChapter(@PathVariable("id") int id) {
		
		return chapterRepository.findById(id);
	}
}
