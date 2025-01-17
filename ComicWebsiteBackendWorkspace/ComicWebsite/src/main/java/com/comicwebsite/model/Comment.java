package com.comicwebsite.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Data
@NoArgsConstructor
@ToString
@Table(name = "comments")
public class Comment {
	
	@Id
	private int id;
	
	@Column(name = "commentor_name")
	private String commentorName;
	
	private String comment;
	private LocalDate date;
	
	@ManyToOne
    @JoinColumn(name = "comic_id", nullable = false)
	@JsonBackReference
	private Comic comic;
	
	@ManyToOne
    @JoinColumn(name = "chapter_id", nullable = false)
	@JsonBackReference
	private Chapter chapter;
}
