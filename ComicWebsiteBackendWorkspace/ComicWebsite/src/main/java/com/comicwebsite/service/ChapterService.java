package com.comicwebsite.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.comicwebsite.repository.ChapterRepository;

@Service
public class ChapterService {
	
	@Autowired
	ChapterRepository chapterRepository;
}
