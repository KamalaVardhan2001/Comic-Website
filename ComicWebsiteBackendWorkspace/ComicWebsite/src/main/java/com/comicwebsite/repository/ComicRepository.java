package com.comicwebsite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.comicwebsite.model.Comic;

public interface ComicRepository extends JpaRepository<Comic, Integer>{
	
}
