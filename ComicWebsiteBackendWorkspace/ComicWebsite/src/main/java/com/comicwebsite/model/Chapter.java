package com.comicwebsite.model;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "chapters")
public class Chapter {
	
	@Id
	private int id;
	
	private double number;
	private String name;
	
	@Column(name = "upload_date")
	private LocalDate uploadDate;
	
	@OneToMany(mappedBy = "chapter", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private List<Comment> comments;
	
	@OneToMany(mappedBy = "chapter", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private List<Image> images;
	
	@ManyToOne
    @JoinColumn(name = "comic_id", nullable = false) // Foreign key column in chapters table
	@JsonBackReference
	private Comic comic;
}
