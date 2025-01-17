package com.comicwebsite.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.comicwebsite.dto.ComicComicPageDTO;
import com.comicwebsite.model.Chapter;
import com.comicwebsite.model.Comic;
import com.comicwebsite.repository.ComicRepository;
import com.comicwebsite.service.ComicService;

@RestController
@CrossOrigin("*")
public class ComicController {
	
	@Autowired
	ComicRepository comicRepository;
	
	@Autowired
	ComicService comicService;
	
	@GetMapping("/getComic/{id}")
	public ComicComicPageDTO getComic(@PathVariable("id") int id) {
		
		return comicService.getComicWithoutChapterComments(id);
	}
	
	@GetMapping("/getComicsList")
	public List<Comic> getComicsList() {
		
		return comicRepository.findAll();
	}
}
