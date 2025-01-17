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
@Table(name = "images")
public class Image {
	
	@Id
	private int id;
	
	private int number;
	private String url;
	
	@ManyToOne
    @JoinColumn(name = "chapter_id", nullable = false)
	@JsonBackReference
	private Chapter chapter;
}
