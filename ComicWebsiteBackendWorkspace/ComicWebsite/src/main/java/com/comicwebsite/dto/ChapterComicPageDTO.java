package com.comicwebsite.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChapterComicPageDTO {
	private int id;
	private double number;
    private String name;
    private LocalDate uploadDate;
}
