package com.comicwebsite.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
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
@Table(name = "comics")
public class Comic {
	
	@Id
	private int id;
	
	@Column(name = "cover_image_url")
	private String coverImageURL;
	
	private String title;
	
	@Column(name = "alternative_titles")
	private String alternativeTitles;
	
	private String authors;
	private String status;
	private String genres;
	private String summary;
	
	@OneToMany(mappedBy = "comic", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private List<Chapter> chapters;
	
	@OneToMany(mappedBy = "comic", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private List<Comment> comments;
}
