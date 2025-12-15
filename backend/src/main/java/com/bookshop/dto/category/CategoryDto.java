package com.bookshop.dto.category;

import com.bookshop.entity.Category;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CategoryDto {
    private Long categoryId;
    private String categoryName;

    public CategoryDto(Category category){
        this.categoryId = category.getCategoryId();
        this.categoryName = category.getCategoryName();
    }
}
