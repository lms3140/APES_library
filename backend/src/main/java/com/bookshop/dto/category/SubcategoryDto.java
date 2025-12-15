package com.bookshop.dto.category;

import com.bookshop.entity.Subcategory;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SubcategoryDto {
    private Long categoryId;
    private Long subcategoryId;
    private String subcategoryName;

    public SubcategoryDto(Subcategory subcategory){
        this.categoryId = subcategory.getCategory().getCategoryId();
        this.subcategoryId = subcategory.getSubcategoryId();
        this.subcategoryName = subcategory.getSubcategoryName();
    }
}
